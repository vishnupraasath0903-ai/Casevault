/**
 * CASEVAULT Evidence Vault & Chain of Custody View
 * High-security physical/digital forensic exhibit vault with interactive custody progression.
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const VaultView = {
  render() {
    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Evidence Vault</span>
        </div>

        <!-- High-Security Amber Vault Banner -->
        <div class="vault-header-seal">
          <div class="vault-seal-badge">
            <div class="seal-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h1 style="font-size: 20px; font-weight: 800; color: #fff;">Forensic Evidence Vault & Chain of Custody</h1>
                <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: var(--status-warning); border: 1px solid rgba(245, 158, 11, 0.4);">
                  SEC 65B BNSS COMPLIANT
                </span>
              </div>
              <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 4px;">
                Tamper-evident legal repository tracking physical media seizures, memory dumps, and verified digital custody transfers.
              </p>
            </div>
          </div>

          <button class="btn btn-cyan btn-sm" id="btn-export-custody-cert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Generate Custody Certificate
          </button>
        </div>

        <!-- Evidence Items with Interactive Chain of Custody Timelines -->
        <div style="display: flex; flex-direction: column; gap: 24px;" id="vault-items-container">
          ${State.evidenceItems.map(item => this.renderEvidenceItem(item)).join('')}
        </div>
      </div>
    `;
  },

  renderEvidenceItem(item) {
    const custodySteps = [
      { key: 'Collected', label: 'Collected & Tagged' },
      { key: 'Uploaded & Sealed', label: 'Vault Sealed' },
      { key: 'Hash Generated', label: 'SHA-256 Hashed' },
      { key: 'Verified', label: 'Forensic Lab Checked' },
      { key: 'Transferred', label: 'Court / Legal Transfer' }
    ];

    return `
      <div class="chain-custody-card" id="evidence-card-${item.evidenceId}">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span class="code-cell" style="font-size: 14px; font-weight: 700;">${item.evidenceId}</span>
              <span class="badge" style="background: rgba(34, 197, 94, 0.12); color: var(--status-success); border: 1px solid rgba(34, 197, 94, 0.3);">
                SEAL INTACT
              </span>
              <span class="badge badge-cyan" style="font-size: 10px;">${item.caseId}</span>
            </div>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-white);">${item.name}</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Type: <strong>${item.type}</strong> • Physical Tag: <strong>${item.physicalTag}</strong> • Current Custodian: <strong style="color: var(--accent-cyan);">${item.currentHolder}</strong>
            </p>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-sm btn-transfer-custody" data-evidence-id="${item.evidenceId}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 0 1 4-4h14"/><path d="M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 0 1-4 4H3"/></svg>
              Transfer Custody
            </button>
            <button class="btn btn-outline btn-sm btn-verify-evidence-hash" data-evidence-id="${item.evidenceId}" data-hash="${item.originalSha256}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              Verify Bitstream Hash
            </button>
          </div>
        </div>

        <!-- Visual Stepper Progress Bar -->
        <div class="custody-stepper">
          ${custodySteps.map((step, idx) => {
            const isCompleted = item.chainOfCustody.some(c => c.step.toLowerCase().includes(step.key.toLowerCase()));
            const isLast = idx === custodySteps.length - 1;
            return `
              <div class="custody-step ${isCompleted ? 'completed' : ''}">
                <div class="step-circle">
                  ${isCompleted ? `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ` : (idx + 1)}
                </div>
                <div class="step-label">${step.label}</div>
                <div class="step-subtext">${isCompleted ? 'CONFIRMED' : 'PENDING'}</div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Detailed Forensic Chain of Custody Ledger Table -->
        <div style="margin-top: 24px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
          <h4 style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-muted); margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Forensic Custody Ledger Entries (${item.chainOfCustody.length})
          </h4>
          <div class="table-responsive">
            <table class="data-table" style="font-size: 12px;">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Custodian Officer & Badge</th>
                  <th>Timestamp</th>
                  <th>Facility / Terminal</th>
                  <th>Recorded Forensic Action</th>
                </tr>
              </thead>
              <tbody>
                ${item.chainOfCustody.map(log => `
                  <tr>
                    <td>
                      <span class="badge badge-cyan" style="font-size: 10px;">${log.step}</span>
                    </td>
                    <td>
                      <strong style="color: var(--text-white);">${log.officer}</strong>
                    </td>
                    <td style="font-family: var(--font-mono); font-size: 11px;">${log.timestamp}</td>
                    <td style="font-size: 11px; color: var(--text-muted);">${log.location} (${log.terminalIp})</td>
                    <td style="font-size: 11.5px; color: #CBD5E1;">${log.action}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    // Custody Transfer buttons
    document.querySelectorAll('.btn-transfer-custody').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-evidence-id');
        const item = State.evidenceItems.find(e => e.evidenceId === id);
        if (item) {
          Modal.openCustodyTransferModal(item, () => {
            if (typeof onNavigate === 'function') onNavigate('vault');
          });
        }
      });
    });

    // Verify bitstream hash
    document.querySelectorAll('.btn-verify-evidence-hash').forEach(btn => {
      btn.addEventListener('click', () => {
        const hash = btn.getAttribute('data-hash');
        if (typeof onNavigate === 'function') onNavigate('verifier', false, { prefillHash: hash });
      });
    });

    // Custody cert button
    document.getElementById('btn-export-custody-cert')?.addEventListener('click', () => {
      Modal.openAuditCertificate();
    });
  }
};
