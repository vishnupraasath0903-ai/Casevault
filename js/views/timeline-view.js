/**
 * CASEVAULT Investigation Timeline View
 * Chronological Case Incident Reconstruction with Automated Document Date Extraction,
 * Entity Association, and Source Exhibit Linkage.
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const TimelineView = {
  selectedCaseId: 'CASE-2026-0142',
  searchFilter: '',
  categoryFilter: 'ALL',

  render(params = {}) {
    if (params?.caseId) {
      this.selectedCaseId = params.caseId;
    }

    const currentCase = State.cases.find(c => c.id === this.selectedCaseId) || State.cases[0];
    let events = State.timelineEvents.filter(e => !this.selectedCaseId || e.caseId === this.selectedCaseId);

    // Apply search filter
    if (this.searchFilter) {
      const q = this.searchFilter.toLowerCase();
      events = events.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) || 
        e.relatedPerson.toLowerCase().includes(q) || 
        e.relatedLocation.toLowerCase().includes(q) ||
        e.date.includes(q)
      );
    }

    // Apply category filter
    if (this.categoryFilter !== 'ALL') {
      events = events.filter(e => e.category === this.categoryFilter);
    }

    // Sort chronologically ascending
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Investigation Timeline</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Chronological Investigation Timeline
            </h1>
            <p class="page-subtitle">Reconstructed sequence of events extracted from court exhibits, witness depositions, and forensic extractions</p>
          </div>

          <div class="page-actions">
            <!-- Case Selector -->
            <select class="form-select" id="timeline-case-select" style="min-width: 240px; font-weight: 600;">
              ${State.cases.map(c => `
                <option value="${c.id}" ${c.id === this.selectedCaseId ? 'selected' : ''}>
                  ${c.id} — ${c.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Timeline Toolbar -->
        <div class="timeline-toolbar">
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <input 
              type="text" 
              id="timeline-search-input" 
              class="form-control" 
              placeholder="Search timeline events, suspects, locations..." 
              value="${this.searchFilter}"
              style="width: 260px;"
            />

            <select class="filter-select" id="timeline-category-filter">
              <option value="ALL" ${this.categoryFilter === 'ALL' ? 'selected' : ''}>All Event Categories</option>
              <option value="Legal Action" ${this.categoryFilter === 'Legal Action' ? 'selected' : ''}>Legal Action</option>
              <option value="Evidence Seizure" ${this.categoryFilter === 'Evidence Seizure' ? 'selected' : ''}>Evidence Seizure</option>
              <option value="Subpoena" ${this.categoryFilter === 'Subpoena' ? 'selected' : ''}>Subpoena</option>
              <option value="Deposition" ${this.categoryFilter === 'Deposition' ? 'selected' : ''}>Deposition</option>
              <option value="Judicial Order" ${this.categoryFilter === 'Judicial Order' ? 'selected' : ''}>Judicial Order</option>
              <option value="Forensic Lab" ${this.categoryFilter === 'Forensic Lab' ? 'selected' : ''}>Forensic Lab</option>
              <option value="Financial Record" ${this.categoryFilter === 'Financial Record' ? 'selected' : ''}>Financial Record</option>
              <option value="Cyber Triage" ${this.categoryFilter === 'Cyber Triage' ? 'selected' : ''}>Cyber Triage</option>
            </select>
          </div>

          <div style="font-size: 12px; color: var(--text-muted);">
            Showing <strong style="color: var(--accent-cyan);">${events.length}</strong> sequential incidents
          </div>
        </div>

        <!-- Vertical Timeline Spine -->
        <div class="timeline-container">
          ${events.length === 0 ? `
            <div class="card" style="padding: 60px; text-align: center; color: var(--text-muted);">
              No timeline milestones match the filter criteria.
            </div>
          ` : `
            <div class="timeline-spine">
              ${events.map((evt, idx) => `
                <div class="timeline-event-row">
                  <!-- Date Marker -->
                  <div class="timeline-date-marker">
                    <span class="date-badge">${evt.date}</span>
                    <span class="time-badge">${evt.time || '10:00 IST'}</span>
                  </div>

                  <!-- Dot Anchor -->
                  <div class="timeline-dot-anchor">
                    <div class="timeline-dot"></div>
                  </div>

                  <!-- Event Content Card -->
                  <div class="timeline-card">
                    <div class="timeline-card-header">
                      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <span class="badge" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan); font-size: 10px;">
                          ${evt.category}
                        </span>
                        <h3 class="timeline-title">${evt.title}</h3>
                      </div>
                      <span class="code-cell" style="font-size: 10px; color: var(--text-dark);">${evt.id}</span>
                    </div>

                    <p class="timeline-desc">${evt.description}</p>

                    <!-- Connected Entities Row -->
                    <div class="timeline-entities-row">
                      ${evt.relatedPerson ? `
                        <div class="timeline-entity-chip">
                          <span style="color: var(--text-muted);">Person:</span>
                          <span style="color: #93C5FD; font-weight: 600;">👤 ${evt.relatedPerson}</span>
                        </div>
                      ` : ''}

                      ${evt.relatedLocation ? `
                        <div class="timeline-entity-chip">
                          <span style="color: var(--text-muted);">Location:</span>
                          <span style="color: #6EE7B7; font-weight: 600;">📍 ${evt.relatedLocation}</span>
                        </div>
                      ` : ''}

                      ${evt.relatedEvidence ? `
                        <div class="timeline-entity-chip">
                          <span style="color: var(--text-muted);">Evidence:</span>
                          <span class="code-cell" style="color: #FCD34D;">💾 ${evt.relatedEvidence}</span>
                        </div>
                      ` : ''}
                    </div>

                    <!-- Source Document Anchor -->
                    <div class="timeline-source-footer">
                      <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted);">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        </svg>
                        <span>Source Exhibit: <strong style="color: var(--text-white); font-family: var(--font-mono);">${evt.sourceDocName}</strong></span>
                      </div>

                      <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary btn-sm timeline-open-doc-btn" data-doc-id="${evt.sourceDocId}">
                          Open Source Document →
                        </button>
                        <button class="btn btn-outline btn-icon-only btn-sm timeline-ask-ai-btn" data-query="Explain the significance of '${evt.title}' on ${evt.date}" title="Ask AI about this event">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="9"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    // Case Selector
    document.getElementById('timeline-case-select')?.addEventListener('change', (e) => {
      this.selectedCaseId = e.target.value;
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Search Input
    document.getElementById('timeline-search-input')?.addEventListener('input', (e) => {
      this.searchFilter = e.target.value;
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Category Filter
    document.getElementById('timeline-category-filter')?.addEventListener('change', (e) => {
      this.categoryFilter = e.target.value;
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Open Source Document
    document.querySelectorAll('.timeline-open-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) Modal.openDocumentViewer(doc);
        else Toast.warning('Exhibit', `Document ${docId} not found.`);
      });
    });

    // Ask AI About Event
    document.querySelectorAll('.timeline-ask-ai-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (typeof onNavigate === 'function') {
          onNavigate('assistant', { prefillQuery: query, caseId: this.selectedCaseId });
        }
      });
    });
  }
};
