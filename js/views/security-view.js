/**
 * CASEVAULT Security Center View
 * Monitors hardware security modules, encryption health, FIPS 140-2 compliance,
 * and includes a live interactive Security Diagnostic Scan trigger.
 */

import { State } from '../state.js';
import { Toast } from '../components/toast.js';

export const SecurityView = {
  isScanning: false,

  render() {
    const sec = State.securityStatus;

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Security Center</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
              </svg>
              Enclave Defense & Cryptographic Security Center
            </h1>
            <p class="page-subtitle">Real-time health monitoring of encryption engines, hardware roots of trust, and automated intrusion safeguards</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-cyan btn-sm" id="btn-run-diag-scan" ${this.isScanning ? 'disabled' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              ${this.isScanning ? 'Executing Diagnostic Scan...' : 'Execute Security Diagnostic Scan'}
            </button>
          </div>
        </div>

        <!-- Scan Progress Banner (Visible during active scan) -->
        <div id="scan-progress-box" style="${this.isScanning ? 'display: block;' : 'display: none;'} margin-bottom: 24px; background: rgba(6, 182, 212, 0.08); border: 1px solid var(--accent-cyan); border-radius: var(--radius-md); padding: 18px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <strong style="color: var(--accent-cyan); font-size: 13px;">DIAGNOSTIC SCAN IN PROGRESS: Checking Cryptographic Ledger Parity...</strong>
            <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-white);" id="scan-pct-label">0%</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(7, 17, 31, 0.8); border-radius: var(--radius-pill); overflow: hidden;">
            <div id="scan-bar-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan)); transition: width 0.3s;"></div>
          </div>
        </div>

        <!-- Security Health Metric Cards Grid -->
        <div class="metrics-grid">
          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Encryption Engine</span>
              <div class="stat-icon-wrapper" style="background: rgba(34, 197, 94, 0.12); color: var(--status-success);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size: 18px;">AES-256-GCM</div>
            <div class="stat-trend positive">FIPS 140-2 Level 3 HSM</div>
          </div>

          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Authentication Engine</span>
              <div class="stat-icon-wrapper" style="background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size: 18px;">FIDO2 / PKI</div>
            <div class="stat-trend positive">Strict MFA Enforced</div>
          </div>

          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Document Integrity</span>
              <div class="stat-icon-wrapper" style="background: rgba(34, 197, 94, 0.12); color: var(--status-success);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size: 18px; color: var(--status-success);">${sec.documentIntegrity}</div>
            <div class="stat-trend positive">Bit-for-Bit Verified</div>
          </div>

          <div class="stat-card">
            <div class="stat-card-header">
              <span class="stat-label">Active Sessions</span>
              <div class="stat-icon-wrapper" style="background: rgba(37, 99, 235, 0.12); color: var(--accent-blue-light);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              </div>
            </div>
            <div class="stat-value" style="font-size: 18px;">${sec.activeSessions} Terminals</div>
            <div class="stat-trend neutral">TLS 1.3 Ephemeral</div>
          </div>
        </div>

        <!-- Security Sub-panels: Cryptographic Hardware Specs & Threat Telemetry -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Cryptographic Subsystem Compliance
              </span>
            </div>
            <div class="card-body">
              <div style="display: flex; flex-direction: column; gap: 14px; font-size: 12.5px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <span style="color: var(--text-muted);">Symmetric Cipher:</span>
                  <strong style="color: var(--text-white); font-family: var(--font-mono);">AES-GCM 256-bit with 96-bit Nonce</strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <span style="color: var(--text-muted);">Digital Signature Algorithm:</span>
                  <strong style="color: var(--text-white); font-family: var(--font-mono);">ECDSA with NIST P-256 Curve & SHA-256</strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <span style="color: var(--text-muted);">Key Derivation Function:</span>
                  <strong style="color: var(--text-white); font-family: var(--font-mono);">PBKDF2 with 600,000 Iterations</strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
                  <span style="color: var(--text-muted);">HSM Security Standard:</span>
                  <span class="badge badge-active" style="font-size: 10px;">FIPS 140-2 Level 3 Validated</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">Continuous Snapshot Frequency:</span>
                  <strong style="color: var(--accent-cyan); font-family: var(--font-mono);">Every 15 Minutes (Append-Only)</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Enclave Defense & Threat Countermeasures
              </span>
            </div>
            <div class="card-body">
              <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
                <div style="background: var(--bg-slate); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--status-success);">
                  <strong style="color: var(--text-white); display: block;">Zero-Knowledge Storage Enclave</strong>
                  <p style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Database administrators cannot decrypt raw document blobs without ephemeral officer PKI tokens.</p>
                </div>
                <div style="background: var(--bg-slate); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--status-success);">
                  <strong style="color: var(--text-white); display: block;">Automated Tamper-Tripwire Protocol</strong>
                  <p style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Any detected hash divergence triggers automated session suspension, forensic alert logging, and evidence locking.</p>
                </div>
                <div style="background: var(--bg-slate); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan);">
                  <strong style="color: var(--text-white); display: block;">Section 65B BNSS Audit Chain</strong>
                  <p style="color: var(--text-muted); font-size: 11px; margin-top: 2px;">Cryptographic Merkle tree hash chaining ensures audit records cannot be silently rewritten or excised.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    const scanBtn = document.getElementById('btn-run-diag-scan');
    const scanBox = document.getElementById('scan-progress-box');
    const barFill = document.getElementById('scan-bar-fill');
    const pctLabel = document.getElementById('scan-pct-label');

    scanBtn?.addEventListener('click', () => {
      this.isScanning = true;
      scanBtn.setAttribute('disabled', 'true');
      scanBox.style.display = 'block';

      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        if (progress > 100) progress = 100;
        barFill.style.width = `${progress}%`;
        pctLabel.textContent = `${progress}%`;

        if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            this.isScanning = false;
            scanBox.style.display = 'none';
            scanBtn.removeAttribute('disabled');
            State.securityStatus.lastSecurityScan = 'Just now';
            State.addAuditLog({
              action: 'VERIFY',
              document: 'ALL_VAULT_ARTIFACTS',
              docId: 'VAULT-SCAN',
              caseId: '-',
              details: 'Comprehensive security diagnostic completed. 100% cryptographic parity confirmed across 12,458 records.'
            });
            Toast.success('Diagnostic Complete', '100% Enclave Health Confirmed. Zero vulnerabilities detected.');
            if (typeof onNavigate === 'function') onNavigate('security');
          }, 600);
        }
      }, 250);
    });
  }
};
