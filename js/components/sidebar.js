/**
 * CASEVAULT Collapsible Sidebar Component
 * Upgraded Navigation Structure featuring:
 * - AI Case Assistant
 * - Evidence Intelligence
 * - Relationship Map
 * - Investigation Timeline
 * - Duplicate Evidence Detector
 * - Preserved Core Operations & Cryptographic Trust Views
 */

import { State } from '../state.js';

export const SidebarComponent = {
  render(activeView = 'dashboard') {
    const unreadCount = State.notifications.filter(n => n.unread).length;
    const isCollapsed = document.querySelector('.sidebar')?.classList.contains('collapsed') || false;

    return `
      <aside class="sidebar ${isCollapsed ? 'collapsed' : ''}" id="app-sidebar">
        <!-- Sidebar Brand Header -->
        <div class="sidebar-header">
          <a href="#" class="brand" data-view="dashboard">
            <img src="assets/logo.svg" alt="CASEVAULT Logo" class="brand-logo" />
            <div class="brand-info">
              <span class="brand-title">
                CASEVAULT
                <span class="brand-tag">AI 2.0</span>
              </span>
              <span class="brand-tagline">EVIDENCE INTELLIGENCE</span>
            </div>
          </a>
          <button class="sidebar-toggle-btn" id="sidebar-toggle" title="Toggle Sidebar (Ctrl+B)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
            </svg>
          </button>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
          <div class="nav-section-title">Core Operations</div>

          <a class="nav-item ${activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span class="nav-label">Dashboard</span>
          </a>

          <a class="nav-item ${activeView === 'cases' ? 'active' : ''}" data-view="cases">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <span class="nav-label">Cases</span>
            <span class="nav-badge">${State.cases.length}</span>
          </a>

          <a class="nav-item ${activeView === 'documents' ? 'active' : ''}" data-view="documents">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span class="nav-label">Documents</span>
            <span class="nav-badge">${State.documents.length}</span>
          </a>

          <a class="nav-item ${activeView === 'vault' ? 'active' : ''}" data-view="vault">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span class="nav-label">Evidence Vault</span>
            <span class="nav-badge" style="background: rgba(245, 158, 11, 0.2); color: var(--status-warning);">HOT</span>
          </a>

          <a class="nav-item ${activeView === 'upload' ? 'active' : ''}" data-view="upload">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span class="nav-label">Upload Exhibit</span>
          </a>

          <!-- NEW: AI & Investigation Intelligence Section -->
          <div class="nav-section-title" style="color: var(--accent-cyan); display: flex; align-items: center; justify-content: space-between;">
            <span>AI & Intelligence</span>
            <span style="font-size: 9px; background: rgba(6,182,212,0.2); color: var(--accent-cyan); padding: 1px 5px; border-radius: 4px;">NEW</span>
          </div>

          <a class="nav-item ${activeView === 'assistant' ? 'active' : ''}" data-view="assistant" style="${activeView === 'assistant' ? 'border-left-color: var(--accent-cyan);' : ''}">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
              <circle cx="12" cy="12" r="9"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            <span class="nav-label">AI Case Assistant</span>
            <span class="nav-badge" style="background: rgba(6, 182, 212, 0.2); color: var(--accent-cyan);">RAG</span>
          </a>

          <a class="nav-item ${activeView === 'intelligence' ? 'active' : ''}" data-view="intelligence">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <span class="nav-label">Evidence Intelligence</span>
          </a>

          <a class="nav-item ${activeView === 'graph' ? 'active' : ''}" data-view="graph">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            <span class="nav-label">Relationship Map</span>
          </a>

          <a class="nav-item ${activeView === 'timeline' ? 'active' : ''}" data-view="timeline">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span class="nav-label">Investigation Timeline</span>
          </a>

          <a class="nav-item ${activeView === 'duplicates' ? 'active' : ''}" data-view="duplicates">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span class="nav-label">Duplicate Detector</span>
            <span class="nav-badge" style="background: rgba(239, 68, 68, 0.2); color: var(--status-danger);">2</span>
          </a>

          <div class="nav-section-title">Verification & Trust</div>

          <a class="nav-item ${activeView === 'verifier' ? 'active' : ''}" data-view="verifier">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span class="nav-label">Tamper Detection</span>
          </a>

          <a class="nav-item ${activeView === 'audit' ? 'active' : ''}" data-view="audit">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              <circle cx="12" cy="14" r="3"/><line x1="12" y1="17" x2="12" y2="19"/>
            </svg>
            <span class="nav-label">Audit Trail</span>
          </a>

          <div class="nav-section-title">Administration</div>

          <a class="nav-item ${activeView === 'rbac' ? 'active' : ''}" data-view="rbac">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span class="nav-label">Users & Roles</span>
          </a>

          <a class="nav-item ${activeView === 'security' ? 'active' : ''}" data-view="security">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
            <span class="nav-label">Security Center</span>
          </a>

          <a class="nav-item ${activeView === 'analytics' ? 'active' : ''}" data-view="analytics">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            <span class="nav-label">Analytics</span>
          </a>

          <a class="nav-item ${activeView === 'settings' ? 'active' : ''}" data-view="settings">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span class="nav-label">Settings</span>
          </a>
        </nav>

        <!-- Sidebar Profile Card & Logout -->
        <div class="sidebar-footer">
          <div class="user-profile-badge" id="sidebar-profile-card">
            <div class="user-avatar">${State.currentUser.avatar}</div>
            <div class="user-details">
              <span class="user-name">${State.currentUser.name}</span>
              <span class="user-role-tag">
                <span class="role-dot"></span>
                ${State.currentUser.role}
              </span>
            </div>
            <button class="topbar-btn" style="width: 28px; height: 28px;" id="sidebar-logout-btn" title="Sign Out">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>
    `;
  },

  bindEvents(onNavigate) {
    document.querySelectorAll('.sidebar-nav .nav-item, .brand').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view') || 'dashboard';
        if (typeof onNavigate === 'function') onNavigate(targetView);
      });
    });

    // Toggle Collapse button
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('app-sidebar');
        sidebar.classList.toggle('collapsed');
      });
    }

    // Sign out button
    const logoutBtn = document.getElementById('sidebar-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        State.currentUser.isAuthenticated = false;
        State.addAuditLog({
          action: 'LOGOUT',
          document: 'N/A',
          docId: '-',
          caseId: '-',
          details: 'User session closed cleanly.'
        });
        if (typeof onNavigate === 'function') onNavigate('auth');
      });
    }
  }
};
