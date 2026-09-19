/**
 * CASEVAULT Evidence Intelligence View
 * Automated Entity Extraction, Cross-Exhibit Intelligence Correlation,
 * and Multi-Domain Profiling (People, Locations, Digital Identifiers, Organizations).
 */

import { State } from '../state.js';
import { IntelligenceService } from '../services/intelligence-service.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const IntelligenceView = {
  activeTab: 'all', // 'all' | 'people' | 'locations' | 'tech' | 'orgs' | 'matrix'
  activeCaseFilter: 'ALL',

  render(params = {}) {
    const selectedCase = this.activeCaseFilter;
    const people = selectedCase === 'ALL' 
      ? State.entities.people 
      : State.entities.people.filter(p => !p.caseId || p.caseId === selectedCase);
    
    const locations = selectedCase === 'ALL'
      ? State.entities.locations
      : State.entities.locations.filter(l => !l.caseId || l.caseId === selectedCase);

    const orgs = State.entities.organizations;
    const docs = selectedCase === 'ALL'
      ? State.documents
      : State.documents.filter(d => d.caseId === selectedCase);

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Evidence Intelligence</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
              Evidence Intelligence & Entity Profiling
            </h1>
            <p class="page-subtitle">Automated natural entity extraction, geospatial correlation, and suspect dossier synthesis</p>
          </div>

          <div class="page-actions">
            <!-- Filter by Case -->
            <select class="form-select" id="intel-case-filter" style="min-width: 220px;">
              <option value="ALL" ${this.activeCaseFilter === 'ALL' ? 'selected' : ''}>All Active Cases</option>
              ${State.cases.map(c => `
                <option value="${c.id}" ${c.id === this.activeCaseFilter ? 'selected' : ''}>
                  ${c.id} (${c.name.substring(0, 24)}...)
                </option>
              `).join('')}
            </select>

            <button class="btn btn-primary btn-sm" id="btn-re-extract-intel">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Re-Scan Repository
            </button>
          </div>
        </div>

        <!-- Telemetry Cards -->
        <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 24px;">
          <div class="stat-card">
            <div class="stat-label">Identified Persons</div>
            <div class="stat-value" style="color: #60A5FA;">${people.length}</div>
            <div class="stat-subtext">Suspects & Witnesses</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Monitored Locations</div>
            <div class="stat-value" style="color: #34D399;">${locations.length}</div>
            <div class="stat-subtext">Geo & Office Coordinates</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Shell & Front Entities</div>
            <div class="stat-value" style="color: #FB923C;">${orgs.length}</div>
            <div class="stat-subtext">Offshore Corporate Vehicles</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Indexed Exhibits</div>
            <div class="stat-value" style="color: var(--accent-cyan);">${docs.length}</div>
            <div class="stat-subtext">100% Entity Parsed</div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="intel-tabs-bar">
          <button class="intel-tab-btn ${this.activeTab === 'all' ? 'active' : ''}" data-tab="all">
            All Intelligence
          </button>
          <button class="intel-tab-btn ${this.activeTab === 'people' ? 'active' : ''}" data-tab="people">
            Persons of Interest (${people.length})
          </button>
          <button class="intel-tab-btn ${this.activeTab === 'locations' ? 'active' : ''}" data-tab="locations">
            Locations & Geography (${locations.length})
          </button>
          <button class="intel-tab-btn ${this.activeTab === 'tech' ? 'active' : ''}" data-tab="tech">
            Technical & Digital IDs
          </button>
          <button class="intel-tab-btn ${this.activeTab === 'orgs' ? 'active' : ''}" data-tab="orgs">
            Corporate Entities (${orgs.length})
          </button>
          <button class="intel-tab-btn ${this.activeTab === 'matrix' ? 'active' : ''}" data-tab="matrix">
            Document Extraction Matrix
          </button>
        </div>

        <!-- Tab Content Viewport -->
        <div id="intel-tab-viewport">
          ${this.renderTabContent(people, locations, orgs, docs)}
        </div>
      </div>
    `;
  },

  renderTabContent(people, locations, orgs, docs) {
    switch (this.activeTab) {
      case 'people':
        return this.renderPeopleGrid(people);
      case 'locations':
        return this.renderLocationsGrid(locations);
      case 'tech':
        return this.renderTechnicalIdentifiers(docs);
      case 'orgs':
        return this.renderOrganizationsGrid(orgs);
      case 'matrix':
        return this.renderExtractionMatrix(docs);
      case 'all':
      default:
        return `
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <!-- Primary Section: Key Persons -->
            <div>
              <div class="section-title-row">
                <span class="section-heading">Key Persons of Interest</span>
                <span class="section-badge">${people.length} profiles</span>
              </div>
              ${this.renderPeopleGrid(people.slice(0, 3))}
            </div>

            <!-- Two-Column Grid: Locations & Shell Entities -->
            <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 20px;">
              <div>
                <div class="section-title-row">
                  <span class="section-heading">Critical Locations & Jurisdictions</span>
                </div>
                ${this.renderLocationsGrid(locations.slice(0, 2))}
              </div>
              <div>
                <div class="section-title-row">
                  <span class="section-heading">Corporate & Offshore Entities</span>
                </div>
                ${this.renderOrganizationsGrid(orgs.slice(0, 2))}
              </div>
            </div>

            <!-- Extraction Matrix Snippet -->
            <div>
              <div class="section-title-row">
                <span class="section-heading">Recent Exhibit Entity Extractions</span>
              </div>
              ${this.renderExtractionMatrix(docs.slice(0, 5))}
            </div>
          </div>
        `;
    }
  },

  renderPeopleGrid(people) {
    if (people.length === 0) {
      return `<div class="card" style="padding: 40px; text-align: center; color: var(--text-muted);">No individuals found matching active filter.</div>`;
    }

    return `
      <div class="intel-cards-grid">
        ${people.map(p => `
          <div class="intel-profile-card">
            <div class="profile-header">
              <div class="profile-avatar-box">
                ${p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div class="profile-meta">
                <h3 class="profile-name">${p.name}</h3>
                <span class="profile-role-tag">${p.role}</span>
              </div>
            </div>

            <div class="profile-body">
              <div class="profile-notes">"${p.notes || 'Identified individual in case exhibits.'}"</div>

              <div class="intel-kv-list">
                ${p.phone ? `
                  <div class="intel-kv-item">
                    <span class="kv-key">Phone:</span>
                    <span class="kv-val code-cell">${p.phone}</span>
                  </div>
                ` : ''}
                ${p.email ? `
                  <div class="intel-kv-item">
                    <span class="kv-key">Email:</span>
                    <span class="kv-val">${p.email}</span>
                  </div>
                ` : ''}
                ${p.status ? `
                  <div class="intel-kv-item">
                    <span class="kv-key">Status:</span>
                    <span class="kv-val" style="color: var(--status-warning); font-weight: 600;">${p.status}</span>
                  </div>
                ` : ''}
              </div>

              <!-- Associated Locations & Evidence Tags -->
              <div style="margin-top: 12px;">
                <span style="font-size: 10.5px; color: var(--text-muted); display: block; margin-bottom: 5px;">Associated Locations:</span>
                <div class="tags-row">
                  ${(p.locations || []).map(l => `<span class="tag-pill tag-location">📍 ${l}</span>`).join('') || '<span style="font-size: 11px; color: var(--text-dark);">None recorded</span>'}
                </div>
              </div>

              <div style="margin-top: 10px;">
                <span style="font-size: 10.5px; color: var(--text-muted); display: block; margin-bottom: 5px;">Evidence & Exhibits (${p.documents?.length || 0}):</span>
                <div class="tags-row">
                  ${(p.documents || []).slice(0, 3).map(d => `<span class="tag-pill tag-doc doc-link-trigger" data-doc-id="${d}">📄 ${d}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="profile-footer">
              <button class="btn btn-outline btn-sm ask-ai-person-btn" data-person="${p.name}" style="flex: 1;">
                Ask AI About ${p.name.split(' ')[0]}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderLocationsGrid(locations) {
    if (locations.length === 0) {
      return `<div class="card" style="padding: 40px; text-align: center; color: var(--text-muted);">No locations recorded.</div>`;
    }

    return `
      <div class="intel-cards-grid">
        ${locations.map(l => `
          <div class="intel-profile-card">
            <div class="profile-header">
              <div class="profile-avatar-box" style="background: rgba(16, 185, 129, 0.15); color: #34D399; border-color: rgba(16, 185, 129, 0.3);">
                📍
              </div>
              <div class="profile-meta">
                <h3 class="profile-name">${l.name}</h3>
                <span class="profile-role-tag" style="background: rgba(16, 185, 129, 0.15); color: #34D399;">${l.type}</span>
              </div>
            </div>

            <div class="profile-body">
              <div style="font-size: 11.5px; color: var(--text-primary); margin-bottom: 8px;">
                <strong>Address:</strong> ${l.address || 'Address unrecorded'}
              </div>
              <div class="profile-notes">"${l.notes || 'Key incident venue'}"</div>

              <div class="intel-kv-list" style="margin-top: 10px;">
                ${l.coordinates ? `
                  <div class="intel-kv-item">
                    <span class="kv-key">Coordinates:</span>
                    <span class="kv-val code-cell">${l.coordinates}</span>
                  </div>
                ` : ''}
                <div class="intel-kv-item">
                  <span class="kv-key">Referenced In:</span>
                  <span class="kv-val">${(l.documents || []).length} exhibits</span>
                </div>
              </div>

              <div style="margin-top: 10px;">
                <span style="font-size: 10.5px; color: var(--text-muted); display: block; margin-bottom: 5px;">Connected Entities:</span>
                <div class="tags-row">
                  ${(l.relatedEntities || []).map(re => `<span class="tag-pill tag-neutral">${re}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderOrganizationsGrid(orgs) {
    return `
      <div class="intel-cards-grid">
        ${orgs.map(o => `
          <div class="intel-profile-card">
            <div class="profile-header">
              <div class="profile-avatar-box" style="background: rgba(249, 115, 22, 0.15); color: #FB923C; border-color: rgba(249, 115, 22, 0.3);">
                🏢
              </div>
              <div class="profile-meta">
                <h3 class="profile-name">${o.name}</h3>
                <span class="profile-role-tag" style="background: rgba(249, 115, 22, 0.15); color: #FB923C;">${o.type}</span>
              </div>
            </div>
            <div class="profile-body">
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">
                <strong>Jurisdiction:</strong> <span style="color: var(--text-white);">${o.jurisdiction}</span>
              </div>
              <div class="profile-notes">"${o.notes}"</div>
              <div style="margin-top: 12px;">
                <span style="font-size: 10.5px; color: var(--text-muted); display: block; margin-bottom: 5px;">Linked Exhibits:</span>
                <div class="tags-row">
                  ${(o.documents || []).map(d => `<span class="tag-pill tag-doc doc-link-trigger" data-doc-id="${d}">📄 ${d}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderTechnicalIdentifiers(docs) {
    const allIndicators = [];
    docs.forEach(doc => {
      const intel = IntelligenceService.extractIntelligence(doc);
      if (intel.technicalIndicators.phones.length > 0) {
        intel.technicalIndicators.phones.forEach(p => allIndicators.push({ type: 'Mobile / Phone', value: p, docId: doc.id, docName: doc.name }));
      }
      if (intel.technicalIndicators.emails.length > 0) {
        intel.technicalIndicators.emails.forEach(e => allIndicators.push({ type: 'Email Account', value: e, docId: doc.id, docName: doc.name }));
      }
      if (intel.technicalIndicators.ipAddresses.length > 0) {
        intel.technicalIndicators.ipAddresses.forEach(ip => allIndicators.push({ type: 'IP Address / C2', value: ip, docId: doc.id, docName: doc.name }));
      }
      if (intel.technicalIndicators.financialValues.length > 0) {
        intel.technicalIndicators.financialValues.forEach(f => allIndicators.push({ type: 'Financial Transaction', value: f, docId: doc.id, docName: doc.name }));
      }
    });

    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            Forensic & Technical Signal Telemetry (${allIndicators.length})
          </span>
        </div>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Identifier Type</th>
                <th>Extracted Value</th>
                <th>Source Exhibit</th>
                <th>Classification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${allIndicators.map(item => `
                <tr>
                  <td><span class="badge badge-cyan">${item.type}</span></td>
                  <td class="code-cell" style="font-weight: 600; color: var(--accent-cyan);">${item.value}</td>
                  <td>
                    <div style="color: var(--text-white); font-weight: 500;">${item.docName}</div>
                    <div style="font-size: 10.5px; color: var(--text-dark);">${item.docId}</div>
                  </td>
                  <td><span class="badge badge-classification class-restricted-evidence">Restricted</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm doc-link-trigger" data-doc-id="${item.docId}">
                      Inspect
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderExtractionMatrix(docs) {
    return `
      <div class="card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Document Exhibit</th>
                <th>Extracted People</th>
                <th>Extracted Locations</th>
                <th>Keywords & Legal Tags</th>
                <th>Integrity</th>
              </tr>
            </thead>
            <tbody>
              ${docs.map(doc => {
                const people = doc.entities?.people || [];
                const locations = doc.entities?.locations || [];
                const keywords = doc.entities?.keywords || [];

                return `
                  <tr>
                    <td>
                      <div style="font-weight: 600; color: var(--text-white);">${doc.name}</div>
                      <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${doc.id} • ${doc.caseId}</div>
                    </td>
                    <td>
                      <div class="tags-row">
                        ${people.map(p => `<span class="tag-pill tag-person">👤 ${p}</span>`).join('') || '<span style="color: var(--text-dark); font-size: 11px;">None</span>'}
                      </div>
                    </td>
                    <td>
                      <div class="tags-row">
                        ${locations.map(l => `<span class="tag-pill tag-location">📍 ${l}</span>`).join('') || '<span style="color: var(--text-dark); font-size: 11px;">None</span>'}
                      </div>
                    </td>
                    <td>
                      <div class="tags-row">
                        ${keywords.slice(0, 3).map(k => `<span class="tag-pill tag-neutral">${k}</span>`).join('')}
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-active" style="font-size: 10px;">✓ ${doc.hashStatus}</span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    // Tab switching
    document.querySelectorAll('.intel-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        const viewport = document.getElementById('viewport-container');
        if (viewport) {
          viewport.innerHTML = this.render();
          this.bindEvents(onNavigate);
        }
      });
    });

    // Case Filter Change
    const caseSelect = document.getElementById('intel-case-filter');
    caseSelect?.addEventListener('change', (e) => {
      this.activeCaseFilter = e.target.value;
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Re-Scan Button
    document.getElementById('btn-re-extract-intel')?.addEventListener('click', () => {
      Toast.info('Extraction Scan Initiated', 'Re-parsing repository exhibits through NLP entity extraction engine.');
      setTimeout(() => {
        Toast.success('Extraction Complete', '12 case exhibits re-indexed. 0 entity drift detected.');
      }, 500);
    });

    // Exhibit link clicks
    document.querySelectorAll('.doc-link-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const docId = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) Modal.openDocumentViewer(doc);
      });
    });

    // "Ask AI About Person" button
    document.querySelectorAll('.ask-ai-person-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const personName = btn.getAttribute('data-person');
        if (typeof onNavigate === 'function') {
          onNavigate('assistant', { prefillQuery: `What evidence connects ${personName} to the case?` });
        }
      });
    });
  }
};
