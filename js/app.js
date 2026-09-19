/**
 * CASEVAULT Application Controller
 * Single Page Application Orchestrator & Router
 * Enhanced for AI Investigation & Evidence Intelligence Platform
 */

import { State } from './state.js';
import { SidebarComponent } from './components/sidebar.js';
import { NavbarComponent } from './components/navbar.js';
import { Toast } from './components/toast.js';

// Views
import { AuthView } from './views/auth-view.js';
import { DashboardView } from './views/dashboard-view.js';
import { CasesView } from './views/cases-view.js';
import { DocumentsView } from './views/documents-view.js';
import { UploadView } from './views/upload-view.js';
import { VaultView } from './views/vault-view.js';
import { VerifierView } from './views/verifier-view.js';
import { AuditView } from './views/audit-view.js';
import { RbacView } from './views/rbac-view.js';
import { SecurityView } from './views/security-view.js';
import { AnalyticsView } from './views/analytics-view.js';
import { NotificationsView } from './views/notifications-view.js';
import { SettingsView } from './views/settings-view.js';

// New AI & Evidence Intelligence Views
import { AssistantView } from './views/assistant-view.js';
import { IntelligenceView } from './views/intelligence-view.js';
import { RelationshipMapView } from './views/relationship-map-view.js';
import { TimelineView } from './views/timeline-view.js';
import { DuplicatesView } from './views/duplicates-view.js';

class App {
  constructor() {
    this.currentView = 'dashboard';
    this.viewParams = {};
    this.init();
  }

  init() {
    // Check initial authentication
    if (!State.currentUser.isAuthenticated) {
      this.currentView = 'auth';
    }

    // Global custom navigation events (allows any component/modal to navigate)
    window.addEventListener('navigate-view', (e) => {
      const { view, ...params } = e.detail || {};
      if (view) this.navigateTo(view, params);
    });

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      // '/' to focus global search
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
      // 'Ctrl+B' to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        document.getElementById('app-sidebar')?.classList.toggle('collapsed');
      }
    });

    this.render();
  }

  navigateTo(viewName, params = {}) {
    if (viewName) this.currentView = viewName;
    this.viewParams = params || {};
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const root = document.getElementById('app');
    if (!root) return;

    // If on Auth/Landing view
    if (this.currentView === 'auth' || !State.currentUser.isAuthenticated) {
      root.innerHTML = `<div class="auth-wrapper">${AuthView.render()}</div>`;
      AuthView.bindEvents(() => {
        this.currentView = 'dashboard';
        this.render();
      });
      return;
    }

    // Otherwise render standard enterprise dashboard structure
    root.innerHTML = `
      <div class="app-container">
        <!-- Collapsible Sidebar -->
        ${SidebarComponent.render(this.currentView)}

        <!-- Main Wrapper (Navbar + Viewport) -->
        <div class="main-wrapper">
          ${NavbarComponent.render()}
          <main class="content-viewport" id="viewport-container">
            ${this.renderCurrentView()}
          </main>
        </div>
      </div>
    `;

    // Bind navigation & component events
    SidebarComponent.bindEvents((view) => this.navigateTo(view));
    NavbarComponent.bindEvents(
      (view, reRenderOnly) => {
        if (reRenderOnly) this.render();
        else if (view) this.navigateTo(view);
      },
      (searchQuery) => this.handleGlobalSearch(searchQuery)
    );

    // Bind current view events
    this.bindCurrentViewEvents();
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'dashboard':
        return DashboardView.render(this.viewParams);
      case 'cases':
        return CasesView.render(this.viewParams);
      case 'documents':
        return DocumentsView.render(this.viewParams);
      case 'upload':
        return UploadView.render(this.viewParams);
      case 'vault':
        return VaultView.render(this.viewParams);
      case 'verifier':
        return VerifierView.render(this.viewParams);
      case 'audit':
        return AuditView.render(this.viewParams);
      case 'rbac':
        return RbacView.render(this.viewParams);
      case 'security':
        return SecurityView.render(this.viewParams);
      case 'analytics':
        return AnalyticsView.render(this.viewParams);
      case 'notifications':
        return NotificationsView.render(this.viewParams);
      case 'settings':
        return SettingsView.render(this.viewParams);

      // New AI & Investigation Views
      case 'assistant':
        return AssistantView.render(this.viewParams);
      case 'intelligence':
        return IntelligenceView.render(this.viewParams);
      case 'graph':
        return RelationshipMapView.render(this.viewParams);
      case 'timeline':
        return TimelineView.render(this.viewParams);
      case 'duplicates':
        return DuplicatesView.render(this.viewParams);

      default:
        return DashboardView.render(this.viewParams);
    }
  }

  bindCurrentViewEvents() {
    const onNav = (view, reRender, params) => {
      if (reRender) this.render();
      else if (view) this.navigateTo(view, params);
    };

    switch (this.currentView) {
      case 'dashboard':
        DashboardView.bindEvents(onNav);
        break;
      case 'cases':
        CasesView.bindEvents(onNav);
        break;
      case 'documents':
        DocumentsView.bindEvents(onNav);
        break;
      case 'upload':
        UploadView.bindEvents(onNav);
        break;
      case 'vault':
        VaultView.bindEvents(onNav);
        break;
      case 'verifier':
        VerifierView.bindEvents(onNav);
        break;
      case 'audit':
        AuditView.bindEvents(onNav);
        break;
      case 'rbac':
        RbacView.bindEvents(onNav);
        break;
      case 'security':
        SecurityView.bindEvents(onNav);
        break;
      case 'analytics':
        AnalyticsView.bindEvents(onNav);
        break;
      case 'notifications':
        NotificationsView.bindEvents(onNav);
        break;
      case 'settings':
        SettingsView.bindEvents(onNav);
        break;

      // New AI & Investigation Views
      case 'assistant':
        AssistantView.bindEvents(onNav);
        // If navigated with prefillQuery, auto submit it!
        if (this.viewParams?.prefillQuery) {
          const q = this.viewParams.prefillQuery;
          this.viewParams.prefillQuery = null;
          setTimeout(() => AssistantView.submitQuery(q), 100);
        }
        break;
      case 'intelligence':
        IntelligenceView.bindEvents(onNav);
        break;
      case 'graph':
        RelationshipMapView.bindEvents(onNav);
        break;
      case 'timeline':
        TimelineView.bindEvents(onNav);
        break;
      case 'duplicates':
        DuplicatesView.bindEvents(onNav);
        break;
    }

    // Breadcrumb navigation clicks
    document.querySelectorAll('.breadcrumb-item').forEach(b => {
      b.addEventListener('click', () => {
        const v = b.getAttribute('data-view') || 'dashboard';
        this.navigateTo(v);
      });
    });
  }

  handleGlobalSearch(query) {
    // Universal multi-entity search handled directly in NavbarComponent
  }
}

// Instantiate application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.casevaultApp = new App();
});
