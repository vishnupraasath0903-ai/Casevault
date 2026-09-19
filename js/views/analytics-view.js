/**
 * CASEVAULT Analytics Dashboard View
 * Features responsive SVG visualizations for document upload trends,
 * cases breakdown, classification distributions, and verification rates.
 */

import { State } from '../state.js';

export const AnalyticsView = {
  render() {
    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Forensic Analytics & Intelligence</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Evidence Intelligence & Velocity Metrics
            </h1>
            <p class="page-subtitle">Statistical metrics on document ingestion velocity, department casework, and cryptographic validation health</p>
          </div>
        </div>

        <!-- Charts Grid -->
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 24px;">
          <!-- Chart 1: Document Ingestion Trend (SVG Line & Area Chart) -->
          <div class="chart-card" style="height: 340px;">
            <div class="chart-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                Document Ingestion & Cryptographic Anchoring (Monthly)
              </span>
              <span class="badge badge-active" style="font-size: 10px;">+8.4% MoM</span>
            </div>

            <div class="svg-chart-container">
              <svg viewBox="0 0 500 200" style="width: 100%; height: 100%; overflow: visible;">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>

                <!-- Grid lines -->
                <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(148,163,184,0.1)" stroke-dasharray="4"/>
                <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(148,163,184,0.1)" stroke-dasharray="4"/>
                <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(148,163,184,0.1)" stroke-dasharray="4"/>
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(148,163,184,0.15)"/>

                <!-- Area fill -->
                <path d="M 50 150 L 120 130 L 190 140 L 260 90 L 330 100 L 400 50 L 470 40 L 470 170 L 50 170 Z" fill="url(#areaGradient)"/>

                <!-- Line graph -->
                <path d="M 50 150 L 120 130 L 190 140 L 260 90 L 330 100 L 400 50 L 470 40" fill="none" stroke="#06B6D4" stroke-width="3" stroke-linecap="round"/>

                <!-- Data points -->
                <circle cx="50" cy="150" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="120" cy="130" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="190" cy="140" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="260" cy="90" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="330" cy="100" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="400" cy="50" r="4" fill="#06B6D4" stroke="#0B172A" stroke-width="2"/>
                <circle cx="470" cy="40" r="5" fill="#38BDF8" stroke="#fff" stroke-width="2"/>

                <!-- Month labels -->
                <text x="50" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">Apr</text>
                <text x="120" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">May</text>
                <text x="190" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">Jun</text>
                <text x="260" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">Jul</text>
                <text x="330" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">Aug</text>
                <text x="400" y="190" fill="#94A3B8" font-size="10" text-anchor="middle">Sep</text>
                <text x="470" y="190" fill="#06B6D4" font-weight="700" font-size="10" text-anchor="middle">Oct (Est)</text>
              </svg>
            </div>
          </div>

          <!-- Chart 2: Cases Distribution Donut -->
          <div class="chart-card" style="height: 340px;">
            <div class="chart-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                Cases by Operational Status
              </span>
              <span class="card-subtitle">284 Cases Total</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: center; gap: 24px; height: 100%;">
              <svg width="160" height="160" viewBox="0 0 42 42">
                <!-- Donut Segments -->
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#162235" stroke-width="4.5"/>
                <!-- Active 65% -->
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#22C55E" stroke-width="4.5" stroke-dasharray="65 35" stroke-dashoffset="25"/>
                <!-- Under Review 25% -->
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" stroke-width="4.5" stroke-dasharray="25 75" stroke-dashoffset="60"/>
                <!-- Closed 10% -->
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#64748B" stroke-width="4.5" stroke-dasharray="10 90" stroke-dashoffset="35"/>
                
                <text x="21" y="20" font-size="4.5" fill="#F8FAFC" font-weight="800" text-anchor="middle">284</text>
                <text x="21" y="24" font-size="2.5" fill="#94A3B8" text-anchor="middle">CASES</text>
              </svg>

              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #22C55E;"></span>
                  <span>Active: <strong>185 (65%)</strong></span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #F59E0B;"></span>
                  <span>Under Review: <strong>71 (25%)</strong></span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #64748B;"></span>
                  <span>Closed: <strong>28 (10%)</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Security Classification Breakdown & Verification Parity Gauge -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Classification Horizontal Distribution Bars -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Documents by Security Classification
              </span>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #F87171; font-weight: 600;">Restricted Evidence (Strict Vault)</span>
                  <strong style="color: var(--text-white);">5,420 (43.5%)</strong>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg-slate); border-radius: var(--radius-pill); overflow: hidden;">
                  <div style="width: 43.5%; height: 100%; background: #EF4444;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #FBBF24; font-weight: 600;">Highly Confidential</span>
                  <strong style="color: var(--text-white);">3,810 (30.6%)</strong>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg-slate); border-radius: var(--radius-pill); overflow: hidden;">
                  <div style="width: 30.6%; height: 100%; background: #F59E0B;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #60A5FA; font-weight: 600;">Confidential (Judicial Counsel)</span>
                  <strong style="color: var(--text-white);">2,100 (16.9%)</strong>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg-slate); border-radius: var(--radius-pill); overflow: hidden;">
                  <div style="width: 16.9%; height: 100%; background: #3B82F6;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span style="color: #94A3B8; font-weight: 600;">Internal Departmental & Public</span>
                  <strong style="color: var(--text-white);">1,128 (9.0%)</strong>
                </div>
                <div style="width: 100%; height: 8px; background: var(--bg-slate); border-radius: var(--radius-pill); overflow: hidden;">
                  <div style="width: 9.0%; height: 100%; background: #64748B;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cryptographic Validation Parity Gauge -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Cryptographic Integrity Parity Rate
              </span>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 28px;">
              <div style="width: 100px; height: 100px; border-radius: 50%; border: 6px solid var(--status-success); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 25px rgba(34, 197, 94, 0.25); margin-bottom: 14px;">
                <span style="font-size: 22px; font-weight: 800; font-family: var(--font-mono); color: var(--text-white);">99.98%</span>
              </div>
              <h4 style="font-size: 15px; color: var(--status-success); font-weight: 700;">11,932 of 11,934 Artifacts Authentic</h4>
              <p style="font-size: 12px; color: var(--text-muted); max-width: 340px; margin-top: 4px; line-height: 1.5;">
                Zero silent bit rot or unnotified byte alterations recorded across 4 distributed encrypted cold nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {}
};
