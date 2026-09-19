/**
 * CASEVAULT Authentication & Landing View
 */

import { State } from '../state.js';
import { Toast } from '../components/toast.js';

export const AuthView = {
  render() {
    return `
      <div class="auth-container">
        <!-- Left Hero Presentation Panel -->
        <div class="auth-hero-panel">
          <div class="hero-header">
            <div class="hero-brand">
              <img src="assets/logo.svg" alt="CASEVAULT Logo" class="hero-brand-logo" />
              <div>
                <span class="hero-brand-name">CASEVAULT</span>
                <span class="hero-brand-badge">SMART INDIA HACKATHON '26</span>
              </div>
            </div>
          </div>

          <div class="hero-body">
            <div class="hero-tagline-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Secure Records. Trusted Evidence. Complete Accountability.
            </div>

            <h1 class="hero-title">
              National Digital Evidence & <br />
              <span class="gradient-text">Legal Document Vault</span>
            </h1>

            <p class="hero-description">
              A centralized, tamper-resistant document management infrastructure built for 
              authorized law enforcement, judiciary officers, and forensic investigators. 
              Protected with client-side SHA-256 cryptographic verification, FIPS-compliant 
              AES-256 storage, and immutable chain of custody audit logging.
            </p>

            <div class="security-pills-grid">
              <div class="security-pill-card">
                <div class="pill-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div class="pill-text">
                  <h4>End-to-End Encryption</h4>
                  <p>AES-256-GCM authenticated crypto</p>
                </div>
              </div>

              <div class="security-pill-card">
                <div class="pill-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div class="pill-text">
                  <h4>Cryptographic Hashing</h4>
                  <p>SHA-256 bitwise tamper detection</p>
                </div>
              </div>

              <div class="security-pill-card">
                <div class="pill-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="pill-text">
                  <h4>Role-Based Access (RBAC)</h4>
                  <p>Strict security clearance matrix</p>
                </div>
              </div>

              <div class="security-pill-card">
                <div class="pill-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div class="pill-text">
                  <h4>Immutable Audit Trail</h4>
                  <p>Sec 65B forensic chain of custody</p>
                </div>
              </div>
            </div>
          </div>

          <div class="hero-footer">
            <span>Official Demonstration Portal</span>
            <span>•</span>
            <span>Smart India Hackathon</span>
            <span>•</span>
            <span>FIPS 140-2 Level 3 Hardware Root</span>
          </div>
        </div>

        <!-- Right Side: Secure Authentication Card -->
        <div class="auth-form-panel">
          <div class="auth-card">
            <div class="auth-header">
              <h2>Secure Investigator Login</h2>
              <p>Enter your departmental credentials or choose a quick evaluation profile</p>
            </div>

            <!-- Quick Demo Evaluator Picker -->
            <div class="quick-login-box">
              <div class="quick-login-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                SIH Evaluator Quick Access
              </div>
              <div class="quick-role-buttons">
                <button type="button" class="btn-demo-role" data-demo-role="Investigator" title="Inspector Vikram Malhotra (Lead Investigator)">
                  Investigator
                </button>
                <button type="button" class="btn-demo-role" data-demo-role="Forensic Analyst" title="Dr. Rajesh Sharma (Forensics)">
                  Forensics
                </button>
                <button type="button" class="btn-demo-role" data-demo-role="Administrator" title="Amitav Roy (Security Admin)">
                  Admin
                </button>
              </div>
            </div>

            <form id="auth-form">
              <div class="form-group">
                <label class="form-label" for="login-email">Official Email or Badge ID</label>
                <input 
                  type="text" 
                  id="login-email" 
                  class="form-input" 
                  placeholder="name@agency.gov.in" 
                  value="v.malhotra@casevault.gov.in" 
                  required 
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="login-password">
                  Security Passphrase
                  <a href="#" id="forgot-password-link" style="color: var(--accent-cyan); font-size: 11px; text-decoration: none;">Forgot?</a>
                </label>
                <input 
                  type="password" 
                  id="login-password" 
                  class="form-input" 
                  placeholder="••••••••••••" 
                  value="CyberShield@2026" 
                  required 
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="login-role">Assigned Clearance Role</label>
                <select id="login-role" class="form-select">
                  ${State.roles.map(r => `
                    <option value="${r}" ${r === 'Investigator' ? 'selected' : ''}>${r}</option>
                  `).join('')}
                </select>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; font-size: 12px; color: var(--text-muted);">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="checkbox" id="login-remember" checked />
                  Remember terminal identity
                </label>
                <span style="color: var(--accent-cyan); font-size: 11px;">MFA Required</span>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Authenticate & Access Vault
              </button>
            </form>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); text-align: center; font-size: 11px; color: var(--text-dark);">
              Protected by Hardware Security Module (HSM) • Unofficial access prohibited by Law
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(onLoginSuccess) {
    const form = document.getElementById('auth-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('login-role').value;
        State.switchUserRole(role);
        Toast.success('Authentication Confirmed', `Welcome back, ${State.currentUser.name}`);
        if (typeof onLoginSuccess === 'function') onLoginSuccess();
      });
    }

    // Demo Role buttons
    document.querySelectorAll('.btn-demo-role').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const role = btn.getAttribute('data-demo-role');
        State.switchUserRole(role);
        Toast.success('Demo Profile Loaded', `Switched to ${role}: ${State.currentUser.name}`);
        if (typeof onLoginSuccess === 'function') onLoginSuccess();
      });
    });

    const forgotLink = document.getElementById('forgot-password-link');
    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        Toast.info('Self-Service Recovery', 'Contact your Departmental Security Officer (Amitav Roy) for PKI token reset.');
      });
    }
  }
};
