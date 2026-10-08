import React, { useState } from 'react';
import { 
  Network, 
  Play, 
  RotateCcw, 
  Layers, 
  Clock, 
  Sparkles, 
  MapPin, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import styles from './GraphVisualizerView.module.css';

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

const NODES: Node[] = [
  { id: 'MOL', name: 'Molepolole Depot', x: 80, y: 150 },
  { id: 'THA', name: 'Thamaga Clinic', x: 220, y: 70 },
  { id: 'GAB', name: 'Gabane Health Post', x: 240, y: 230 },
  { id: 'MOG', name: 'Mogoditshane Center', x: 380, y: 100 },
  { id: 'LEN', name: 'Lentsweletau Clinic', x: 390, y: 260 },
  { id: 'KOP', name: 'Kopong Dispensary', x: 530, y: 180 }
];

const EDGES: Edge[] = [
  { source: 'MOL', target: 'THA', weight: 42 },
  { source: 'MOL', target: 'GAB', weight: 35 },
  { source: 'THA', target: 'MOG', weight: 28 },
  { source: 'THA', target: 'GAB', weight: 19 },
  { source: 'GAB', target: 'LEN', weight: 31 },
  { source: 'MOG', target: 'KOP', weight: 22 },
  { source: 'LEN', target: 'KOP', weight: 25 },
  { source: 'MOG', target: 'LEN', weight: 14 }
];

export const GraphVisualizerView: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'dijkstra' | 'bfs' | 'dfs'>('dijkstra');
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeEdge, setActiveEdge] = useState<Edge | null>(null);
  const [shortestPathEdges, setShortestPathEdges] = useState<Edge[]>([]);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [traversalLog, setTraversalLog] = useState<string[]>([]);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const resetGraph = () => {
    setVisitedNodes([]);
    setActiveEdge(null);
    setShortestPathEdges([]);
    setDistances({});
    setIsTraversing(false);
    setTraversalLog([]);
  };

  // 1. Dijkstra Shortest-Path Simulation
  const runDijkstra = async () => {
    resetGraph();
    setIsTraversing(true);
    const dist: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const unvisited = new Set(NODES.map(n => n.id));

    NODES.forEach(n => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
    });
    dist['MOL'] = 0;
    setDistances({ ...dist });

    setTraversalLog(['Initialized Dijkstra from Molepolole Depot (Distance 0km).']);
    await sleep(600);

    const visited: string[] = [];

    while (unvisited.size > 0) {
      // Find node with minimum distance
      let current: string | null = null;
      let minD = Infinity;
      unvisited.forEach(nId => {
        if (dist[nId] < minD) {
          minD = dist[nId];
          current = nId;
        }
      });

      if (!current || dist[current] === Infinity) break;

      unvisited.delete(current);
      visited.push(current);
      setVisitedNodes([...visited]);

      const currNodeName = NODES.find(n => n.id === current)?.name;
      setTraversalLog(prevLog => [`Relaxing neighbors from ${currNodeName} (Cost: ${dist[current!]}km)...`, ...prevLog]);
      await sleep(700);

      // Relax neighboring edges
      const neighbors = EDGES.filter(e => e.source === current || e.target === current);
      for (const edge of neighbors) {
        const neighborId = edge.source === current ? edge.target : edge.source;
        if (!unvisited.has(neighborId)) continue;

        setActiveEdge(edge);
        await sleep(500);

        const newDist = dist[current] + edge.weight;
        if (newDist < dist[neighborId]) {
          dist[neighborId] = newDist;
          prev[neighborId] = current;
          setDistances({ ...dist });
          setTraversalLog(prevLog => [`  → Shorter path to ${neighborId}: ${newDist}km via ${current}`, ...prevLog]);
          await sleep(500);
        }
      }
      setActiveEdge(null);
    }

    // Build shortest path to destination Kopong (KOP)
    const pathEdges: Edge[] = [];
    let curr: string | null = 'KOP';
    while (curr && prev[curr]) {
      const parentNode: string = prev[curr]!;
      const e = EDGES.find(edge => 
        (edge.source === parentNode && edge.target === curr) || (edge.source === curr && edge.target === parentNode)
      );
      if (e) pathEdges.push(e);
      curr = parentNode;
    }
    setShortestPathEdges(pathEdges);
    setTraversalLog(prevLog => [`OPTIMAL ROUTE CONFIRMED: Total Cold-Chain Distance = ${dist['KOP']}km`, ...prevLog]);
    setIsTraversing(false);
  };

  // 2. Breadth-First Search (BFS)
  const runBFS = async () => {
    resetGraph();
    setIsTraversing(true);
    const queue: string[] = ['MOL'];
    const visited: string[] = ['MOL'];
    setVisitedNodes(['MOL']);
    setTraversalLog(['Enqueue Molepolole Depot (Level 0)']);
    await sleep(600);

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currName = NODES.find(n => n.id === current)?.name;
      setTraversalLog(prev => [`Visiting ${currName}`, ...prev]);
      await sleep(600);

      const neighbors = EDGES.filter(e => e.source === current || e.target === current);
      for (const edge of neighbors) {
        const neighborId = edge.source === current ? edge.target : edge.source;
        if (!visited.includes(neighborId)) {
          visited.push(neighborId);
          queue.push(neighborId);
          setActiveEdge(edge);
          setVisitedNodes([...visited]);
          await sleep(500);
        }
      }
      setActiveEdge(null);
    }
    setTraversalLog(prev => ['BFS Queue Drained. All reachable facilities discovered.', ...prev]);
    setIsTraversing(false);
  };

  const handleStart = () => {
    if (algorithm === 'dijkstra') runDijkstra();
    else if (algorithm === 'bfs') runBFS();
  };

  return (
    <div className={styles.graphContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>MIT 6.006 &amp; HARVARD CS50 GRAPH THEORY SUITE</div>
        <h1>Graph Theory &amp; Shortest-Path Visualizer</h1>
        <p className={styles.lead}>
          Simulate graph traversals across district facility supply chains. Observe Dijkstra's greedy shortest-path relaxation and Breadth-First Search (BFS) queue mechanics in real time.
        </p>
      </header>

      {/* Control Dashboard */}
      <div className={styles.controlCard}>
        <div className={styles.algoSelector}>
          <button
            className={`${styles.algoBtn} ${algorithm === 'dijkstra' ? styles.activeAlgo : ''}`}
            onClick={() => { setAlgorithm('dijkstra'); resetGraph(); }}
            disabled={isTraversing}
          >
            DIJKSTRA SHORTEST PATH (GREEDY)
          </button>
          <button
            className={`${styles.algoBtn} ${algorithm === 'bfs' ? styles.activeAlgo : ''}`}
            onClick={() => { setAlgorithm('bfs'); resetGraph(); }}
            disabled={isTraversing}
          >
            BREADTH-FIRST SEARCH (QUEUE LEVEL-ORDER)
          </button>
        </div>

        <div className={styles.actionRow}>
          <button 
            className={styles.resetBtn} 
            onClick={resetGraph}
            disabled={isTraversing}
          >
            <RotateCcw size={15} />
            <span>Reset Network</span>
          </button>
          <button 
            className={styles.playBtn} 
            onClick={handleStart}
            disabled={isTraversing}
          >
            <Play size={15} />
            <span>{isTraversing ? 'Traversing Graph...' : `Execute ${algorithm.toUpperCase()}`}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas & Log Split */}
      <div className={styles.visualGrid}>
        {/* SVG Network Graph Canvas */}
        <div className={styles.canvasWrapper}>
          <svg className={styles.svgCanvas} viewBox="0 0 620 340">
            {/* Draw Edges */}
            {EDGES.map((edge, idx) => {
              const srcNode = NODES.find(n => n.id === edge.source)!;
              const tgtNode = NODES.find(n => n.id === edge.target)!;
              const isActive = activeEdge && (
                (activeEdge.source === edge.source && activeEdge.target === edge.target) ||
                (activeEdge.source === edge.target && activeEdge.target === edge.source)
              );
              const isShortestPath = shortestPathEdges.some(e =>
                (e.source === edge.source && e.target === edge.target) ||
                (e.source === edge.target && e.target === edge.source)
              );

              let edgeClass = styles.edgeNormal;
              if (isActive) edgeClass = styles.edgeActive;
              if (isShortestPath) edgeClass = styles.edgeShortest;

              const midX = (srcNode.x + tgtNode.x) / 2;
              const midY = (srcNode.y + tgtNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={srcNode.x}
                    y1={srcNode.y}
                    x2={tgtNode.x}
                    y2={tgtNode.y}
                    className={`${styles.edgeLine} ${edgeClass}`}
                  />
                  <rect
                    x={midX - 14}
                    y={midY - 9}
                    width={28}
                    height={18}
                    rx={3}
                    className={styles.weightBg}
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    className={styles.weightText}
                  >
                    {edge.weight}km
                  </text>
                </g>
              );
            })}

            {/* Draw Nodes */}
            {NODES.map((node) => {
              const isVisited = visitedNodes.includes(node.id);
              const distVal = distances[node.id];

              return (
                <g key={node.id} className={styles.nodeGroup}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    className={`${styles.nodeCircle} ${isVisited ? styles.nodeVisited : ''}`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className={styles.nodeCode}
                  >
                    {node.id}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 34}
                    textAnchor="middle"
                    className={styles.nodeLabel}
                  >
                    {node.name}
                  </text>
                  {distVal !== undefined && (
                    <text
                      x={node.x}
                      y={node.y - 26}
                      textAnchor="middle"
                      className={styles.distLabel}
                    >
                      {distVal === Infinity ? '∞' : `${distVal}km`}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Real-Time Algorithmic Execution Trace */}
        <aside className={styles.tracePanel}>
          <div className={styles.traceHeader}>
            <Sparkles size={16} />
            <span>Execution Trace &amp; Cost Relaxation</span>
          </div>
          <div className={styles.traceLogList}>
            {traversalLog.length === 0 ? (
              <p className={styles.emptyTrace}>Click "Execute" to observe priority queue relaxation and neighbor discovery.</p>
            ) : (
              traversalLog.map((log, i) => (
                <div key={i} className={styles.traceItem}>
                  <span className={styles.tracePrompt}>&gt;</span>
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>

      {/* Algorithmic Theory Footer */}
      <div className={styles.theoryCard}>
        <h3>
          <Info size={16} />
          <span>MIT 6.006 Asymptotic Complexity &amp; Mechanics</span>
        </h3>
        <p>
          <strong>Dijkstra's Algorithm:</strong> Operates in <code>O((V + E) log V)</code> using a binary min-heap priority queue. Greedy choice property ensures that once a node is settled from the queue, its shortest path from the source is permanently determined.
        </p>
      </div>
    </div>
  );
};
