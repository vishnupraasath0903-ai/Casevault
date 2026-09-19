/**
 * CASEVAULT Notification Center View
 */

import { State } from '../state.js';
import { Toast } from '../components/toast.js';

export const NotificationsView = {
  render() {
    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Notification Center</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Enclave Security & Dispatch Notifications
            </h1>
            <p class="page-subtitle">Real-time alerts regarding document sharing, cryptographic verification completions, and security alerts</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-secondary btn-sm" id="btn-mark-all-read">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Mark All as Read
            </button>
          </div>
        </div>

        <div class="card">
          <div class="card-body" style="padding: 0;">
            <div id="notifications-full-list" style="display: flex; flex-direction: column;">
              ${State.notifications.map(n => `
                <div class="notification-row" style="padding: 18px 24px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; background: ${n.unread ? 'rgba(37,99,235,0.06)' : 'transparent'};">
                  <div style="display: flex; gap: 16px;">
                    <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: ${n.type === 'SECURITY' ? 'rgba(239,68,68,0.15)' : 'rgba(6,182,212,0.12)'}; color: ${n.type === 'SECURITY' ? 'var(--status-danger)' : 'var(--accent-cyan)'}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${n.type === 'SECURITY' ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' : '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>'}
                      </svg>
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <strong style="color: var(--text-white); font-size: 13.5px;">${n.title}</strong>
                        ${n.unread ? `<span class="badge badge-active" style="font-size: 9px;">NEW</span>` : ''}
                      </div>
                      <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 3px; line-height: 1.5;">${n.message}</p>
                      <span style="font-size: 10.5px; color: var(--accent-cyan); font-family: var(--font-mono); margin-top: 4px; display: block;">${n.time}</span>
                    </div>
                  </div>

                  <button class="btn btn-outline btn-sm notif-jump-btn" data-link="${n.link}">
                    Inspect Record →
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents(onNavigate) {
    document.getElementById('btn-mark-all-read')?.addEventListener('click', () => {
      State.notifications.forEach(n => n.unread = false);
      Toast.success('Notifications Updated', 'All messages marked as read.');
      if (typeof onNavigate === 'function') onNavigate('notifications');
    });

    document.querySelectorAll('.notif-jump-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const link = btn.getAttribute('data-link');
        if (link && typeof onNavigate === 'function') onNavigate(link);
      });
    });
  }
};
