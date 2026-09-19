/**
 * CASEVAULT Interactive Evidence Relationship Graph Service
 * Pure Vanilla JS, High-Performance Canvas & SVG Force-Directed Graph Engine.
 * Zero external libraries required.
 * 
 * Supports:
 * - Entity Categories: PERSON, EVIDENCE, LOCATION, EVENT, DOCUMENT, ORGANIZATION
 * - Interactive Pan, Smooth Zoom, and Node Dragging
 * - Entity Category Filtering & Instant Search
 * - Node Selection & Path Highlighting
 */

export class RelationshipGraphRenderer {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.onNodeClick = options.onNodeClick || null;
    this.width = this.container.clientWidth || 800;
    this.height = this.container.clientHeight || 550;

    // Entity Colors & Styling
    this.categoryStyles = {
      PERSON: { color: '#3B82F6', border: '#60A5FA', label: 'Person', icon: '👤' },
      EVIDENCE: { color: '#F59E0B', border: '#FBBF24', label: 'Evidence', icon: '💾' },
      LOCATION: { color: '#10B981', border: '#34D399', label: 'Location', icon: '📍' },
      EVENT: { color: '#8B5CF6', border: '#A78BFA', label: 'Event', icon: '⚡' },
      DOCUMENT: { color: '#06B6D4', border: '#22D3EE', label: 'Document', icon: '📄' },
      ORGANIZATION: { color: '#F97316', border: '#FB923C', label: 'Organization', icon: '🏢' }
    };

    // Camera & Transform
    this.transform = { x: this.width / 2, y: this.height / 2, scale: 0.95 };
    this.isDraggingCanvas = false;
    this.draggedNode = null;
    this.dragStart = { x: 0, y: 0 };
    this.hoveredNode = null;
    this.selectedNode = null;

    // Filters
    this.activeCategories = new Set(['PERSON', 'EVIDENCE', 'LOCATION', 'EVENT', 'DOCUMENT', 'ORGANIZATION']);
    this.searchQuery = '';

    // Data structures
    this.nodes = [];
    this.links = [];
    this.animId = null;

