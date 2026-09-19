/**
 * CASEVAULT Document Repository View
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const DocumentsView = {
  currentViewMode: 'grid', // 'grid' | 'list'

  render(params = {}) {
    const docs = State.documents;

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Document Repository</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Secure Legal & Forensic Documents
            </h1>
            <p class="page-subtitle">Repository of encrypted case files, court exhibits, and chain-of-custody artifacts</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-primary btn-sm" id="btn-upload-new-doc">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Upload Secure Document
            </button>
          </div>
        </div>

        <!-- Repository Toolbar: Filters & View Switcher -->
        <div class="repository-toolbar">
          <div class="filter-pills-row">
            <select class="filter-select" id="filter-doc-case">
              <option value="ALL">All Cases</option>
              ${State.cases.map(c => `<option value="${c.id}">${c.id}</option>`).join('')}
            </select>

            <select class="filter-select" id="filter-doc-class">
              <option value="ALL">All Classifications</option>
              <option value="Restricted Evidence">Restricted Evidence</option>
              <option value="Highly Confidential">Highly Confidential</option>
              <option value="Confidential">Confidential</option>
              <option value="Internal">Internal</option>
              <option value="Public">Public</option>
            </select>

            <select class="filter-select" id="filter-doc-type">
              <option value="ALL">All Document Types</option>
              <option value="FIR / Formal Complaint">FIR / Formal Complaint</option>
              <option value="Forensic Lab Report">Forensic Lab Report</option>
              <option value="Court Order">Court Order</option>
              <option value="Witness Deposition">Witness Deposition</option>
              <option value="Forensic PCAP / Telemetry">Forensic PCAP / Telemetry</option>
              <option value="Subpoena / Section 91 Notice">Subpoena / Section 91 Notice</option>
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-muted); margin-right: 6px;">View:</span>
            <button class="btn btn-secondary btn-icon-only btn-sm ${this.currentViewMode === 'grid' ? 'btn-primary' : ''}" id="toggle-view-grid" title="Grid View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button class="btn btn-secondary btn-icon-only btn-sm ${this.currentViewMode === 'list' ? 'btn-primary' : ''}" id="toggle-view-list" title="List View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Document Content Container -->
        <div id="docs-viewport">
          ${this.currentViewMode === 'grid' ? this.renderGridView(docs) : this.renderListView(docs)}
        </div>
      </div>
    `;
  },

  renderGridView(docs) {
    if (docs.length === 0) {
      return `<div style="text-align: center; padding: 60px; color: var(--text-muted);">No documents match the active filter criteria.</div>`;
    }

    return `
      <div class="doc-grid-container">
        ${docs.map(doc => `
          <div class="doc-card">
            <div>
              <div class="doc-card-top">
                <div class="doc-type-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div class="doc-card-details">
                  <span class="badge badge-classification class-${doc.classification.toLowerCase().replace(/\s+/g, '-')}" style="margin-bottom: 4px;">
                    ${doc.classification}
                  </span>
                  <div class="doc-card-name" title="${doc.name}">${doc.name}</div>
                  <div class="doc-card-meta">
                    <span class="code-cell">${doc.caseId}</span>
                    <span>•</span>
                    <span>${doc.fileSize}</span>
                  </div>
                </div>
              </div>

              <!-- Cryptographic Summary Badges -->
              <div style="background: var(--bg-slate); border-radius: var(--radius-sm); padding: 8px 10px; font-size: 10.5px; display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">SHA-256 Hash:</span>
                  <span style="font-family: var(--font-mono); color: var(--accent-cyan);">${doc.sha256.substring(0, 14)}...</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">PKI Signature:</span>
                  <span style="color: var(--status-success); font-weight: 600;">✓ VALID</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">Officer:</span>
                  <span style="color: var(--text-white);">${doc.uploadedBy.split(' ')[0]} ${doc.uploadedBy.split(' ')[1] || ''}</span>
                </div>
              </div>
            </div>

            <!-- Actions Row -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
              <button class="btn btn-secondary btn-sm doc-action-view" data-doc-id="${doc.id}" style="flex: 1;">
                Inspect Dossier
              </button>
              <button class="btn btn-outline btn-icon-only btn-sm doc-action-verify" data-doc-id="${doc.id}" title="Verify SHA-256 Hash">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              </button>
              <button class="btn btn-outline btn-icon-only btn-sm doc-action-share" data-doc-id="${doc.id}" title="Share Secure Copy">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderListView(docs) {
    if (docs.length === 0) {
      return `<div style="text-align: center; padding: 60px; color: var(--text-muted);">No documents match the active filter criteria.</div>`;
    }

    return `
      <div class="card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Document Name & ID</th>
                <th>Case Reference</th>
                <th>Classification</th>
                <th>File Size</th>
                <th>SHA-256 Digest</th>
                <th>Signature</th>
                <th>Uploaded By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${docs.map(doc => `
                <tr>
                  <td>
                    <div style="font-weight: 600; color: var(--text-white);">${doc.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${doc.id} • ${doc.docType}</div>
                  </td>
                  <td class="code-cell">${doc.caseId}</td>
                  <td>
                    <span class="badge badge-classification class-${doc.classification.toLowerCase().replace(/\s+/g, '-')}">
                      ${doc.classification}
                    </span>
                  </td>
                  <td style="font-family: var(--font-mono); font-size: 11px;">${doc.fileSize}</td>
                  <td class="code-cell" style="font-size: 11px;">${doc.sha256.substring(0, 14)}...</td>
                  <td>
                    <span class="badge badge-active" style="font-size: 10px;">✓ ${doc.digitalSignatureStatus}</span>
                  </td>
                  <td style="font-size: 12px;">${doc.uploadedBy}</td>
                  <td>
                    <div style="display: flex; gap: 6px;">
                      <button class="btn btn-secondary btn-sm doc-action-view" data-doc-id="${doc.id}">
                        View
                      </button>
                      <button class="btn btn-outline btn-sm doc-action-verify" data-doc-id="${doc.id}">
                        Verify
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    document.getElementById('btn-upload-new-doc')?.addEventListener('click', () => {
      if (typeof onNavigate === 'function') onNavigate('upload');
    });

    // View toggles
    document.getElementById('toggle-view-grid')?.addEventListener('click', () => {
      this.currentViewMode = 'grid';
      this.refreshList(onNavigate);
    });
    document.getElementById('toggle-view-list')?.addEventListener('click', () => {
      this.currentViewMode = 'list';
      this.refreshList(onNavigate);
    });

    // Filters
    const caseFilter = document.getElementById('filter-doc-case');
    const classFilter = document.getElementById('filter-doc-class');
    const typeFilter = document.getElementById('filter-doc-type');

    const applyFilter = () => {
      const cVal = caseFilter?.value || 'ALL';
      const clVal = classFilter?.value || 'ALL';
      const tVal = typeFilter?.value || 'ALL';

      const filtered = State.documents.filter(d => {
        const mC = cVal === 'ALL' || d.caseId === cVal;
        const mCl = clVal === 'ALL' || d.classification === clVal;
        const mT = tVal === 'ALL' || d.docType === tVal;
        return mC && mCl && mT;
      });

      const viewport = document.getElementById('docs-viewport');
      if (viewport) {
        viewport.innerHTML = this.currentViewMode === 'grid' ? this.renderGridView(filtered) : this.renderListView(filtered);
        this.bindCardActions(onNavigate);
      }
    };

    caseFilter?.addEventListener('change', applyFilter);
    classFilter?.addEventListener('change', applyFilter);
    typeFilter?.addEventListener('change', applyFilter);

    this.bindCardActions(onNavigate);
  },

  bindCardActions(onNavigate) {
    document.querySelectorAll('.doc-action-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === id);
        if (doc) Modal.openDocumentViewer(doc);
      });
    });

    document.querySelectorAll('.doc-action-verify').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-doc-id');
        if (typeof onNavigate === 'function') onNavigate('verifier', false, { docId: id });
      });
    });

    document.querySelectorAll('.doc-action-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === id);
        if (doc) Modal.openShareModal(doc);
      });
    });
  },

  refreshList(onNavigate) {
    const viewport = document.getElementById('docs-viewport');
    if (viewport) {
      viewport.innerHTML = this.currentViewMode === 'grid' ? this.renderGridView(State.documents) : this.renderListView(State.documents);
      document.getElementById('toggle-view-grid')?.classList.toggle('btn-primary', this.currentViewMode === 'grid');
      document.getElementById('toggle-view-list')?.classList.toggle('btn-primary', this.currentViewMode === 'list');
      this.bindCardActions(onNavigate);
    }
  }
};
