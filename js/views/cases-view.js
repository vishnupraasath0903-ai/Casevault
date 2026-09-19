/**
 * CASEVAULT Cases Management View
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const CasesView = {
  render(params = {}) {
    const selectedCaseId = params?.caseId || null;
    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Case Management</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              Active Investigation Cases
            </h1>
            <p class="page-subtitle">Central registry of ongoing criminal, economic, and cyber forensic inquiries</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-primary btn-sm" id="btn-create-case">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Initiate New Case
            </button>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="repository-toolbar">
          <div class="filter-pills-row">
            <select class="filter-select" id="case-status-filter">
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Closed">Closed</option>
            </select>

            <select class="filter-select" id="case-dept-filter">
              <option value="ALL">All Departments</option>
              <option value="Economic Offenses Wing">Economic Offenses Wing</option>
              <option value="Cyber Defense Cell">Cyber Defense Cell</option>
              <option value="Anti-Corruption Bureau">Anti-Corruption Bureau</option>
              <option value="Special Investigation Team (SIT)">Special Investigation Team (SIT)</option>
            </select>
          </div>

          <span style="font-size: 12px; color: var(--text-muted);">
            Showing <strong>${State.cases.length}</strong> Registered Investigation Cases
          </span>
        </div>

        <!-- Cases Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 18px;" id="cases-cards-container">
          ${State.cases.map(c => this.renderCaseCard(c, c.id === selectedCaseId)).join('')}
        </div>
      </div>
    `;
  },

  renderCaseCard(c, isSelected = false) {
    const priorityColor = c.priority === 'Critical' ? 'var(--status-danger)' : c.priority === 'High' ? 'var(--status-warning)' : 'var(--accent-cyan)';
    
    return `
      <div class="card ${isSelected ? 'card-glow-cyan' : ''}" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="code-cell" style="font-weight: 700; font-size: 13px;">${c.id}</span>
            <span class="badge ${c.status === 'Active' ? 'badge-active' : c.status === 'Under Review' ? 'badge-review' : 'badge-closed'}">
              ${c.status}
            </span>
          </div>
          <span class="badge" style="background: rgba(255,255,255,0.05); color: ${priorityColor}; border: 1px solid ${priorityColor}; font-size: 10px;">
            ${c.priority} Priority
          </span>
        </div>

        <div class="card-body">
          <h3 style="font-size: 15px; font-weight: 700; color: var(--text-white); margin-bottom: 6px;">
            ${c.name}
          </h3>
          <p style="font-size: 12px; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px; min-height: 36px;">
            ${c.description}
          </p>

          <div style="background: var(--bg-slate); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 11px; display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Lead Investigator:</span>
              <span style="color: var(--text-white); font-weight: 600;">${c.leadInvestigator}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Department:</span>
              <span style="color: var(--text-white);">${c.department}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Registered Date:</span>
              <span style="color: var(--text-white); font-family: var(--font-mono);">${c.createdDate}</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <div style="display: flex; gap: 12px; font-size: 11px; color: var(--text-muted);">
            <span><strong>${c.documentCount}</strong> Documents</span>
            <span>•</span>
            <span><strong>${c.evidenceCount}</strong> Physical Exhibits</span>
          </div>

          <button class="btn btn-secondary btn-sm inspect-case-details-btn" data-case-id="${c.id}">
            Inspect Dossier →
          </button>
        </div>
      </div>
    `;
  },

  openCaseDetailsModal(c) {
    const linkedDocs = State.documents.filter(d => d.caseId === c.id);
    const linkedEvidence = State.evidenceItems.filter(e => e.caseId === c.id);

    const bodyHtml = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div style="background: rgba(16, 28, 47, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span class="code-cell" style="font-size: 14px; font-weight: 700;">${c.id}</span>
            <span class="badge ${c.status === 'Active' ? 'badge-active' : 'badge-review'}">${c.status}</span>
          </div>
          <h3 style="font-size: 16px; color: var(--text-white); font-weight: 700; margin-bottom: 8px;">${c.name}</h3>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${c.description}</p>
        </div>

        <!-- Linked Documents Sub-section -->
        <div>
          <h4 style="font-size: 13px; font-weight: 700; color: var(--text-white); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            Cryptographically Anchored Documents (${linkedDocs.length})
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${linkedDocs.length > 0 ? linkedDocs.map(d => `
              <div style="background: var(--bg-slate); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 12px; font-weight: 600; color: var(--text-white);">${d.name}</div>
                  <div style="font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);">${d.id} • ${d.fileSize} • SHA-256: ${d.sha256.substring(0, 16)}...</div>
                </div>
                <button class="btn btn-outline btn-sm preview-case-doc-btn" data-doc-id="${d.id}">View Dossier</button>
              </div>
            `).join('') : '<div style="font-size: 12px; color: var(--text-muted);">No documents anchored yet.</div>'}
          </div>
        </div>

        <!-- Linked Evidence Items Sub-section -->
        <div>
          <h4 style="font-size: 13px; font-weight: 700; color: var(--status-warning); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--status-warning)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Evidence Vault Exhibits (${linkedEvidence.length})
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${linkedEvidence.length > 0 ? linkedEvidence.map(e => `
              <div style="background: var(--bg-slate); border: 1px solid rgba(245,158,11,0.25); border-radius: var(--radius-sm); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 12px; font-weight: 600; color: var(--text-white);">${e.name}</div>
                  <div style="font-size: 10px; color: var(--status-warning); font-family: var(--font-mono);">Tag: ${e.physicalTag} • Holder: ${e.currentHolder}</div>
                </div>
                <span class="badge badge-cyan" style="font-size: 10px;">${e.chainOfCustody.length} Custody Events</span>
              </div>
            `).join('') : '<div style="font-size: 12px; color: var(--text-muted);">No physical vault exhibits linked.</div>'}
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary btn-sm" id="close-case-modal">Close</button>
      <button class="btn btn-primary btn-sm" id="case-add-doc-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Upload Doc to Case
      </button>
    `;

    Modal.open({
      title: `Investigation Dossier: ${c.id}`,
      bodyHtml,
      footerHtml,
      size: 'lg'
    });

    document.getElementById('close-case-modal')?.addEventListener('click', () => Modal.close());
    document.getElementById('case-add-doc-btn')?.addEventListener('click', () => {
      Modal.close();
      window.dispatchEvent(new CustomEvent('navigate-view', { detail: { view: 'upload', caseId: c.id } }));
    });

    document.querySelectorAll('.preview-case-doc-btn').forEach(b => {
      b.addEventListener('click', () => {
        const dId = b.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === dId);
        if (doc) {
          Modal.close();
          setTimeout(() => Modal.openDocumentViewer(doc), 150);
        }
      });
    });
  },

  bindEvents(onNavigate) {
    document.querySelectorAll('.inspect-case-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const caseId = btn.getAttribute('data-case-id');
        const found = State.cases.find(c => c.id === caseId);
        if (found) this.openCaseDetailsModal(found);
      });
    });

    document.getElementById('btn-create-case')?.addEventListener('click', () => {
      const newCaseId = `CASE-2026-0${Math.floor(260 + Math.random() * 40)}`;
      const newCase = {
        id: newCaseId,
        name: 'Telecommunications ISP Infrastructure Intrusion',
        type: 'Cyber Crime Investigation',
        department: 'Cyber Defense Cell',
        leadInvestigator: State.currentUser.name,
        priority: 'High',
        status: 'Active',
        createdDate: new Date().toISOString().substring(0, 10),
        documentCount: 0,
        evidenceCount: 0,
        lastActivity: 'Just now',
        description: 'New forensic inquiry initiated into anomalous BGP routing table changes and DNS spoofing logs.'
      };
      State.cases.unshift(newCase);
      State.addAuditLog({
        action: 'PERMISSION_CHANGE',
        document: 'N/A',
        docId: '-',
        caseId: newCase.id,
        details: `New investigation case initialized by ${State.currentUser.name}.`
      });
      Toast.success('Case Registered', `Case ${newCase.id} created successfully.`);
      if (typeof onNavigate === 'function') onNavigate('cases');
    });

    // Filters
    const statusFilter = document.getElementById('case-status-filter');
    const deptFilter = document.getElementById('case-dept-filter');
    const applyFilters = () => {
      const sVal = statusFilter.value;
      const dVal = deptFilter.value;
      const filtered = State.cases.filter(c => {
        const matchS = sVal === 'ALL' || c.status === sVal;
        const matchD = dVal === 'ALL' || c.department === dVal;
        return matchS && matchD;
      });
      const container = document.getElementById('cases-cards-container');
      if (container) {
        container.innerHTML = filtered.map(c => this.renderCaseCard(c)).join('');
        this.bindEvents(onNavigate);
      }
    };
    statusFilter?.addEventListener('change', applyFilters);
    deptFilter?.addEventListener('change', applyFilters);
  }
};
