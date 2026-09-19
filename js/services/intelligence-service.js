/**
 * CASEVAULT Intelligence Service
 * Handles Automated Entity Extraction, Intelligence Profiling, 
 * and Cryptographic / Near-Duplicate Evidence Detection.
 */

export const IntelligenceService = {
  // Known forensic entity dictionaries for enhanced extraction
  entityPatterns: {
    phone: /(?:\+91[-\s]?)?[6-9]\d{9}|\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    caseId: /\bCASE-\d{4}-\d{4}\b/g,
    evidenceId: /\b(?:EVD|EOW|CR)-\d{4}-\d{3,4}(?:-[A-Z0-9]+)?\b/g,
    ipAddress: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    currency: /(?:₹|Rs\.?|INR|\$|USD)\s*[\d,]+(?:\.\d+)?(?:\s*(?:Crores?|Lakhs?|Million|Billion))?/gi
  },

  /**
   * Extracts structured intelligence from a document content snippet
   * @param {Object} doc Document record
   * @returns {Object} Extracted entities and metrics
   */
  extractIntelligence(doc) {
    const text = `${doc.name} ${doc.contentSnippet || ''} ${doc.docType || ''}`;
    
    // Pattern matches
    const phones = Array.from(new Set(text.match(this.entityPatterns.phone) || []));
    const emails = Array.from(new Set(text.match(this.entityPatterns.email) || []));
    const caseIds = Array.from(new Set(text.match(this.entityPatterns.caseId) || []));
    const evidenceIds = Array.from(new Set(text.match(this.entityPatterns.evidenceId) || []));
    const ipAddresses = Array.from(new Set(text.match(this.entityPatterns.ipAddress) || []));
    const financialValues = Array.from(new Set(text.match(this.entityPatterns.currency) || []));

    // Combine with manually indexed or contextual entities from document definition
    const people = doc.entities?.people || [];
    const locations = doc.entities?.locations || [];
    const organizations = doc.entities?.organizations || [];
    const dates = doc.entities?.dates || [];
    const events = doc.entities?.events || [];
    const keywords = doc.entities?.keywords || [];

    return {
      docId: doc.id,
      docName: doc.name,
      caseId: doc.caseId,
      people,
      locations,
      organizations,
      dates,
      events,
      keywords,
      technicalIndicators: {
        phones,
        emails,
        caseIds,
        evidenceIds,
        ipAddresses,
        financialValues
      },
      entityCount: people.length + locations.length + organizations.length + events.length + phones.length
    };
  },

  /**
   * Calculates token-based Jaccard similarity between two text snippets
   */
  calculateTextSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;
    const tokenize = str => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const set1 = new Set(tokenize(text1));
    const set2 = new Set(tokenize(text2));
    if (set1.size === 0 || set2.size === 0) return 0;

    let intersection = 0;
    set1.forEach(token => {
      if (set2.has(token)) intersection++;
    });
    const union = new Set([...set1, ...set2]).size;
    return Math.round((intersection / union) * 100);
  },

  /**
   * Detects duplicate or near-duplicate evidence across the vault
   * @param {Object} targetDoc Document to check
   * @param {Array} allDocs Array of existing vault documents
   * @returns {Array} List of potential duplicate matches
   */
  detectDuplicates(targetDoc, allDocs = []) {
    const matches = [];

    allDocs.forEach(doc => {
      if (doc.id === targetDoc.id) return; // Skip self

      // 1. Exact Cryptographic Hash Match (Bit-for-bit duplicate)
      if (targetDoc.sha256 && doc.sha256 && targetDoc.sha256.toLowerCase() === doc.sha256.toLowerCase()) {
        matches.push({
          targetDocId: targetDoc.id,
          targetDocName: targetDoc.name,
          matchedDocId: doc.id,
          matchedDocName: doc.name,
          matchedDocCase: doc.caseId,
          similarity: 100,
          matchType: 'EXACT_HASH_MATCH',
          description: 'Identical cryptographic SHA-256 digest. Exact bit-for-bit duplicate.',
          severity: 'CRITICAL',
          hash: doc.sha256
        });
        return;
      }

      // 2. Near-duplicate text / content similarity check
      const similarity = this.calculateTextSimilarity(targetDoc.contentSnippet, doc.contentSnippet);
      if (similarity >= 65) {
        matches.push({
          targetDocId: targetDoc.id,
          targetDocName: targetDoc.name,
          matchedDocId: doc.id,
          matchedDocName: doc.name,
          matchedDocCase: doc.caseId,
          similarity,
          matchType: similarity >= 90 ? 'NEAR_IDENTICAL_TEXT' : 'HIGH_CONTENT_OVERLAP',
          description: `Content overlap detected (${similarity}% textual parity). Likely modified or re-scanned version.`,
          severity: similarity >= 85 ? 'HIGH' : 'MEDIUM',
          hash: doc.sha256
        });
        return;
      }

      // 3. Normalized Filename & Metadata Overlap
      const cleanName = name => name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanName(targetDoc.name) === cleanName(doc.name) && targetDoc.id !== doc.id) {
        matches.push({
          targetDocId: targetDoc.id,
          targetDocName: targetDoc.name,
          matchedDocId: doc.id,
          matchedDocName: doc.name,
          matchedDocCase: doc.caseId,
          similarity: 80,
          matchType: 'FILENAME_COLLISION',
          description: 'Identical normalized filename across case files with diverging hash signatures.',
          severity: 'MEDIUM',
          hash: doc.sha256
        });
      }
    });

    return matches.sort((a, b) => b.similarity - a.similarity);
  },

  /**
   * Scans all documents in repository and generates full duplicate report
   */
  scanAllDuplicates(documents = []) {
    const processedPairs = new Set();
    const duplicateReports = [];

    for (let i = 0; i < documents.length; i++) {
      for (let j = i + 1; j < documents.length; j++) {
        const docA = documents[i];
        const docB = documents[j];
        const pairKey = [docA.id, docB.id].sort().join('_');
        if (processedPairs.has(pairKey)) continue;
        processedPairs.add(pairKey);

        const results = this.detectDuplicates(docA, [docB]);
        if (results.length > 0) {
          duplicateReports.push(results[0]);
        }
      }
    }

    return duplicateReports;
  }
};
