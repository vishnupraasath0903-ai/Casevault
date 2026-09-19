/**
 * CASEVAULT AI Case Assistant View
 * Dedicated AI Investigation Assistant with Case Document Indexing,
 * Grounded Evidence Retrieval, Source Citations, and Hallucination Guardrails.
 */

import { State } from '../state.js';
import { AIAssistantService } from '../services/ai-assistant-service.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export const AssistantView = {
  selectedCaseId: 'CASE-2026-0142',
  conversationHistory: [],
  isThinking: false,

  render(params = {}) {
    if (params?.caseId) {
      this.selectedCaseId = params.caseId;
    }

    const currentCase = State.cases.find(c => c.id === this.selectedCaseId) || State.cases[0];
    const caseDocs = State.documents.filter(d => d.caseId === currentCase.id);

    // Initial default greeting if history empty
    if (this.conversationHistory.length === 0) {
      this.conversationHistory = [
        {
          sender: 'assistant',
          text: `Welcome, **${State.currentUser.name}**. I am the **CaseVault AI Assistant** assigned to **${currentCase.id}** (*${currentCase.name}*).\n\n` +
            `I have indexed **${caseDocs.length} verified legal & forensic exhibits** belonging to this case. You can ask me to synthesize evidence, track persons of interest, detect testimonial contradictions, or analyze chronological milestones.\n\n` +
            `*All responses are strictly grounded in verified case documents with cryptographic hash anchors.*`,
          confidence: 'Index Active (100%)',
          sources: caseDocs.slice(0, 3).map(d => ({
            docId: d.id,
            docName: d.name,
            section: 'Repository Intake Ledger',
            relevance: 'Indexed Exhibit',
            snippet: d.contentSnippet?.substring(0, 140) + '...'
          })),
          timestamp: 'Ready'
        }
      ];
    }

    return `
      <div class="view-animate-in">
        <div class="breadcrumb-bar">
          <span class="breadcrumb-item" data-view="dashboard">Operations</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">AI Case Assistant</span>
        </div>

        <div class="page-header">
          <div class="page-title-group">
            <h1>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/>
                <path d="M12 8v4l3 3"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
              AI Case Intelligence Assistant
            </h1>
            <p class="page-subtitle">Evidence-grounded conversational interrogation engine with mandatory source citations</p>
          </div>

          <div class="page-actions">
            <!-- Case Selector -->
            <select class="form-select" id="assistant-case-select" style="min-width: 260px; font-weight: 600;">
              ${State.cases.map(c => `
                <option value="${c.id}" ${c.id === this.selectedCaseId ? 'selected' : ''}>
                  ${c.id} — ${c.name}
                </option>
              `).join('')}
            </select>

            <button class="btn btn-secondary btn-sm" id="btn-clear-chat" title="Clear Conversation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Reset Session
            </button>
          </div>
        </div>

        <!-- Assistant Main Workspace -->
        <div class="assistant-layout">
          <!-- Left: Chat Stream & Input -->
          <div class="assistant-chat-pane">
            <!-- Case Banner & Guardrail Notice -->
            <div class="assistant-case-banner">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span class="badge badge-cyan" style="font-family: var(--font-mono); font-size: 11px;">ACTIVE CASE: ${currentCase.id}</span>
                  <span style="font-size: 12px; color: var(--text-primary); font-weight: 600;">${currentCase.name}</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted);">
                  Indexed Exhibits: <strong style="color: var(--accent-cyan);">${caseDocs.length}</strong> | Clearance: <span style="color: var(--status-success);">${State.currentUser.clearance}</span>
                </div>
              </div>
              <div class="ai-guardrail-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Strict Evidence Guardrails: AI responses are strictly bounded by verified exhibits. No uncorroborated assumptions.
              </div>
            </div>

            <!-- Messages Stream -->
            <div class="assistant-messages-container" id="assistant-messages-stream">
              ${this.renderMessages()}
            </div>

            <!-- Suggested Quick Inquiries -->
            <div class="assistant-quick-prompts">
              <span style="font-size: 11px; color: var(--text-dark); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Recommended Inquiries:</span>
              <div class="quick-prompts-scroll">
                <button class="quick-prompt-btn" data-query="Summarize this case.">
                  📝 Summarize this case
                </button>
                <button class="quick-prompt-btn" data-query="What evidence connects Ravi to Location A?">
                  🔗 What evidence connects Ravi to Location A?
                </button>
                <button class="quick-prompt-btn" data-query="Who are the people mentioned in the documents?">
                  👥 Who are the people mentioned in the documents?
                </button>
                <button class="quick-prompt-btn" data-query="What are the major events in this case?">
                  ⏱️ What are the major events in this case?
                </button>
                <button class="quick-prompt-btn" data-query="Are there contradictions between these statements?">
                  ⚖️ Are there contradictions between statements?
                </button>
                <button class="quick-prompt-btn" data-query="Show all events between March 10 and March 15.">
                  📅 Show all events in investigative timeframe
                </button>
              </div>
            </div>

            <!-- Input Bar -->
            <div class="assistant-input-bar">
              <input 
                type="text" 
                id="assistant-query-input" 
                class="assistant-input" 
                placeholder="Ask about case documents, suspects, locations, contradictions, or evidence (e.g., 'What evidence connects Ravi to Location A?')..."
                autocomplete="off"
              />
              <button class="btn btn-primary" id="btn-send-assistant-query" style="padding: 0 18px; gap: 8px;">
                <span>Send</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Right: Case Exhibits & Index Inspector -->
          <div class="assistant-sidebar-pane">
            <div class="card" style="height: 100%; display: flex; flex-direction: column;">
              <div class="card-header">
                <span class="card-title" style="font-size: 13px;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                  Indexed Case Exhibits (${caseDocs.length})
                </span>
              </div>
              <div class="card-body" style="padding: 12px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 10px;">
                ${caseDocs.map(doc => `
                  <div class="exhibit-mini-card" data-doc-id="${doc.id}">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px;">
                      <span class="exhibit-title" title="${doc.name}">${doc.name}</span>
                      <span class="badge" style="font-size: 9px; background: rgba(6,182,212,0.15); color: var(--accent-cyan); white-space: nowrap;">${doc.docType.split('/')[0]}</span>
                    </div>
                    <div style="font-size: 10.5px; color: var(--text-dark); margin-top: 4px; font-family: var(--font-mono);">
                      SHA: ${doc.sha256.substring(0, 12)}...
                    </div>
                    <div style="margin-top: 6px; display: flex; align-items: center; justify-content: space-between;">
                      <span style="font-size: 10px; color: var(--status-success);">✓ Indexed</span>
                      <button class="btn btn-outline btn-sm exhibit-inspect-btn" data-doc-id="${doc.id}" style="padding: 2px 8px; font-size: 10px;">
                        Inspect
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderMessages() {
    return this.conversationHistory.map((msg, index) => {
      if (msg.sender === 'user') {
        return `
          <div class="assistant-bubble bubble-user">
            <div class="bubble-header">
              <span class="bubble-author">${State.currentUser.name} (Investigator)</span>
              <span class="bubble-time">${msg.timestamp || 'Just now'}</span>
            </div>
            <div class="bubble-body">${msg.text}</div>
          </div>
        `;
      } else {
        // Assistant Message with Citations & Disclaimer
        return `
          <div class="assistant-bubble bubble-assistant">
            <div class="bubble-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="assistant-avatar-badge">AI</span>
                <span class="bubble-author">CaseVault Intelligence Assistant</span>
              </div>
              <span class="badge badge-confidence">${msg.confidence || 'Verified Evidence Match'}</span>
            </div>

            <div class="bubble-body">
              ${this.formatMarkdown(msg.text)}
            </div>

            ${msg.sources && msg.sources.length > 0 ? `
              <div class="citations-container">
                <div class="citations-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  </svg>
                  <span>Supporting Evidence Sources (${msg.sources.length})</span>
                </div>
                <div class="citations-grid">
                  ${msg.sources.map(src => `
                    <div class="citation-card" data-doc-id="${src.docId}">
                      <div class="citation-title" title="${src.docName}">${src.docName}</div>
                      <div class="citation-section">${src.section || 'Record Excerpt'} • <span style="color: var(--accent-cyan);">${src.docId}</span></div>
                      ${src.snippet ? `<div class="citation-snippet">"${src.snippet}"</div>` : ''}
                      <button class="citation-link-btn" data-doc-id="${src.docId}">
                        Open Source Exhibit →
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Mandatory Verification Disclaimer -->
            <div class="ai-response-disclaimer">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>AI-generated response — verify against source documents. Strictly bounded by available exhibits.</span>
            </div>
          </div>
        `;
      }
    }).join('');
  },

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  },

  bindEvents(onNavigate) {
    // Case Selector change
    const caseSelect = document.getElementById('assistant-case-select');
    caseSelect?.addEventListener('change', (e) => {
      this.selectedCaseId = e.target.value;
      this.conversationHistory = []; // Reset for new case
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
    });

    // Clear Chat
    document.getElementById('btn-clear-chat')?.addEventListener('click', () => {
      this.conversationHistory = [];
      const viewport = document.getElementById('viewport-container');
      if (viewport) {
        viewport.innerHTML = this.render();
        this.bindEvents(onNavigate);
      }
      Toast.info('Session Reset', 'Conversation context refreshed for current case.');
    });

    // Quick Prompts
    document.querySelectorAll('.quick-prompt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        this.submitQuery(query);
      });
    });

    // Send Button & Enter key
    const sendBtn = document.getElementById('btn-send-assistant-query');
    const input = document.getElementById('assistant-query-input');

    const handleSend = () => {
      const q = input?.value?.trim();
      if (q) {
        input.value = '';
        this.submitQuery(q);
      }
    };

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Inspect Exhibit Buttons & Citation Links
    this.bindExhibitLinks();
  },

  bindExhibitLinks() {
    document.querySelectorAll('.citation-link-btn, .exhibit-inspect-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = State.documents.find(d => d.id === docId);
        if (doc) {
          Modal.openDocumentViewer(doc);
        } else {
          Toast.warning('Exhibit', `Document ${docId} not found in active session.`);
        }
      });
    });
  },

  async submitQuery(query) {
    if (!query || this.isThinking) return;

    // Push User message
    this.conversationHistory.push({
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Show Thinking indicator
    this.isThinking = true;
    const stream = document.getElementById('assistant-messages-stream');
    if (stream) {
      stream.innerHTML = this.renderMessages() + `
        <div class="assistant-bubble bubble-assistant" id="assistant-thinking-indicator">
          <div style="display: flex; align-items: center; gap: 10px; color: var(--accent-cyan);">
            <div class="spinner-small"></div>
            <span style="font-size: 12px; font-family: var(--font-mono);">Searching case exhibits & synthesizing evidence citations...</span>
          </div>
        </div>
      `;
      stream.scrollTop = stream.scrollHeight;
    }

    try {
      const result = await AIAssistantService.queryCaseAssistant(this.selectedCaseId, query);
      this.conversationHistory.push({
        sender: 'assistant',
        text: result.answer,
        confidence: result.confidence,
        sources: result.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      this.conversationHistory.push({
        sender: 'assistant',
        text: `**Investigation Query Error**: Unable to complete document search: ${err.message}`,
        confidence: 'Error',
        sources: [],
        timestamp: 'Just now'
      });
    } finally {
      this.isThinking = false;
      if (stream) {
        stream.innerHTML = this.renderMessages();
        stream.scrollTop = stream.scrollHeight;
        this.bindExhibitLinks();
      }
    }
  }
};
