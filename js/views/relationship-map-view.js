/**
 * CASEVAULT Evidence Relationship Map View
 * Interactive visual graph connecting:
 * Person ↔ Evidence ↔ Location ↔ Event ↔ Document ↔ Organization
 */

import { State } from '../state.js';
import { RelationshipGraphRenderer } from '../services/graph-service.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const RelationshipMapView = {
  graphRenderer: null,
  selectedNode: null,
  selectedCaseId: 'CASE-2026-0142',

  render(params = {}) {
    if (params?.caseId) {
      this.selectedCaseId = params.caseId;
    }

    const currentCase = State.cases.find(c => c.id === this.selectedCaseId) || State.cases[0];

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Evidence Relationship Map</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Interactive Evidence Relationship Network
            </h1>
            <p class="page-subtitle">Multi-dimensional forensic graph mapping people, physical media, geo-coordinates, and court exhibits</p>
          </div>

          <div class="page-actions">
            <!-- Case Selector -->
            <select class="form-select" id="graph-case-select" style="min-width: 240px; font-weight: 600;">
              ${State.cases.map(c => `
                <option value="${c.id}" ${c.id === this.selectedCaseId ? 'selected' : ''}>
                  ${c.id} — ${c.name}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Graph Workspace Toolbar: Filters, Zoom, Search -->
        <div class="graph-toolbar">
          <div class="graph-filter-chips">
            <span style="font-size: 11px; color: var(--text-dark); text-transform: uppercase; font-weight: 700; margin-right: 6px;">Filter Entities:</span>
            <label class="graph-chip chip-person">
              <input type="checkbox" checked data-category="PERSON" />
              <span>👤 Person</span>
            </label>
            <label class="graph-chip chip-evidence">
              <input type="checkbox" checked data-category="EVIDENCE" />
              <span>💾 Evidence</span>
            </label>
            <label class="graph-chip chip-location">
              <input type="checkbox" checked data-category="LOCATION" />
              <span>📍 Location</span>
            </label>
            <label class="graph-chip chip-event">
              <input type="checkbox" checked data-category="EVENT" />
              <span>⚡ Event</span>
            </label>
            <label class="graph-chip chip-document">
              <input type="checkbox" checked data-category="DOCUMENT" />
              <span>📄 Document</span>
            </label>
            <label class="graph-chip chip-org">
              <input type="checkbox" checked data-category="ORGANIZATION" />
              <span>🏢 Organization</span>
            </label>
          </div>

          <div class="graph-controls-group">
            <input 
              type="text" 
              id="graph-search-input" 
              class="form-control" 
              placeholder="Search node..." 
              style="width: 170px; height: 32px; font-size: 11px; padding: 4px 10px;"
            />
            <button class="btn btn-secondary btn-icon-only btn-sm" id="btn-zoom-in" title="Zoom In">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button class="btn btn-secondary btn-icon-only btn-sm" id="btn-zoom-out" title="Zoom Out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button class="btn btn-secondary btn-icon-only btn-sm" id="btn-zoom-reset" title="Reset View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
            </button>
          </div>
        </div>

        <!-- Graph Main Canvas & Inspector Drawer -->
        <div class="graph-layout">
          <!-- Main Canvas Viewport -->
          <div class="graph-canvas-container" id="relationship-graph-container">
            <!-- Canvas rendered via RelationshipGraphRenderer -->
          </div>

          <!-- Entity Detail Inspector Drawer -->
          <div class="graph-inspector-panel" id="graph-inspector-pane">
            <div class="card" style="height: 100%; display: flex; flex-direction: column;">
              <div class="card-header">
                <span class="card-title" style="font-size: 13px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  Entity Dossier Inspector
                </span>
              </div>
              <div class="card-body" id="graph-inspector-body" style="padding: 16px; overflow-y: auto; flex: 1;">
                ${this.renderInspectorPlaceholder()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderInspectorPlaceholder() {
    return `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-dark);">
        <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.7;">🕸️</div>
        <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px;">Select Any Node</div>
        <p style="font-size: 11px; line-height: 1.6; color: var(--text-muted);">
          Click on any Person, Evidence, Location, Event, or Document to inspect connected legal exhibits, contact details, and cryptographic status.
        </p>
      </div>
    `;
  },

  renderNodeDetails(node, onNavigate) {
    const data = node.data || {};
    const cat = node.category;

    return `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
          <div>
            <span class="badge" style="font-size: 10px; margin-bottom: 4px; background: rgba(6,182,212,0.15); color: var(--accent-cyan);">
              ${cat}
            </span>
            <h3 style="font-size: 15px; color: var(--text-white); font-weight: 700;">${node.label}</h3>
          </div>
          <span style="font-size: 20px;">
            ${cat === 'PERSON' ? '👤' : cat === 'EVIDENCE' ? '💾' : cat === 'LOCATION' ? '📍' : cat === 'EVENT' ? '⚡' : cat === 'DOCUMENT' ? '📄' : '🏢'}
          </span>
        </div>

        <!-- Metadata Attributes -->
        <div style="background: var(--bg-slate); border-radius: var(--radius-sm); padding: 12px; font-size: 11.5px; display: flex; flex-direction: column; gap: 6px;">
          ${data.role ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Role:</span> <strong style="color: var(--text-white);">${data.role}</strong></div>` : ''}
          ${data.type ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Classification:</span> <span style="color: var(--accent-cyan);">${data.type}</span></div>` : ''}
          ${data.phone ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Phone:</span> <span class="code-cell">${data.phone}</span></div>` : ''}
          ${data.email ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Email:</span> <span style="color: var(--text-white);">${data.email}</span></div>` : ''}
          ${data.date ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Timestamp:</span> <span class="code-cell">${data.date}</span></div>` : ''}
          ${data.status ? `<div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Status:</span> <span style="color: var(--status-warning); font-weight: 600;">${data.status}</span></div>` : ''}
          ${data.originalSha256 || data.sha256 ? `
            <div style="margin-top: 4px;">
              <span style="color: var(--text-muted); display: block; font-size: 10px; margin-bottom: 2px;">SHA-256 HASH:</span>
              <span class="code-cell" style="font-size: 9.5px; word-break: break-all;">${(data.originalSha256 || data.sha256).substring(0, 24)}...</span>
            </div>
          ` : ''}
        </div>

        ${data.notes || data.description ? `
          <div style="font-size: 12px; line-height: 1.6; color: #CBD5E1; background: rgba(7, 17, 31, 0.6); padding: 10px; border-radius: var(--radius-sm); border: 1px solid rgba(148,163,184,0.1);">
            "${data.notes || data.description}"
          </div>
        ` : ''}

        <!-- Actions -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
          ${data.documents && data.documents.length > 0 ? `
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 2px;">Direct Associated Documents:</div>
            ${data.documents.slice(0, 3).map(docId => `
              <button class="btn btn-secondary btn-sm graph-open-doc-btn" data-doc-id="${docId}" style="justify-content: flex-start; text-align: left; font-size: 11px;">
                📄 Open ${docId}
              </button>
            `).join('')}
          ` : ''}

          ${cat === 'DOCUMENT' ? `
            <button class="btn btn-primary btn-sm graph-open-doc-btn" data-doc-id="${data.id || node.id}">
              Inspect Full Legal Dossier
            </button>
          ` : ''}

          <button class="btn btn-outline btn-sm graph-ask-ai-btn" data-query="What evidence and documents are connected to ${node.label}?">
            Ask AI Case Assistant About ${node.label} →
          </button>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    const container = document.getElementById('relationship-graph-container');
    if (container) {
      this.graphRenderer = new RelationshipGraphRenderer(container, {
        onNodeClick: (node) => {
          this.selectedNode = node;
          const inspectorBody = document.getElementById('graph-inspector-body');
          if (inspectorBody) {
            inspectorBody.innerHTML = this.renderNodeDetails(node, onNavigate);
            this.bindInspectorButtons(onNavigate);
          }
        }
      });

      const graphData = State.getRelationshipGraph(this.selectedCaseId);
      this.graphRenderer.setData(graphData);
    }

    // Case Selector
    document.getElementById('graph-case-select')?.addEventListener('change', (e) => {
      this.selectedCaseId = e.target.value;
      const graphData = State.getRelationshipGraph(this.selectedCaseId);
      this.graphRenderer?.setData(graphData);
      const inspectorBody = document.getElementById('graph-inspector-body');
      if (inspectorBody) inspectorBody.innerHTML = this.renderInspectorPlaceholder();
    });

    // Zoom Controls
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.graphRenderer?.zoom(1.2));
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.graphRenderer?.zoom(0.8));
    document.getElementById('btn-zoom-reset')?.addEventListener('click', () => this.graphRenderer?.resetView());

    // Search Input
    document.getElementById('graph-search-input')?.addEventListener('input', (e) => {
      this.graphRenderer?.setSearchQuery(e.target.value);
    });

    // Category Filter Chips
    document.querySelectorAll('.graph-chip input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const cat = e.target.getAttribute('data-category');
        this.graphRenderer?.setCategoryFilter(cat, e.target.checked);
      });
    });
  },

  bindInspectorButtons(onNavigate) {
    document.querySelectorAll('.graph-open-doc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) Modal.openDocumentViewer(doc);
      });
    });

    document.querySelectorAll('.graph-ask-ai-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (typeof onNavigate === 'function') {
          onNavigate('assistant', { prefillQuery: query, caseId: this.selectedCaseId });
        }
      });
    });
  }
};