    this.initCanvas();
    this.initEvents();
  }

  initCanvas() {
    this.container.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.cursor = 'grab';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || 800;
    this.height = rect.height || 550;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setData(graphData) {
    // Clone nodes and links
    this.nodes = (graphData.nodes || []).map((node, i) => {
      const angle = (i / graphData.nodes.length) * 2 * Math.PI;
      const radius = 180 + (i % 3) * 60;
      return {
        ...node,
        x: node.x !== undefined ? node.x : Math.cos(angle) * radius,
        y: node.y !== undefined ? node.y : Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: node.category === 'PERSON' || node.category === 'DOCUMENT' ? 26 : 22
      };
    });

    this.links = (graphData.links || []).map(link => ({
      ...link,
      sourceNode: this.nodes.find(n => n.id === link.source) || link.source,
      targetNode: this.nodes.find(n => n.id === link.target) || link.target
    })).filter(l => l.sourceNode && l.targetNode);

    this.startSimulation();
  }

  startSimulation() {
    let iterations = 0;
    const maxIterations = 240;

    const step = () => {
      this.updatePhysics();
      this.render();
      iterations++;
      if (iterations < maxIterations || this.draggedNode) {
        this.animId = requestAnimationFrame(step);
      }
    };

    cancelAnimationFrame(this.animId);
    this.animId = requestAnimationFrame(step);
  }

  updatePhysics() {
    const k = 140; // Spring rest length
    const repulsion = 3200;

    // 1. Repulsion between all nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 380) {
          const force = repulsion / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          if (n1 !== this.draggedNode) { n1.vx -= fx; n1.vy -= fy; }
          if (n2 !== this.draggedNode) { n2.vx += fx; n2.vy += fy; }
        }
      }
    }

    // 2. Attraction along links
    this.links.forEach(l => {
      const n1 = l.sourceNode;
      const n2 = l.targetNode;
      if (!n1 || !n2) return;
      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - k) * 0.04;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      if (n1 !== this.draggedNode) { n1.vx += fx; n1.vy += fy; }
      if (n2 !== this.draggedNode) { n2.vx -= fx; n2.vy -= fy; }
    });

    // 3. Center gravity & velocity dampening
    this.nodes.forEach(n => {
      if (n === this.draggedNode) return;
      // Pull toward origin
      n.vx += (-n.x) * 0.003;
      n.vy += (-n.y) * 0.003;

      // Dampening
      n.vx *= 0.85;
      n.vy *= 0.85;

      n.x += n.vx;
      n.y += n.vy;
    });
  }

  setCategoryFilter(category, isVisible) {
    if (isVisible) {
      this.activeCategories.add(category);
    } else {
      this.activeCategories.delete(category);
    }
    this.render();
  }

  setSearchQuery(q) {
    this.searchQuery = (q || '').trim().toLowerCase();
    this.render();
  }

  zoom(factor) {
    const newScale = Math.max(0.3, Math.min(2.5, this.transform.scale * factor));
    this.transform.scale = newScale;
    this.render();
  }

  resetView() {
    this.transform = { x: this.width / 2, y: this.height / 2, scale: 0.95 };
    this.selectedNode = null;
    this.render();
  }

  worldToScreen(x, y) {
    return {
      x: x * this.transform.scale + this.transform.x,
      y: y * this.transform.scale + this.transform.y
    };
  }

  screenToWorld(sx, sy) {
    return {
      x: (sx - this.transform.x) / this.transform.scale,
      y: (sy - this.transform.y) / this.transform.scale
    };
  }

  findNodeAt(sx, sy) {
    const world = this.screenToWorld(sx, sy);
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const node = this.nodes[i];
      if (!this.activeCategories.has(node.category)) continue;
      const dx = world.x - node.x;
      const dy = world.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 6) {
        return node;
      }
    }
    return null;
  }

  initEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.render();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const hit = this.findNodeAt(sx, sy);

      if (hit) {
        this.draggedNode = hit;
        this.selectedNode = hit;
        this.canvas.style.cursor = 'grabbing';
        this.startSimulation();
        if (typeof this.onNodeClick === 'function') {
          this.onNodeClick(hit);
        }
      } else {
        this.isDraggingCanvas = true;
        this.dragStart = { x: sx - this.transform.x, y: sy - this.transform.y };
        this.canvas.style.cursor = 'grabbing';
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;

      if (this.draggedNode) {
        const world = this.screenToWorld(sx, sy);
        this.draggedNode.x = world.x;
        this.draggedNode.y = world.y;
        this.render();
      } else if (this.isDraggingCanvas) {
        this.transform.x = sx - this.dragStart.x;
        this.transform.y = sy - this.dragStart.y;
        this.render();
      } else {
        const hit = this.findNodeAt(sx, sy);
        if (hit !== this.hoveredNode) {
          this.hoveredNode = hit;
          this.canvas.style.cursor = hit ? 'pointer' : 'grab';
          this.render();
        }
      }
    });

    window.addEventListener('mouseup', () => {
      this.draggedNode = null;
      this.isDraggingCanvas = false;
      this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'grab';
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.zoom(zoomFactor);
    }, { passive: false });
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Subtle background grid
    this.renderGrid(ctx);

    ctx.save();
    ctx.translate(this.transform.x, this.transform.y);
    ctx.scale(this.transform.scale, this.transform.scale);

    // Filter visible nodes & links
    const visibleNodes = new Set(this.nodes.filter(n => this.activeCategories.has(n.category)));
    const visibleLinks = this.links.filter(l => visibleNodes.has(l.sourceNode) && visibleNodes.has(l.targetNode));

    // Connected set for highlighting
    const activeHighlightNode = this.hoveredNode || this.selectedNode;
    let connectedNodeIds = new Set();
    let connectedLinkSet = new Set();

    if (activeHighlightNode) {
      connectedNodeIds.add(activeHighlightNode.id);
      visibleLinks.forEach(l => {
        if (l.sourceNode.id === activeHighlightNode.id) {
          connectedNodeIds.add(l.targetNode.id);
          connectedLinkSet.add(l);
        } else if (l.targetNode.id === activeHighlightNode.id) {
          connectedNodeIds.add(l.sourceNode.id);
          connectedLinkSet.add(l);
        }
      });
    }

    // 1. Draw Edges / Links
    visibleLinks.forEach(link => {
      const isConnected = !activeHighlightNode || connectedLinkSet.has(link);
      const alpha = activeHighlightNode ? (isConnected ? 0.85 : 0.12) : 0.45;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
      ctx.lineTo(link.targetNode.x, link.targetNode.y);
      ctx.strokeStyle = isConnected && activeHighlightNode ? '#06B6D4' : 'rgba(148, 163, 184, ' + alpha + ')';
      ctx.lineWidth = isConnected && activeHighlightNode ? 2.5 : 1.5;
      if (link.dashed) ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Edge relationship label
      if (link.label && (this.transform.scale > 0.7 || isConnected)) {
        const mx = (link.sourceNode.x + link.targetNode.x) / 2;
        const my = (link.sourceNode.y + link.targetNode.y) / 2;
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillStyle = isConnected && activeHighlightNode ? '#E2E8F0' : 'rgba(148, 163, 184, ' + alpha + ')';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(link.label, mx, my - 5);
      }
      ctx.restore();
    });

    // 2. Draw Nodes
    visibleNodes.forEach(node => {
      const isConnected = !activeHighlightNode || connectedNodeIds.has(node.id);
      const isSearchMatch = this.searchQuery && node.label.toLowerCase().includes(this.searchQuery);
      const alpha = activeHighlightNode ? (isConnected ? 1 : 0.2) : 1;
      const style = this.categoryStyles[node.category] || this.categoryStyles.PERSON;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Glow halo for selected, hovered, or search-matched node
      if (node === this.selectedNode || node === this.hoveredNode || isSearchMatch) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = `${style.color}33`;
        ctx.fill();
        ctx.strokeStyle = style.border;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Outer Node Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0B172A';
      ctx.fill();
      ctx.strokeStyle = style.border;
      ctx.lineWidth = isConnected && activeHighlightNode ? 3 : 2;
      ctx.stroke();

      // Category Icon inside circle
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(style.icon, node.x, node.y);

      // Node Label
      ctx.font = node === this.selectedNode ? 'bold 11px Inter, sans-serif' : '10.5px Inter, sans-serif';
      ctx.fillStyle = '#F8FAFC';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.radius + 14);

      // Node Category Tag
      ctx.font = '8.5px JetBrains Mono, monospace';
      ctx.fillStyle = style.color;
      ctx.fillText(node.category, node.x, node.y + node.radius + 25);

      ctx.restore();
    });

    ctx.restore();
  }

  renderGrid(ctx) {
    const gridSize = 40 * this.transform.scale;
    const offsetX = this.transform.x % gridSize;
    const offsetY = this.transform.y % gridSize;

    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.03)';
    ctx.lineWidth = 1;

    for (let x = offsetX; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = offsetY; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }
}
