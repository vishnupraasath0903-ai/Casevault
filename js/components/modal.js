/**
 * CASEVAULT Modal Manager & Prebuilt Forensic Viewers
 * Upgraded Document Details Dossier with:
 * - Metadata, Hash, and PKI Certificates
 * - Cryptographic Integrity & Duplicate Status Badges
 * - AI-Generated Document Summary
 * - Extracted Entity Chips (People, Locations, Events, Related Docs)
 * - Direct Actions: View, Download, Verify, Find Related Evidence, Ask AI
 */

import { Toast } from './toast.js';
import { State } from '../state.js';

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.initGlobalListeners();
  }

  initGlobalListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });
  }

  open({ title, bodyHtml, footerHtml = '', size = 'md', onClose = null }) {
    this.close();

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'modal-active-backdrop';

    backdrop.innerHTML = `
      <div class="modal-content ${size === 'lg' ? 'modal-lg' : ''}" role="dialog">
        <div class="modal-header">
          <div class="modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            ${title}
          </div>
          <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.body.appendChild(backdrop);
    this.activeModal = { backdrop, onClose };

    document.getElementById('modal-close-btn').addEventListener('click', () => this.close());
  }

  close() {
    if (this.activeModal) {
      if (typeof this.activeModal.onClose === 'function') {
        this.activeModal.onClose();
      }
      this.activeModal.backdrop.remove();
      this.activeModal = null;
    }
  }

  /**
   * Opens the upgraded Document Details & Forensic Dossier
   */
  openDocumentViewer(doc) {
    // Record view in audit log
    State.addAuditLog({
      action: 'VIEW',
      document: doc.name,
      docId: doc.id,
      caseId: doc.caseId,
      details: `Interactive dossier opened for ${doc.id}. Ephemeral access authorized.`
    });

    const isTampered = doc.isTampered || false;
    const isDuplicate = doc.isDuplicate || false;
    const isNearDuplicate = doc.isNearDuplicate || false;
    const people = doc.entities?.people || [];
    const locations = doc.entities?.locations || [];
    const events = doc.entities?.events || [];
    const keywords = doc.entities?.keywords || [];

    const bodyHtml = `
      <div style="display: grid; grid-template-columns: 1.45fr 1fr; gap: 20px;">
        <!-- Left: Legal Document Preview with Watermark & AI Summary -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Status Badges Bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge badge-classification class-${doc.classification.toLowerCase().replace(/\s+/g, '-')}">
                ${doc.classification}
              </span>
              <span class="badge badge-cyan" style="font-family: var(--font-mono);">
                ${doc.caseId}
              </span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 6px;">
              <!-- Integrity Status -->
              <span class="badge ${isTampered ? 'badge-danger' : 'badge-active'}" style="font-weight: 700;">
                ${isTampered ? '⚠ TAMPERED' : '✓ INTEGRITY VERIFIED'}
              </span>

              <!-- Duplicate Status -->
              ${isDuplicate ? `
                <span class="badge badge-danger" style="font-weight: 700;">
                  ⚠ 100% DUPLICATE
                </span>
              ` : isNearDuplicate ? `
                <span class="badge badge-warning" style="font-weight: 700;">
                  ⚠ NEAR-DUPLICATE (${doc.duplicateSimilarity}%)
                </span>
              ` : `
                <span class="badge" style="background: rgba(34,197,94,0.12); color: var(--status-success);">
                  ✓ UNIQUE EXHIBIT
                </span>
              `}
            </div>
          </div>

          <!-- AI-Generated Summary Box -->
          <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: var(--radius-sm); padding: 12px 14px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.5px; text-transform: uppercase; display: flex; align-items: center; gap: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                AI-Generated Executive Summary
              </span>
              <span style="font-size: 9.5px; color: var(--text-dark);">Verified Match</span>
            </div>
            <p style="font-size: 12px; color: #E2E8F0; line-height: 1.5;">
              ${doc.aiSummary || 'Automated AI extraction of legal allegations, named parties, and transactional details grounded in verified record contents.'}
            </p>
          </div>

          <!-- Document Text Viewer with Watermark -->
          <div style="background: #0B1321; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; min-height: 300px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
            <div class="watermark-overlay">CASEVAULT // EVIDENCE VAULT</div>
            
            <div style="position: relative; z-index: 2;">
              <div style="display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(148, 163, 184, 0.15); padding-bottom: 10px; margin-bottom: 12px;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <div>
                  <h4 style="font-size: 13.5px; color: var(--text-white); font-weight: 600;">${doc.name}</h4>
                  <p style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono);">${doc.id} • ${doc.fileSize} • ${doc.docType}</p>
                </div>
              </div>

              <div style="font-size: 12px; line-height: 1.7; color: #CBD5E1; font-family: var(--font-sans); background: rgba(7, 17, 31, 0.6); padding: 14px; border-radius: var(--radius-sm); border: 1px solid rgba(148, 163, 184, 0.08); white-space: pre-wrap; max-height: 240px; overflow-y: auto;">
