/**
 * CASEVAULT Users & Role-Based Access Control (RBAC) View
 * Includes personnel directory with clearance levels and interactive Permission Matrix.
 */

import { State } from '../state.js';
import { Toast } from '../components/toast.js';

export const RbacView = {
  render() {
    const permissions = [
      { key: 'view', label: 'View Documents' },
      { key: 'upload', label: 'Upload Artifacts' },
      { key: 'modify', label: 'Modify Metadata' },
      { key: 'delete', label: 'Delete Records' },
      { key: 'download', label: 'Export Copies' },
      { key: 'share', label: 'Share Tokens' },
      { key: 'verify', label: 'Verify Signatures' },
      { key: 'manageUsers', label: 'Manage Roles' }
    ];

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Users & Access Governance</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Identity, Clearance & Role-Based Access (RBAC)
            </h1>
            <p class="page-subtitle">Configure departmental security clearances, judicial roles, and cryptographic execution privileges</p>
          </div>

          <div class="page-actions">
            <button class="btn btn-primary btn-sm" id="btn-add-user">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Enroll Authorized Officer
            </button>
          </div>
        </div>

        <!-- Section 1: Interactive Role Permission Matrix -->
        <div class="card" style="margin-bottom: 24px;">
          <div class="card-header">
            <div>
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Dynamic Permission Matrix
              </span>
              <span class="card-subtitle" style="margin-top: 2px; display: block;">
                Click any permission toggle to adjust role access privileges in real-time.
              </span>
            </div>
            <span class="badge badge-cyan" style="font-size: 10px;">STRICT ENFORCEMENT</span>
          </div>

          <div class="table-responsive">
            <table class="matrix-table data-table">
              <thead>
                <tr>
                  <th style="min-width: 160px;">Role / Clearance Profile</th>
                  ${permissions.map(p => `<th>${p.label}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${State.roles.map(role => `
                  <tr>
                    <td>
                      <strong style="color: var(--text-white);">${role}</strong>
                      <div style="font-size: 10.5px; color: var(--text-muted);">
                        ${role === 'Administrator' ? 'Full Enclave Control' : role === 'Investigator' ? 'Evidence Handling & Upload' : role === 'Forensic Analyst' ? 'Lab Hashing & Signatures' : role === 'Legal Officer' ? 'Court Exhibits & Review' : 'Restricted Oversight'}
                      </div>
                    </td>
                    ${permissions.map(p => {
                      const isAllowed = State.permissionMatrix[role]?.[p.key] ?? false;
                      return `
                        <td>
                          <button class="perm-toggle-btn btn btn-sm ${isAllowed ? 'btn-secondary' : 'btn-outline'}" 
                                  data-role="${role}" 
                                  data-perm="${p.key}" 
                                  style="min-width: 32px; height: 30px; padding: 4px;"
                                  title="${role} - ${p.label}: ${isAllowed ? 'Allowed' : 'Denied'}">
                            ${isAllowed ? `
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                            ` : `
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-dark)" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            `}
                          </button>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Active Authorized Personnel Directory -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Enrolled Authorized Personnel Directory (${State.users.length})
            </span>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Officer Name & Identity</th>
                  <th>Department</th>
                  <th>Clearance Level</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Session</th>
                  <th>Simulate Action</th>
                </tr>
              </thead>
              <tbody>
                ${State.users.map(u => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="user-avatar" style="width: 32px; height: 32px; font-size: 11px;">
                          ${u.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <strong style="color: var(--text-white); font-size: 13px;">${u.name}</strong>
                          <div style="font-size: 11px; color: var(--text-muted);">${u.email} • ${u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style="font-size: 12px;">${u.department}</td>
                    <td>
                      <span class="badge badge-cyan" style="font-size: 10px; font-family: var(--font-mono);">${u.clearance}</span>
                    </td>
                    <td>
                      <span class="badge ${u.role === 'Administrator' ? 'badge-danger' : u.role === 'Investigator' ? 'badge-active' : 'badge-cyan'}">
                        ${u.role}
                      </span>
                    </td>
                    <td>
                      <span class="badge badge-active" style="font-size: 10px;">${u.status}</span>
                    </td>
                    <td style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">${u.lastLogin}</td>
                    <td>
                      <button class="btn btn-secondary btn-sm switch-to-user-btn" data-user-role="${u.role}" title="Assume identity of this officer for testing">
                        Switch To Profile
                      </button>
                    </td>
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
    // Permission toggle buttons
    document.querySelectorAll('.perm-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-role');
        const perm = btn.getAttribute('data-perm');
        if (State.permissionMatrix[role]) {
          State.permissionMatrix[role][perm] = !State.permissionMatrix[role][perm];
          State.addAuditLog({
            action: 'PERMISSION_CHANGE',
            document: 'RBAC_SECURITY_POLICY',
            docId: 'SEC-RBAC',
            caseId: '-',
            details: `Permission '${perm}' for role '${role}' toggled to: ${State.permissionMatrix[role][perm]}`
          });
          Toast.success('Access Policy Updated', `${role} -> ${perm} changed.`);
          if (typeof onNavigate === 'function') onNavigate('rbac');
        }
      });
    });

    // Switch to user profile
    document.querySelectorAll('.switch-to-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.getAttribute('data-user-role');
        State.switchUserRole(role);
        Toast.success('Identity Assumed', `Active session switched to ${State.currentUser.name} (${role})`);
        if (typeof onNavigate === 'function') onNavigate('dashboard');
      });
    });

    document.getElementById('btn-add-user')?.addEventListener('click', () => {
      Toast.info('Personnel Enrollment', 'In production, new officers are enrolled via PKI Smart Card & Biometric Intake.');
    });
  }
};
