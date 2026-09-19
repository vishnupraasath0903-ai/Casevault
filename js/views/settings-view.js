/**
 * CASEVAULT Settings & Security Preferences View
 */

import { State } from '../state.js';
import { Toast } from '../components/toast.js';

export const SettingsView = {
  render() {
    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Settings & Enclave Configuration</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Enclave System Settings & Terminal Preferences
            </h1>
            <p class="page-subtitle">Configure hardware token pairing, forensic export watermarks, and cryptographic session retention</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- Officer Identity & PKI Credentials -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Investigator Identity & PKI Token
              </span>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Full Name & Title</label>
                <input type="text" class="form-input" value="${State.currentUser.name}" readonly />
              </div>
              <div class="form-group">
                <label class="form-label">Assigned Department</label>
                <input type="text" class="form-input" value="${State.currentUser.department}" readonly />
              </div>
              <div class="form-group">
                <label class="form-label">Security Clearance Level</label>
                <input type="text" class="form-input form-input-mono" value="${State.currentUser.clearance}" readonly />
              </div>
              <div class="form-group">
                <label class="form-label">FIDO2 Hardware Security Token</label>
                <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-slate); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                  <span style="font-family: var(--font-mono); font-size: 11px; color: var(--status-success);">YubiKey 5 FIPS (SN: 9948102) Active</span>
                  <span class="badge badge-active" style="font-size: 9px;">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Watermark & Legal Admissibility Policy -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                Legal Export & Watermark Policy
              </span>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">Global Watermark Text</label>
                <input type="text" class="form-input" id="setting-watermark-text" value="CASEVAULT // CONFIDENTIAL // LAW ENFORCEMENT ONLY" />
              </div>

              <div class="form-group">
                <label class="form-label">Session Idle Timeout</label>
                <select class="form-select">
                  <option value="15" selected>15 Minutes (Strict Investigation Standard)</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">60 Minutes</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Evidence Chain of Custody Standard</label>
                <select class="form-select">
                  <option selected>Section 65B Indian Evidence Act / BNSS 2023</option>
                  <option>ISO/IEC 27037 Digital Evidence Standard</option>
                </select>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 12px; color: var(--text-muted);">
                <input type="checkbox" id="watermark-ip-check" checked />
                <label for="watermark-ip-check">Embed requesting investigator IP and timestamp on exported documents</label>
              </div>

              <button class="btn btn-primary" id="btn-save-settings" style="width: 100%; margin-top: 24px;">
                Save Enclave Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      Toast.success('Preferences Saved', 'Enclave security and watermark policies updated.');
    });
  }
};