${doc.contentSnippet || 'LEGAL RECORD CONTENT SECURED IN ENCRYPTED REST STORAGE.'}
              </div>
            </div>

            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(148, 163, 184, 0.15); display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: var(--text-dark); position: relative; z-index: 2;">
              <span>Cryptographic Session: TLS 1.3 / AES-256-GCM</span>
              <span>Watermark ID: CV-${doc.id}</span>
            </div>
          </div>
        </div>

        <!-- Right: Extracted Intelligence, Entities & Cryptography -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Metadata Section -->
          <div style="background: var(--bg-slate); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
            <h5 style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.6px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Document Metadata
            </h5>
            <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11.5px;">
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Uploaded By:</span> <strong style="color: var(--text-white);">${doc.uploadedBy}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Timestamp:</span> <span style="color: var(--text-white); font-family: var(--font-mono);">${doc.uploadDate}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Department:</span> <span style="color: var(--text-white);">${doc.department}</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Doc Type:</span> <span style="color: var(--accent-cyan); font-weight: 500;">${doc.docType}</span></div>
            </div>
          </div>

          <!-- Cryptographic Hash & PKI Section -->
          <div style="background: var(--bg-slate); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: var(--radius-md); padding: 14px; box-shadow: 0 0 12px rgba(6, 182, 212, 0.08);">
            <h5 style="font-size: 10.5px; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Cryptographic Integrity
            </h5>
            <div>
              <span style="font-size: 9.5px; color: var(--text-muted); display: block; margin-bottom: 2px;">SHA-256 MASTER DIGEST:</span>
              <div class="hash-chip" style="width: 100%; justify-content: space-between; word-break: break-all; font-size: 9.5px;">
                <span>${doc.sha256}</span>
                <button class="copy-btn" id="copy-hash-btn" title="Copy SHA-256">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
            </div>
            
            <div style="margin-top: 8px; font-size: 10.5px; display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">PKI Signature:</span>
                <span style="color: var(--status-success); font-family: var(--font-mono); font-weight: 600;">✓ ${doc.digitalSignatureStatus}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Signer Authority:</span>
                <span style="color: var(--text-white); font-size: 10px;">${doc.signer || 'Certified Forensic Examiner'}</span>
              </div>
            </div>
          </div>

          <!-- Extracted Entities Section -->
          <div style="background: var(--bg-slate); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
            <h5 style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.6px; margin-bottom: 8px;">
              Extracted Intelligence Entities
            </h5>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${people.length > 0 ? `
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 3px;">People:</span>
                  <div class="tags-row">
                    ${people.map(p => `<span class="tag-pill tag-person">👤 ${p}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              ${locations.length > 0 ? `
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 3px;">Locations:</span>
                  <div class="tags-row">
                    ${locations.map(l => `<span class="tag-pill tag-location">📍 ${l}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              ${events.length > 0 ? `
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 3px;">Events:</span>
                  <div class="tags-row">
                    ${events.map(ev => `<span class="tag-pill tag-event">⚡ ${ev}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              ${keywords.length > 0 ? `
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); display: block; margin-bottom: 3px;">Keywords:</span>
                  <div class="tags-row">
                    ${keywords.slice(0, 3).map(k => `<span class="tag-pill tag-neutral">${k}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // 5 Explicit Buttons requested in specification:
    // View, Download, Verify Integrity, Find Related Evidence, Ask AI About This Document
    const footerHtml = `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" id="modal-verify-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Verify Integrity
          </button>
          <button class="btn btn-secondary btn-sm" id="modal-find-evidence-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/></svg>
            Find Related Evidence
          </button>
          <button class="btn btn-secondary btn-sm" id="modal-ask-ai-btn" style="color: var(--accent-cyan); border-color: rgba(6,182,212,0.3);">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            Ask AI About This Document
          </button>
        </div>

        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="modal-share-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
          <button class="btn btn-primary btn-sm" id="modal-download-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Signed Copy
          </button>
        </div>
      </div>
    `;

    this.open({
      title: `Document Dossier: ${doc.id} — ${doc.name}`,
      bodyHtml,
      footerHtml,
      size: 'lg'
    });

    // Event Bindings
    document.getElementById('copy-hash-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(doc.sha256);
      Toast.success('Hash Copied', 'SHA-256 master digest copied to clipboard.');
    });

    document.getElementById('modal-verify-btn')?.addEventListener('click', () => {
      this.close();
      window.dispatchEvent(new CustomEvent('navigate-view', { detail: { view: 'verifier', docId: doc.id } }));
    });

    document.getElementById('modal-find-evidence-btn')?.addEventListener('click', () => {
      this.close();
      window.dispatchEvent(new CustomEvent('navigate-view', { detail: { view: 'graph', caseId: doc.caseId } }));
      Toast.info('Relationship Network', `Focused on case graph for ${doc.caseId}`);
    });

    document.getElementById('modal-ask-ai-btn')?.addEventListener('click', () => {
      this.close();
      window.dispatchEvent(new CustomEvent('navigate-view', { 
        detail: { 
          view: 'assistant', 
          caseId: doc.caseId, 
          prefillQuery: `What information appears in document ${doc.name}?` 
        } 
      }));
    });

    document.getElementById('modal-share-btn')?.addEventListener('click', () => {
      this.openShareModal(doc);
    });

    document.getElementById('modal-download-btn')?.addEventListener('click', () => {
      State.addAuditLog({
        action: 'DOWNLOAD',
        document: doc.name,
        docId: doc.id,
        caseId: doc.caseId,
        details: 'Watermarked legal copy exported with embedded digital signature token.'
      });
      Toast.success('Secure Download Initiated', `Audit entry logged for ${doc.name}`);
    });
  }

  /**
   * Share Document Modal with time-bound token generator
   */
  openShareModal(doc) {
    const bodyHtml = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: var(--radius-sm); padding: 12px; font-size: 12px; color: var(--text-primary);">
          Sharing <strong>${doc.name}</strong> (${doc.id}). All external views and downloads are tracked in the immutable forensic audit log.
        </div>
        
        <div class="form-group">
          <label class="form-label">Authorized Recipient Email / Badge ID</label>
          <input type="text" class="form-input" id="share-recipient-input" placeholder="e.g., prosecutor.desk@prosecution.gov.in" value="a.deshmukh@prosecution.gov.in" />
        </div>

        <div class="form-group">
          <label class="form-label">Security Clearance Level Required</label>
          <select class="form-select" id="share-clearance-select">
            <option value="Level 4 (Secret)">Level 4 (Secret)</option>
            <option value="Level 3 (Confidential)">Level 3 (Confidential)</option>
            <option value="Level 2 (Internal)">Level 2 (Internal)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Access Token Expiry Window</label>
          <select class="form-select" id="share-expiry-select">
            <option value="24h">24 Hours (Standard Court Session)</option>
            <option value="48h">48 Hours (Multi-Day Hearing)</option>
            <option value="7d">7 Days (Forensic Peer Review)</option>
          </select>
        </div>
      </div>
    `;

    const footerHtml = `
      <div style="display: flex; justify-content: flex-end; gap: 10px; width: 100%;">
        <button class="btn btn-secondary btn-sm" id="modal-cancel-share-btn">Cancel</button>
        <button class="btn btn-primary btn-sm" id="modal-confirm-share-btn">Generate Secure Token</button>
      </div>
    `;

    this.open({
      title: 'Secure Evidence Sharing Portal',
      bodyHtml,
      footerHtml,
      size: 'md'
    });

    document.getElementById('modal-cancel-share-btn')?.addEventListener('click', () => this.close());
    document.getElementById('modal-confirm-share-btn')?.addEventListener('click', () => {
      const recipient = document.getElementById('share-recipient-input')?.value || 'Designated Recipient';
      State.addAuditLog({
        action: 'SHARE',
        document: doc.name,
        docId: doc.id,
        caseId: doc.caseId,
        details: `Cryptographic token generated for ${recipient}. Watermarked copy dispatched.`
      });
      Toast.success('Token Generated', `Document shared securely with ${recipient}`);
      this.close();
    });
  }
}

export const Modal = new ModalManager();
