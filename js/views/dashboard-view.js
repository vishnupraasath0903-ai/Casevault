/**
 * CASEVAULT Upgraded National Investigation Dashboard
 * Features Case Overview, AI Intelligence Insights, Evidence Status Gauges,
 * Investigation Timeline Snippet, Relationship Map Launcher, and AI Assistant Quick Interrogation.
 */

import { State } from '../state.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const DashboardView = {
  activeCaseId: 'CASE-2026-0142',

  render(params = {}) {
    if (params?.caseId) {
      this.activeCaseId = params.caseId;
    }

    const currentCase = State.cases.find(c => c.id === this.activeCaseId) || State.cases[0];
    const caseDocs = State.documents.filter(d => d.caseId === currentCase.id);
    const caseEvidence = State.evidenceItems.filter(e => e.caseId === currentCase.id);
    const caseEntities = State.getCaseEntities(currentCase.id);
    const caseEvents = State.timelineEvents.filter(e => e.caseId === currentCase.id);

    // Evidence Status Metrics
    const verifiedDocsCount = State.documents.filter(d => d.hashStatus === 'MATCHED' && !d.isTampered).length;
    const tamperedCount = State.documents.filter(d => d.isTampered).length;
    const duplicateCount = State.documents.filter(d => d.isDuplicate || d.isNearDuplicate).length;
    const unverifiedCount = State.documents.filter(d => d.hashStatus === 'UNVERIFIED').length;

    const recentActivity = State.auditLogs.slice(0, 6);

    return `
      <div class="view-animate-in">
        <!-- Breadcrumb & Header -->
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">AI Investigation & Evidence Intelligence Hub</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              AI Evidence Intelligence Hub
            </h1>
            <p class="page-subtitle">
              Active Officer: <strong>${State.currentUser.name}</strong> • ${State.currentUser.department} • Clearance: <strong>${State.currentUser.clearance}</strong>
            </p>
          </div>

          <div class="page-actions">
            <!-- Case Focus Switcher -->
            <select class="form-select" id="dash-case-selector" style="min-width: 240px; font-weight: 600;">
              ${State.cases.map(c => `
                <option value="${c.id}" ${c.id === this.activeCaseId ? 'selected' : ''}>
                  ${c.id} — ${c.name}
                </option>
              `).join('')}
            </select>

            <button class="btn btn-primary btn-sm" id="dash-launch-assistant" style="background: linear-gradient(135deg, #2563EB, #06B6D4);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><circle cx="12" cy="12" r="9"/></svg>
              Ask AI Assistant
            </button>
          </div>
        </div>

        <!-- 1. CASE OVERVIEW BANNER -->
        <div class="case-overview-card">
          <div class="case-overview-header">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span class="badge badge-cyan" style="font-family: var(--font-mono); font-size: 11px;">CASE ID: ${currentCase.id}</span>
                <span class="badge ${currentCase.status === 'Active' ? 'badge-active' : 'badge-warning'}">${currentCase.status}</span>
                <span class="badge badge-classification class-restricted-evidence">${currentCase.priority || 'Critical'} Priority</span>
              </div>
              <h2 style="font-size: 18px; color: var(--text-white); font-weight: 700;">${currentCase.name}</h2>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px; max-width: 800px;">
                ${currentCase.description}
              </p>
            </div>
            <div style="text-align: right; min-width: 180px;">
              <span style="font-size: 11px; color: var(--text-muted); display: block;">Investigating Officer</span>
              <strong style="color: var(--text-white); font-size: 13px;">${currentCase.leadInvestigator}</strong>
              <span style="font-size: 11px; color: var(--accent-cyan); display: block; margin-top: 2px;">${currentCase.department}</span>
            </div>
          </div>

          <!-- 9 Key Investigation Metrics Counters -->
          <div class="case-metrics-row">
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: var(--accent-cyan);">${caseDocs.length}</span>
              <span class="case-stat-name">Case Documents</span>
            </div>
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: #FBBF24;">${caseEvidence.length}</span>
              <span class="case-stat-name">Physical Evidence</span>
            </div>
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: #60A5FA;">${caseEntities.people.length}</span>
              <span class="case-stat-name">Identified People</span>
            </div>
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: #34D399;">${caseEntities.locations.length}</span>
              <span class="case-stat-name">Key Locations</span>
            </div>
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: #A78BFA;">${caseEvents.length}</span>
              <span class="case-stat-name">Timeline Events</span>
            </div>
            <div class="case-stat-box">
              <span class="case-stat-num" style="color: #FB923C;">${caseEntities.organizations.length}</span>
              <span class="case-stat-name">Shell Entities</span>
            </div>
          </div>
        </div>

        <!-- 2. EVIDENCE STATUS SUMMARY ROW -->
        <div class="evidence-status-strip">
          <div class="evidence-status-pill status-verified" data-nav="documents">
            <div class="status-indicator-dot dot-green"></div>
            <div>
              <div class="status-pill-val">${verifiedDocsCount}</div>
              <div class="status-pill-lbl">Verified Documents</div>
            </div>
          </div>

          <div class="evidence-status-pill status-tampered" data-nav="verifier">
            <div class="status-indicator-dot dot-red"></div>
            <div>
              <div class="status-pill-val">${tamperedCount > 0 ? tamperedCount : '0'}</div>
              <div class="status-pill-lbl">Tampered Exhibits</div>
            </div>
          </div>

          <div class="evidence-status-pill status-duplicate" data-nav="duplicates">
            <div class="status-indicator-dot dot-yellow"></div>
            <div>
              <div class="status-pill-val">${duplicateCount}</div>
              <div class="status-pill-lbl">Duplicate Exhibits</div>
            </div>
          </div>

          <div class="evidence-status-pill status-unverified" data-nav="documents">
            <div class="status-indicator-dot dot-gray"></div>
            <div>
              <div class="status-pill-val">${unverifiedCount}</div>
              <div class="status-pill-lbl">Unverified Intake</div>
            </div>
          </div>
        </div>

        <!-- 3. AI INSIGHTS & AI ASSISTANT PROMPT PANEL -->
        <div class="dash-two-col-grid" style="margin-bottom: 24px;">
          <!-- Left: AI Insights Panel -->
          <div class="card ai-insights-card">
            <div class="card-header" style="border-bottom: 1px solid rgba(6,182,212,0.2);">
              <span class="card-title" style="color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
                AI Investigation Insights & Synthesis
              </span>
              <span class="badge badge-confidence">Grounded in 12 Exhibits</span>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: 14px;">
              <!-- AI Case Summary -->
              <div class="ai-summary-box">
                <span class="ai-box-title">AI-GENERATED CASE SUMMARY</span>
                <p style="font-size: 12.5px; line-height: 1.6; color: #CBD5E1;">
                  Investigation into <strong>${currentCase.name}</strong> indicates a coordinated money laundering pipeline spanning New Delhi, Gurugram, and Seychelles. 
                  Digital forensics and telecom tower triangulation corroborate direct meetings between primary suspect <strong>Ravi Kumar</strong> and courier <strong>Arun Singh</strong> at DLF Cyber City.
                </p>
              </div>

              <!-- Key Entities Tags -->
              <div>
                <span class="ai-subheading">CRITICAL PERSONS & LOCATIONS OF INTEREST</span>
                <div class="tags-row" style="margin-top: 6px;">
                  ${caseEntities.people.slice(0, 4).map(p => `<span class="tag-pill tag-person">👤 ${p.name} (${p.role.split('/')[0]})</span>`).join('')}
                  ${caseEntities.locations.slice(0, 3).map(l => `<span class="tag-pill tag-location">📍 ${l.name}</span>`).join('')}
                </div>
              </div>

              <!-- Potential Evidentiary Conflicts -->
              <div class="ai-conflict-alert">
                <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--status-warning); font-size: 11.5px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/></svg>
                  Potential Evidentiary Contradiction Flagged
                </div>
                <p style="font-size: 11.5px; color: #CBD5E1; margin-top: 4px;">
                  Suspect Ravi Kumar claims presence in Mumbai on 14-Aug-2026; contradicted by CDR tower sector latch at DLF Cyber City Gurugram (DOC-88915).
                </p>
              </div>
            </div>
          </div>

          <!-- Right: AI Case Assistant Quick Launcher -->
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="card-header">
                <span class="card-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Ask AI About This Case
                </span>
              </div>
              <div class="card-body">
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
                  Interrogate verified exhibits belonging to <strong>${currentCase.id}</strong>. Answers provide exact source citations and page excerpts.
                </p>

                <div class="dash-quick-questions-list">
                  <button class="dash-query-btn" data-query="What evidence connects Ravi to Location A?">
                    🔗 "What evidence connects Ravi to Location A?"
                  </button>
                  <button class="dash-query-btn" data-query="Summarize this case.">
                    📝 "Summarize the primary allegations and findings."
                  </button>
                  <button class="dash-query-btn" data-query="Who are the people mentioned in the documents?">
                    👥 "Who are the key people mentioned in the exhibits?"
                  </button>
                  <button class="dash-query-btn" data-query="Show all events between March 10 and March 15.">
                    ⏱️ "What happened during the target investigation window?"
                  </button>
                </div>
              </div>
            </div>

            <div style="padding: 16px; border-top: 1px solid var(--border-subtle); background: var(--bg-slate);">
              <div style="display: flex; gap: 8px;">
                <input 
                  type="text" 
                  id="dash-ai-quick-input" 
                  class="form-control" 
                  placeholder="Type any inquiry about case exhibits..." 
                  style="font-size: 12px;"
                />
                <button class="btn btn-primary btn-sm" id="btn-dash-submit-ai">
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. TIMELINE & RELATIONSHIP MAP PREVIEW -->
        <div class="dash-two-col-grid" style="margin-bottom: 24px;">
          <!-- Latest Investigation Timeline -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Latest Investigation Milestones
              </span>
              <button class="btn btn-outline btn-sm" id="dash-view-full-timeline">
                Full Timeline →
              </button>
            </div>
            <div class="card-body" style="padding: 0;">
              <div class="dash-timeline-list">
                ${caseEvents.slice(0, 4).map(evt => `
                  <div class="dash-timeline-item">
                    <span class="dash-timeline-date">${evt.date}</span>
                    <div class="dash-timeline-content">
                      <strong style="color: var(--text-white); font-size: 12px;">${evt.title}</strong>
                      <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${evt.description}</p>
                      <div style="font-size: 10px; color: var(--accent-cyan); font-family: var(--font-mono); margin-top: 4px;">
                        📄 ${evt.sourceDocName}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Evidence Relationship Map Preview -->
          <div class="card" style="display: flex; flex-direction: column;">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/></svg>
                Evidence Relationship Network
              </span>
              <button class="btn btn-primary btn-sm" id="dash-view-full-graph">
                Launch Interactive Graph →
              </button>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between; flex: 1;">
              <p style="font-size: 12px; color: var(--text-muted);">
                Multi-entity graph linking suspects, physical storage media, geo-coordinates, and court orders for <strong>${currentCase.id}</strong>.
              </p>

              <!-- Graphical Network Mini Visualizer Preview -->
              <div class="graph-mini-preview-box">
                <div class="graph-preview-circle center">Ravi Kumar</div>
                <div class="graph-preview-circle edge-1">DLF Cyber City</div>
                <div class="graph-preview-circle edge-2">SanDisk NVMe</div>
                <div class="graph-preview-circle edge-3">Seychelles Trust</div>
                <div class="graph-preview-circle edge-4">Signal Logs</div>
              </div>

              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dark); margin-top: 12px;">
                <span>👤 Persons: ${caseEntities.people.length}</span>
                <span>💾 Evidence: ${caseEvidence.length}</span>
                <span>📍 Locations: ${caseEntities.locations.length}</span>
                <span>📄 Documents: ${caseDocs.length}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. RECENT FORENSIC AUDIT TRAIL FEED -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
              Immutable Forensic Audit Stream (Recent Actions)
            </span>
            <button class="btn btn-outline btn-sm" id="dash-view-full-audit">
              Audit Logs →
            </button>
          </div>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Officer</th>
                  <th>Action</th>
                  <th>Target Exhibit / Case</th>
                  <th>Audit Verification Details</th>
                </tr>
              </thead>
              <tbody>
                ${recentActivity.map(log => `
                  <tr>
                    <td class="code-cell" style="font-size: 11px;">${log.timestamp}</td>
                    <td style="font-weight: 500;">${log.user}</td>
                    <td><span class="badge badge-action-${log.action.toLowerCase().replace(/_/g, '-')}">${log.action}</span></td>
                    <td style="font-family: var(--font-mono); font-size: 11px; color: var(--text-white);">${log.document}</td>
                    <td style="font-size: 11.5px; color: var(--text-muted);">${log.details}</td>
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
    // Case Selector
    document.getElementById('dash-case-selector')?.addEventListener('change', (e) => {
      this.activeCaseId = e.target.value;
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Evidence Status Pills Navigation
    document.querySelectorAll('.evidence-status-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const targetView = pill.getAttribute('data-nav');
        if (typeof onNavigate === 'function') onNavigate(targetView);
      });
    });

    // Launch Assistant
    document.getElementById('dash-launch-assistant')?.addEventListener('click', () => {
      if (typeof onNavigate === 'function') onNavigate('assistant', { caseId: this.activeCaseId });
    });

    // Quick Inquiry Buttons
    document.querySelectorAll('.dash-query-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-query');
        if (typeof onNavigate === 'function') {
          onNavigate('assistant', { prefillQuery: q, caseId: this.activeCaseId });
        }
      });
    });

    // Submit Custom AI Inquiry
    const quickInput = document.getElementById('dash-ai-quick-input');
    const submitBtn = document.getElementById('btn-dash-submit-ai');
    const handleQuickQuery = () => {
      const q = quickInput?.value?.trim();
      if (q && typeof onNavigate === 'function') {
        onNavigate('assistant', { prefillQuery: q, caseId: this.activeCaseId });
      }
    };
    submitBtn?.addEventListener('click', handleQuickQuery);
    quickInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleQuickQuery();
    });

    // View Full Timeline
    document.getElementById('dash-view-full-timeline')?.addEventListener('click', () => {
      if (typeof onNavigate === 'function') onNavigate('timeline', { caseId: this.activeCaseId });
    });

    // View Full Graph
    document.getElementById('dash-view-full-graph')?.addEventListener('click', () => {
      if (typeof onNavigate === 'function') onNavigate('graph', { caseId: this.activeCaseId });
    });

    // View Full Audit
    document.getElementById('dash-view-full-audit')?.addEventListener('click', () => {
      if (typeof onNavigate === 'function') onNavigate('audit');
    });
  }
};
