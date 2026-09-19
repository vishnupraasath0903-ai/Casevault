/**
 * CASEVAULT Top Navigation Bar Component
 * Upgraded with Multi-Entity Universal Search across:
 * - Documents
 * - People
 * - Evidence
 * - Locations
 * - Events
 * - Case IDs
 */

import { State } from '../state.js';
import { Modal } from './modal.js';
import { Toast } from './toast.js';

export const NavbarComponent = {
  render() {
    const unreadCount = State.notifications.filter(n => n.unread).length;

    return `
      <header class="topbar">
        <div class="topbar-left">
          <!-- Universal Multi-Entity Search Bar -->
          <div class="search-container" style="position: relative;">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              class="global-search-input" 
              id="global-search-input" 
              placeholder="Search across documents, people, evidence, locations, events, case IDs..." 
              autocomplete="off"
            />
            <span class="search-shortcut">/</span>

            <!-- Universal Search Results Popup Dropdown -->
            <div id="universal-search-results" class="search-results-dropdown" style="display: none;"></div>
          </div>
        </div>

        <div class="topbar-right">
          <!-- Live System Security Status -->
          <div class="system-status-indicator" title="Cryptographic Health: 99.98% • FIPS 140-2 Validated">
            <div class="status-pulse-dot"></div>
            <span>System Secure</span>
            <span style="color: var(--text-dark);">|</span>
            <span style="font-family: var(--font-mono); font-size: 10px;">FIPS 140-2</span>
          </div>

          <!-- Quick Interactive Role Switcher for Hackathon Demonstrators -->
          <div style="display: flex; align-items: center; gap: 6px; background: var(--bg-slate); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 4px 8px;">
            <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Role:</span>
            <select id="navbar-role-switcher" style="background: transparent; border: none; color: var(--accent-cyan); font-size: 11px; font-weight: 700; outline: none; cursor: pointer;">
              ${State.roles.map(r => `
                <option value="${r}" ${State.currentUser.role === r ? 'selected' : ''} style="background: var(--bg-dark-blue); color: #fff;">
                  ${r}
                </option>
              `).join('')}
            </select>
          </div>

          <!-- Notifications Bell -->
          <div style="position: relative;">
            <button class="topbar-btn" id="notifications-bell-btn" title="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              ${unreadCount > 0 ? `<div class="badge-dot"></div>` : ''}
            </button>

            <!-- Notifications Mini Dropdown -->
            <div id="notifications-dropdown" style="display: none; position: absolute; right: 0; top: 48px; width: 340px; background: var(--bg-dark-blue); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); z-index: 200; overflow: hidden;">
              <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-white);">System Notifications</span>
                <span class="badge badge-cyan" style="font-size: 10px;">${unreadCount} New</span>
              </div>
              <div style="max-height: 280px; overflow-y: auto;">
                ${State.notifications.map(n => `
                  <div class="notification-item-compact" style="padding: 10px 14px; border-bottom: 1px solid rgba(148,163,184,0.06); cursor: pointer;" data-notif-link="${n.link}">
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-white);">${n.title}</div>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${n.message}</div>
                    <div style="font-size: 9px; color: var(--accent-cyan); margin-top: 4px; font-family: var(--font-mono);">${n.time}</div>
                  </div>
                `).join('')}
              </div>
              <div style="padding: 8px 14px; background: rgba(7, 17, 31, 0.4); text-align: center;">
                <a href="#" id="view-all-notifications-link" style="font-size: 11px; color: var(--accent-cyan); text-decoration: none; font-weight: 600;">View All Notifications →</a>
              </div>
            </div>
          </div>

          <!-- User Avatar Chip -->
          <div class="user-avatar" style="width: 32px; height: 32px; font-size: 11px; cursor: pointer;" title="${State.currentUser.name} (${State.currentUser.role})">
            ${State.currentUser.avatar}
          </div>
        </div>
      </header>
    `;
  },

  bindEvents(onNavigate, onSearch) {
    const searchInput = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('universal-search-results');

    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (!query) {
          resultsContainer.style.display = 'none';
          resultsContainer.innerHTML = '';
          return;
        }

        const results = State.searchAllEntities(query);
        if (results && results.totalCount > 0) {
          resultsContainer.innerHTML = this.renderSearchResults(results);
          resultsContainer.style.display = 'block';
          this.bindSearchResultsEvents(resultsContainer, onNavigate);
        } else {
          resultsContainer.innerHTML = `
            <div style="padding: 20px; text-align: center; color: var(--text-dark); font-size: 12px;">
              No records found matching "<strong>${query}</strong>" across documents, people, evidence, or events.
            </div>
          `;
          resultsContainer.style.display = 'block';
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
          resultsContainer.style.display = 'none';
        }
      });
    }

    // Role Switcher
    const roleSwitcher = document.getElementById('navbar-role-switcher');
    if (roleSwitcher) {
      roleSwitcher.addEventListener('change', (e) => {
        State.switchUserRole(e.target.value);
        Toast.info('Role Clearance Updated', `Switched active persona to ${e.target.value}`);
        if (typeof onNavigate === 'function') onNavigate(null, true);
      });
    }

    // Notifications toggle
    const bellBtn = document.getElementById('notifications-bell-btn');
    const notifDropdown = document.getElementById('notifications-dropdown');
    if (bellBtn && notifDropdown) {
      bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = notifDropdown.style.display === 'block';
        notifDropdown.style.display = isOpen ? 'none' : 'block';
      });

      document.addEventListener('click', () => {
        notifDropdown.style.display = 'none';
      });

      document.querySelectorAll('.notification-item-compact').forEach(item => {
        item.addEventListener('click', () => {
          const link = item.getAttribute('data-notif-link') || 'notifications';
          if (typeof onNavigate === 'function') onNavigate(link);
        });
      });

      document.getElementById('view-all-notifications-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof onNavigate === 'function') onNavigate('notifications');
      });
    }
  },

  renderSearchResults(results) {
    return `
      <div style="padding: 8px 12px; background: var(--bg-slate); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-white);">Universal Search Results</span>
        <span class="badge badge-cyan" style="font-size: 10px;">${results.totalCount} matches</span>
      </div>

      <div style="max-height: 380px; overflow-y: auto; padding: 6px 0;">
        <!-- People Section -->
        ${results.people.length > 0 ? `
          <div class="search-category-header">👤 PEOPLE (${results.people.length})</div>
          ${results.people.map(p => `
            <div class="search-result-row search-item-person" data-person-name="${p.name}">
              <div>
                <strong style="color: var(--text-white); font-size: 12.5px;">${p.name}</strong>
                <span class="badge" style="font-size: 9.5px; background: rgba(59,130,246,0.15); color: #93C5FD; margin-left: 6px;">${p.role}</span>
                <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">${p.notes || ''}</div>
              </div>
              <span class="search-jump-btn">Open Profile →</span>
            </div>
          `).join('')}
        ` : ''}

        <!-- Documents Section -->
        ${results.documents.length > 0 ? `
          <div class="search-category-header">📄 DOCUMENTS (${results.documents.length})</div>
          ${results.documents.map(d => `
            <div class="search-result-row search-item-doc" data-doc-id="${d.id}">
              <div>
                <strong style="color: var(--text-white); font-size: 12.5px;">${d.name}</strong>
                <div style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono);">${d.id} • ${d.caseId} • ${d.fileSize}</div>
              </div>
              <span class="search-jump-btn">Inspect Dossier →</span>
            </div>
          `).join('')}
        ` : ''}

        <!-- Evidence Section -->
        ${results.evidence.length > 0 ? `
          <div class="search-category-header">💾 EVIDENCE (${results.evidence.length})</div>
          ${results.evidence.map(e => `
            <div class="search-result-row search-item-evidence" data-case-id="${e.caseId}">
              <div>
                <strong style="color: #FBBF24; font-size: 12px;">${e.name}</strong>
                <div style="font-size: 10.5px; color: var(--text-muted);">${e.evidenceId} • ${e.type}</div>
              </div>
              <span class="search-jump-btn">View Vault →</span>
            </div>
          `).join('')}
        ` : ''}

        <!-- Locations Section -->
        ${results.locations.length > 0 ? `
          <div class="search-category-header">📍 LOCATIONS (${results.locations.length})</div>
          ${results.locations.map(l => `
            <div class="search-result-row search-item-location" data-case-id="${l.caseId || 'CASE-2026-0142'}">
              <div>
                <strong style="color: #34D399; font-size: 12px;">${l.name}</strong>
                <div style="font-size: 10.5px; color: var(--text-muted);">${l.address || l.type}</div>
              </div>
              <span class="search-jump-btn">Map Entity →</span>
            </div>
          `).join('')}
        ` : ''}

        <!-- Events Section -->
        ${results.events.length > 0 ? `
          <div class="search-category-header">⚡ EVENTS (${results.events.length})</div>
          ${results.events.map(ev => `
            <div class="search-result-row search-item-event" data-case-id="${ev.caseId}">
              <div>
                <strong style="color: #C084FC; font-size: 12px;">${ev.date}: ${ev.title}</strong>
                <div style="font-size: 10.5px; color: var(--text-muted);">${ev.description.substring(0, 70)}...</div>
              </div>
              <span class="search-jump-btn">View Timeline →</span>
            </div>
          `).join('')}
        ` : ''}

        <!-- Case IDs Section -->
        ${results.cases.length > 0 ? `
          <div class="search-category-header">📁 CASES (${results.cases.length})</div>
          ${results.cases.map(c => `
            <div class="search-result-row search-item-case" data-case-id="${c.id}">
              <div>
                <strong style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 12px;">${c.id}</strong>
                <div style="font-size: 11px; color: var(--text-white);">${c.name}</div>
              </div>
              <span class="search-jump-btn">Open Case →</span>
            </div>
          `).join('')}
        ` : ''}
      </div>
    `;
  },

  bindSearchResultsEvents(container, onNavigate) {
    // Click Document
    container.querySelectorAll('.search-item-doc').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        const docId = row.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) Modal.openDocumentViewer(doc);
      });
    });

    // Click Person
    container.querySelectorAll('.search-item-person').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        if (typeof onNavigate === 'function') onNavigate('intelligence');
      });
    });

    // Click Evidence
    container.querySelectorAll('.search-item-evidence').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        if (typeof onNavigate === 'function') onNavigate('vault');
      });
    });

    // Click Location
    container.querySelectorAll('.search-item-location').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        if (typeof onNavigate === 'function') onNavigate('graph');
      });
    });

    // Click Event
    container.querySelectorAll('.search-item-event').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        if (typeof onNavigate === 'function') onNavigate('timeline');
      });
    });

    // Click Case
    container.querySelectorAll('.search-item-case').forEach(row => {
      row.addEventListener('click', () => {
        container.style.display = 'none';
        const caseId = row.getAttribute('data-case-id');
        if (typeof onNavigate === 'function') onNavigate('cases', { caseId });
      });
    });
  }
};
