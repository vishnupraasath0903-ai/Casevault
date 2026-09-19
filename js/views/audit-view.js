/**
 * CASEVAULT Forensic Audit Trail View
 * Compliant with Section 65B Indian Evidence Act / BNSS evidentiary standards.
 * Supports multi-attribute filtering, CSV export, and printable forensic certificate generation.
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const AuditView = {
  render() {
    const logs = State.auditLogs;

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Forensic Audit Trail</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                <circle cx="12" cy="14" r="3"/><line x1="12" y1="17" x2="12" y2="19"/>
              </svg>
              Forensic Audit Trail & Chain of Accountability
            </h1>
            <p class="page-subtitle">Immutable access ledger recording all uploads, views, downloads, verifications, and cryptographic signatures</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" id="btn-export-audit-csv">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV Ledger
            </button>
            <button class="btn btn-cyan btn-sm" id="btn-open-audit-cert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print Forensic Certificate
            </button>
          </div>
        </div>

        <!-- Filter Controls Toolbar -->
        <div class="repository-toolbar">
          <div class="filter-pills-row">
            <select class="filter-select" id="audit-action-filter">
              <option value="ALL">All Actions</option>
              <option value="UPLOAD">UPLOAD</option>
              <option value="VIEW">VIEW</option>
              <option value="DOWNLOAD">DOWNLOAD</option>
              <option value="VERIFY">VERIFY</option>
              <option value="SIGN">SIGN</option>
              <option value="SHARE">SHARE</option>
              <option value="LOGIN">LOGIN</option>
              <option value="PERMISSION_CHANGE">PERMISSION CHANGE</option>
            </select>

            <select class="filter-select" id="audit-status-filter">
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success Only</option>
              <option value="ALERT">Security Alerts Only</option>
            </select>

            <input 
              type="text" 
              class="form-input" 
              id="audit-search-filter" 
              placeholder="Search user, IP, or document..." 
              style="padding: 6px 12px; font-size: 12px; width: 220px;" 
            />
          </div>

          <span style="font-size: 12px; color: var(--text-muted);">
            Displaying <strong id="audit-count-label">${logs.length}</strong> Forensic Ledger Records
          </span>
        </div>

        <!-- Audit Table Card -->
        <div class="card">
          <div class="table-responsive">
            <table class="data-table" id="audit-records-table">
              <thead>
                <tr>
                  <th>Audit ID & Time</th>
                  <th>Officer / User</th>
                  <th>Action</th>
                  <th>Document Reference</th>
                  <th>Case ID</th>
                  <th>Terminal IP</th>
                  <th>Status</th>
                  <th>Evidentiary Details</th>
                </tr>
              </thead>
              <tbody id="audit-table-body">
                ${this.renderTableRows(logs)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  renderTableRows(logs) {
    if (logs.length === 0) {
      return `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">No forensic records match filter.</td></tr>`;
    }

    return logs.map(l => {
      const isAlert = l.status === 'ALERT';
      return `
        <tr style="${isAlert ? 'background: rgba(239, 68, 68, 0.08);' : ''}">
          <td>
            <div class="code-cell" style="font-size: 11px;">${l.id}</div>
            <div style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono);">${l.timestamp}</div>
          </td>
          <td>
            <strong style="color: var(--text-white); display: block;">${l.user}</strong>
            <span style="font-size: 10.5px; color: var(--text-muted);">${l.role}</span>
          </td>
          <td>
            <span class="badge ${isAlert ? 'badge-danger' : 'badge-cyan'}" style="font-size: 10px; font-family: var(--font-mono);">
              ${l.action}
            </span>
          </td>
          <td>
            <div style="font-size: 12px; color: var(--text-white);">${l.document}</div>
            <span class="code-cell" style="font-size: 10px;">${l.docId}</span>
          </td>
          <td class="code-cell" style="font-size: 11px;">${l.caseId}</td>
          <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${l.ipAddress}</td>
          <td>
            <span class="badge ${isAlert ? 'badge-danger' : 'badge-active'}" style="font-size: 10px;">
              ${l.status}
            </span>
          </td>
          <td style="font-size: 11.5px; color: ${isAlert ? '#FCA5A5' : 'var(--text-muted)'}; max-width: 260px;">
            ${l.details}
          </td>
        </tr>
      `;
    }).join('');
  },

  bindEvents(onNavigate) {
    // Export CSV
    document.getElementById('btn-export-audit-csv')?.addEventListener('click', () => {
      const headers = ['Audit ID', 'Timestamp', 'User', 'Role', 'Action', 'Document', 'Doc ID', 'Case ID', 'IP Address', 'Status', 'Details'];
      const rows = State.auditLogs.map(l => [
        l.id,
        `"${l.timestamp}"`,
        `"${l.user}"`,
        `"${l.role}"`,
        l.action,
        `"${l.document}"`,
        l.docId,
        l.caseId,
        l.ipAddress,
        l.status,
        `"${l.details.replace(/"/g, '""')}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `CASEVAULT_FORENSIC_AUDIT_LOG_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      Toast.success('Audit Log Exported', 'CSV file downloaded with complete cryptographic entries.');
    });

    // Open Printable Forensic Certificate
    document.getElementById('btn-open-audit-cert')?.addEventListener('click', () => {
      Modal.openAuditCertificate();
    });

    // Real-time Filters
    const actionFilter = document.getElementById('audit-action-filter');
    const statusFilter = document.getElementById('audit-status-filter');
    const searchFilter = document.getElementById('audit-search-filter');
    const tableBody = document.getElementById('audit-table-body');
    const countLabel = document.getElementById('audit-count-label');

    const applyFilter = () => {
      const aVal = actionFilter?.value || 'ALL';
      const sVal = statusFilter?.value || 'ALL';
      const qVal = searchFilter?.value.toLowerCase().trim() || '';

      const filtered = State.auditLogs.filter(l => {
        const matchA = aVal === 'ALL' || l.action === aVal;
        const matchS = sVal === 'ALL' || l.status === sVal;
        const matchQ = !qVal || 
          l.user.toLowerCase().includes(qVal) || 
          l.document.toLowerCase().includes(qVal) || 
          l.ipAddress.includes(qVal) || 
          l.caseId.toLowerCase().includes(qVal);
        return matchA && matchS && matchQ;
      });

      if (tableBody) tableBody.innerHTML = this.renderTableRows(filtered);
      if (countLabel) countLabel.textContent = filtered.length;
    };

    actionFilter?.addEventListener('change', applyFilter);
    statusFilter?.addEventListener('change', applyFilter);
    searchFilter?.addEventListener('input', applyFilter);
  }
};
