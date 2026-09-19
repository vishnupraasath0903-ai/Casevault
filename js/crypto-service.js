/**
 * CASEVAULT Cryptographic Service
 * Provides client-side SHA-256 hashing via Web Crypto API,
 * digital signature simulation, and tampering injection for SIH demonstrations.
 */

export const CryptoService = {
  /**
   * Computes authentic SHA-256 hash using the browser's native Web Crypto API
   * @param {File|Blob|string} data 
   * @returns {Promise<string>} Hexadecimal SHA-256 string
   */
  async computeSHA256(data) {
    let buffer;
    if (data instanceof File || data instanceof Blob) {
      buffer = await data.arrayBuffer();
    } else if (typeof data === 'string') {
      const encoder = new TextEncoder();
      buffer = encoder.encode(data);
    } else {
      throw new Error('Unsupported data format for hashing');
    }

    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Generates a deterministic or simulated PKI Digital Signature
   */
  generateDigitalSignature(hash, signerName = 'Dr. Rajesh Sharma (Chief Forensic Examiner)') {
    const timestamp = new Date().toISOString();
    const prefix = 'SIG-ECDSA-P256-';
    // Generate simulated cryptographic signature key token
    const token = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      signatureId: `${prefix}${token.substring(0, 16).toUpperCase()}`,
      algorithm: 'ECDSA_P256_SHA256',
      signer: signerName,
      certificateAuthority: 'National Cyber Forensics PKI Root CA-India',
      timestamp,
      signedHash: hash,
      status: 'VALID'
    };
  },

  /**
   * Tamper simulation: deliberately flips a nibble/byte in the SHA-256 hash
   */
  simulateBitFlip(originalHash) {
    if (!originalHash || originalHash.length < 10) return originalHash;
    const chars = originalHash.split('');
    // Flip 3 characters at specific positions
    const pos = [4, 18, 36];
    pos.forEach(p => {
      if (p < chars.length) {
        chars[p] = chars[p] === 'a' ? 'f' : chars[p] === '0' ? '9' : 'c';
      }
    });
    return chars.join('');
  },

  /**
   * Format bytes into human-readable size
   */
  formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
};
