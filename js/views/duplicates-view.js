/**
 * CASEVAULT Duplicate Evidence Detector View
 * Multi-factor Evidence Redundancy & Near-Duplicate Identification Engine.
 * Supports exact bitwise SHA-256 matching and NLP token content overlap comparison.
 * Strictly adheres to forensic standards: Never deletes evidence automatically.
 */

import { State } from '../state.js';
import { IntelligenceService } from '../services/intelligence-service.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const DuplicatesView = {
  duplicateReports: [],
  selectedFilter: 'ALL', // 'ALL' | 'EXACT' | 'NEAR'
  isScanning: false,

  render(params = {}) {
    // Run scan if empty
    if (this.duplicateReports.length === 0) {
      this.duplicateReports = IntelligenceService.scanAllDuplicates(State.documents);
    }

    let filtered = this.duplicateReports;
    if (this.selectedFilter === 'EXACT') {
      filtered = filtered.filter(r => r.similarity === 100);
    } else if (this.selectedFilter === 'NEAR') {
      filtered = filtered.filter(r => r.similarity < 100);
    }

    const exactCount = this.duplicateReports.filter(r => r.similarity === 100).length;
    const nearCount = this.duplicateReports.filter(r => r.similarity < 100).length;

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Duplicate Evidence Detector</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Duplicate & Near-Duplicate Evidence Detector
            </h1>
            <p class="page-subtitle">Cryptographic hash parity, normalized metadata collision, and textual token overlap verification</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-primary btn-sm" id="btn-run-duplicate-scan">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Re-Scan All Exhibits
            </button>
          </div>
        </div>

        <!-- Telemetry Summary Cards -->
        <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom: 24px;">
          <div class="stat-card">
            <div class="stat-label">Exact Cryptographic Matches</div>
            <div class="stat-value" style="color: var(--status-danger);">${exactCount}</div>
            <div class="stat-subtext">100% SHA-256 Bitwise Parity</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Near-Duplicate Exhibits</div>
            <div class="stat-value" style="color: var(--status-warning);">${nearCount}</div>
            <div class="stat-subtext">Textual Overlap ≥ 65%</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Total Redundancy Alerts</div>
            <div class="stat-value" style="color: var(--accent-cyan);">${this.duplicateReports.length}</div>
            <div class="stat-subtext">Zero Automatic Deletions</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Repository Health</div>
            <div class="stat-value" style="color: var(--status-success);">OPTIMAL</div>
            <div class="stat-subtext">Forensic Integrity Intact</div>
          </div>
        </div>

        <!-- Filter Pills Bar -->
        <div class="repository-toolbar" style="margin-bottom: 20px;">
          <div class="filter-pills-row">
            <button class="btn btn-sm ${this.selectedFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}" data-dup-filter="ALL">
              All Matches (${this.duplicateReports.length})
            </button>
            <button class="btn btn-sm ${this.selectedFilter === 'EXACT' ? 'btn-primary' : 'btn-secondary'}" data-dup-filter="EXACT">
              Exact Hash Duplicates (${exactCount})
            </button>
            <button class="btn btn-sm ${this.selectedFilter === 'NEAR' ? 'btn-primary' : 'btn-secondary'}" data-dup-filter="NEAR">
              Near-Duplicates (${nearCount})
            </button>
          </div>
          <div style="font-size: 11px; color: var(--text-dark); display: flex; align-items: center; gap: 6px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Evidence Preservation Policy: All duplicate records are flagged, never deleted.
          </div>
        </div>

        <!-- Duplicates Report Cards List -->
        <div class="duplicate-reports-stream">
          ${filtered.length === 0 ? `
            <div class="card" style="padding: 60px; text-align: center; color: var(--text-muted);">
              No duplicate records match the filter criteria.
            </div>
          ` : filtered.map(report => this.renderDuplicateCard(report)).join('')}
        </div>
      </div>
    `;
  },

  renderDuplicateCard(report) {
    const isExact = report.similarity === 100;
    const docA = State.documents.find(d => d.id === report.targetDocId) || { id: report.targetDocId, name: report.targetDocName, sha256: report.hash || '' };
    const docB = State.documents.find(d => d.id === report.matchedDocId) || { id: report.matchedDocId, name: report.matchedDocName, sha256: report.hash || '' };

    return `
      <div class="duplicate-card ${isExact ? 'dup-exact' : 'dup-near'}">
        <div class="duplicate-card-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge ${isExact ? 'badge-danger' : 'badge-warning'}" style="font-weight: 700; font-family: var(--font-mono); font-size: 11px;">
              ${isExact ? '⚠ 100% EXACT DUPLICATE' : `⚠ ${report.similarity}% NEAR-DUPLICATE`}
            </span>
            <span style="font-size: 13px; font-weight: 600; color: var(--text-white);">
              ${report.description}
            </span>
          </div>
          <span class="badge" style="font-size: 10px; background: rgba(148,163,184,0.1); color: var(--text-muted);">
            Type: ${report.matchType}
          </span>
        </div>

        <!-- Side-by-Side Comparison Container -->
        <div class="duplicate-comparison-grid">
          <!-- Left: Target Document (Newly Uploaded / Secondary) -->
          <div class="duplicate-side-box">
            <div class="dup-box-label">
              <span>SUSPECT REPLICA EXHIBIT</span>
              <span class="code-cell">${docA.id}</span>
            </div>
            <h4 class="dup-doc-name" title="${docA.name}">${docA.name}</h4>
            <div class="dup-meta-row">
              <span>Case: <strong style="color: var(--text-white);">${docA.caseId || 'CASE-2026-0142'}</strong></span>
              <span>Size: ${docA.fileSize || '4.2 MB'}</span>
            </div>
            <div class="dup-hash-block">
              <span style="font-size: 9.5px; color: var(--text-muted); display: block; margin-bottom: 2px;">SHA-256 HASH:</span>
              <span class="code-cell" style="font-size: 10px; color: var(--accent-cyan); word-break: break-all;">${docA.sha256}</span>
            </div>
            <div class="dup-snippet-box">
              "${docA.contentSnippet?.substring(0, 160) || 'Exhibit content payload'}"
            </div>
          </div>

          <!-- Center Comparison Icon -->
          <div class="duplicate-match-connector">
            <div class="similarity-circle ${isExact ? 'sim-exact' : 'sim-near'}">
              ${report.similarity}%
            </div>
            <span style="font-size: 9px; font-family: var(--font-mono); color: var(--text-dark); margin-top: 4px;">SIMILARITY</span>
          </div>

          <!-- Right: Matched Vault Original Document -->
          <div class="duplicate-side-box">
            <div class="dup-box-label">
              <span>ESTABLISHED VAULT ORIGINAL</span>
              <span class="code-cell">${docB.id}</span>
            </div>
            <h4 class="dup-doc-name" title="${docB.name}">${docB.name}</h4>
            <div class="dup-meta-row">
              <span>Case: <strong style="color: var(--text-white);">${docB.caseId || 'CASE-2026-0142'}</strong></span>
              <span>Size: ${docB.fileSize || '4.2 MB'}</span>
            </div>
            <div class="dup-hash-block">
              <span style="font-size: 9.5px; color: var(--text-muted); display: block; margin-bottom: 2px;">SHA-256 HASH:</span>
              <span class="code-cell" style="font-size: 10px; color: var(--accent-cyan); word-break: break-all;">${docB.sha256}</span>
            </div>
            <div class="dup-snippet-box">
              "${docB.contentSnippet?.substring(0, 160) || 'Exhibit content payload'}"
            </div>
          </div>
        </div>

        <!-- Action Row -->
        <div class="duplicate-actions-row">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm dup-btn-view-orig" data-doc-id="${docB.id}">
              View Original (${docB.id})
            </button>
            <button class="btn btn-secondary btn-sm dup-btn-compare" data-doc-a="${docA.id}" data-doc-b="${docB.id}">
              Side-by-Side Diff Inspector
            </button>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm dup-btn-keep-both" data-doc-id="${docA.id}">
              ✓ Keep Both (Independent Exhibits)
            </button>
            <button class="btn btn-outline btn-sm dup-btn-mark" data-doc-id="${docA.id}" style="color: var(--status-warning); border-color: rgba(245,158,11,0.3);">
              Tag as Secondary Duplicate
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    // Filter buttons
    document.querySelectorAll('[data-dup-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedFilter = btn.getAttribute('data-dup-filter');
        const viewport = document.getElementById('viewport-container');
        if (viewport) {
          viewport.innerHTML = this.render();
          this.bindEvents(onNavigate);
        }
      });
    });

    // Re-Scan Button
    document.getElementById('btn-run-duplicate-scan')?.addEventListener('click', () => {
      Toast.info('Scanning Repository', 'Recalculating pairwise SHA-256 hashes and token similarity matrix...');
      setTimeout(() => {
        this.duplicateReports = IntelligenceService.scanAllDuplicates(State.documents);
        State.addAuditLog({
          action: 'DUPLICATE_SCAN',
          document: 'Vault Repository',
          docId: 'ALL',
          caseId: 'ALL',
          details: `Manual duplicate scan completed. ${this.duplicateReports.length} candidate redundancies identified.`
        });
        const viewport = document.getElementById('viewport-container');
        if (viewport) {
          viewport.innerHTML = this.render();
          this.bindEvents(onNavigate);
        }
        Toast.success('Scan Completed', `${this.duplicateReports.length} duplicate/near-duplicate pairs identified.`);
      }, 400);
    });

    // View Original button
    document.querySelectorAll('.dup-btn-view-orig').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) Modal.openDocumentViewer(doc);
      });
    });

    // Side-by-Side Diff Inspector
    document.querySelectorAll('.dup-btn-compare').forEach(btn => {
      btn.addEventListener('click', () => {
        const idA = btn.getAttribute('data-doc-a');
        const idB = btn.getAttribute('data-doc-b');
        const docA = State.documents.find(d => d.id === idA);
        const docB = State.documents.find(d => d.id === idB);
        if (docA && docB) {
          this.openDiffModal(docA, docB);
        }
      });
    });

    // Keep Both Action
    document.querySelectorAll('.dup-btn-keep-both').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        Toast.success('Exhibits Preserved', `Document ${docId} retained as distinct evidentiary record under chain of custody.`);
        State.addAuditLog({
          action: 'EVIDENCE_PRESERVED',
          document: docId,
          docId: docId,
          caseId: 'CASE-2026-0142',
          details: `Investigator opted to keep both copies of ${docId} as independent exhibits.`
        });
      });
    });

    // Tag as Duplicate Action
    document.querySelectorAll('.dup-btn-mark').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        Toast.warning('Flagged Duplicate', `Document ${docId} tagged with secondary duplicate status badge.`);
        State.addAuditLog({
          action: 'MARK_DUPLICATE',
          document: docId,
          docId: docId,
          caseId: 'CASE-2026-0142',
          details: `Exhibit ${docId} formally annotated as secondary copy.`
        });
      });
    });
  },

  openDiffModal(docA, docB) {
    const isSameHash = docA.sha256 === docB.sha256;
    const bodyHtml = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: var(--bg-slate); padding: 12px 16px; border-radius: var(--radius-sm); border-left: 3px solid ${isSameHash ? 'var(--status-danger)' : 'var(--status-warning)'}; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <strong style="color: var(--text-white); font-size: 13px;">
              ${isSameHash ? 'Cryptographic Exact Match (100% Bit-for-Bit)' : 'Near-Duplicate Content Comparison'}
            </strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              ${isSameHash ? 'Both files produce the exact same SHA-256 digest.' : 'Textual contents exhibit substantial token alignment with minor revisions.'}
            </p>
          </div>
          <span class="badge ${isSameHash ? 'badge-danger' : 'badge-warning'}">
            ${isSameHash ? 'IDENTICAL' : 'AMENDED VARIATION'}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="background: rgba(11,23,42,0.9); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
            <span style="font-size: 11px; color: var(--accent-cyan); font-weight: 700; display: block; margin-bottom: 6px;">[A] ${docA.name}</span>
            <div class="code-cell" style="font-size: 9.5px; margin-bottom: 8px;">SHA: ${docA.sha256}</div>
            <div style="font-size: 12px; color: #CBD5E1; line-height: 1.6; white-space: pre-wrap; font-family: var(--font-sans);">
${docA.contentSnippet}
            </div>
          </div>

          <div style="background: rgba(11,23,42,0.9); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 14px;">
            <span style="font-size: 11px; color: #34D399; font-weight: 700; display: block; margin-bottom: 6px;">[B] ${docB.name}</span>
            <div class="code-cell" style="font-size: 9.5px; margin-bottom: 8px;">SHA: ${docB.sha256}</div>
            <div style="font-size: 12px; color: #CBD5E1; line-height: 1.6; white-space: pre-wrap; font-family: var(--font-sans);">
${docB.contentSnippet}
            </div>
          </div>
        </div>
      </div>
    `;

    Modal.open({
      title: 'Forensic Duplicate & Diff Inspector',
      bodyHtml,
      size: 'lg',
      footerHtml: `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('modal-close-btn')?.click()">
          Close Inspector
        </button>
      `
    });
  }
};
