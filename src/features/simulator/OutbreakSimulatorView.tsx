import React, { useState, useEffect, useRef } from 'react';
import { PythonEngine } from '../../engines';
import { 
  Activity, 
  Play, 
  RotateCcw, 
  Sliders, 
  ShieldCheck, 
  Info,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import styles from './OutbreakSimulatorView.module.css';

const pyEngine = new PythonEngine();

interface SimPoint {
  day: number;
  susceptible: number;
  infected: number;
  recovered: number;
}

export const OutbreakSimulatorView: React.FC = () => {
  // Model Parameters
  const [population, setPopulation] = useState(100000); // e.g. Kweneng District
  const [initialInfected, setInitialInfected] = useState(25);
  const [r0, setR0] = useState(2.8); // Basic reproduction number
  const [vaccinationCoverage, setVaccinationCoverage] = useState(45); // %
  const [coldChainUptime, setColdChainUptime] = useState(90); // %
  const [interventionDay, setInterventionDay] = useState(15);
  const [interventionStrength, setInterventionStrength] = useState(50); // % reduction in transmission

  // Python Script editor
  const [pythonCode, setPythonCode] = useState(`# Botswana District Epidemic SIR Model
# Write Python code to calculate effective R (R_eff)
pop = 100000
vax_rate = 0.45
uptime = 0.90
r0_base = 2.8

# Effective vaccine efficacy factoring cold-chain
effective_vax = vax_rate * uptime
r_effective = round(r0_base * (1 - effective_vax), 2)

print(f"R_eff: {r_effective}")
if r_effective < 1.0:
    print("STATUS: OUTBREAK SUPPRESSED (R_eff < 1)")
else:
    print("STATUS: ACTIVE TRANSMISSION (R_eff >= 1)")
`);

  const [pyOutput, setPyOutput] = useState('');
  const [isPyRunning, setIsPyRunning] = useState(false);

  // Simulation data points
  const [simData, setSimData] = useState<SimPoint[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Run SIR Model Math
  const calculateSIR = () => {
    const totalDays = 60;
    const points: SimPoint[] = [];

    // Real vaccine efficacy adjusted by cold chain uptime
    const adjustedVaxEfficacy = 0.85 * (coldChainUptime / 100);
    const immuneFraction = (vaccinationCoverage / 100) * adjustedVaxEfficacy;

    let S = population * (1 - immuneFraction);
    let I = initialInfected;
    let R = population * immuneFraction;

    const gamma = 1 / 10; // 10 day recovery period
    let beta = (r0 * gamma) / population;

    for (let day = 0; day <= totalDays; day++) {
      points.push({
        day,
        susceptible: Math.round(S),
        infected: Math.round(I),
        recovered: Math.round(R)
      });

      // Apply intervention after designated day
      let currentBeta = beta;
      if (day >= interventionDay) {
        currentBeta = beta * (1 - interventionStrength / 100);
      }

      const newInfections = currentBeta * S * I;
      const newRecoveries = gamma * I;

      S = Math.max(0, S - newInfections);
      I = Math.max(0, I + newInfections - newRecoveries);
      R = Math.min(population, R + newRecoveries);
    }

    setSimData(points);
  };

  useEffect(() => {
    calculateSIR();
  }, [population, initialInfected, r0, vaccinationCoverage, coldChainUptime, interventionDay, interventionStrength]);

  // Draw simulation curve on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || simData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Padding
    const padX = 50;
    const padY = 30;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const maxPop = population;
    const maxDays = simData.length - 1;

    // Draw coordinate axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, h - padY);
    ctx.lineTo(w - padX, h - padY);
    ctx.stroke();

    // Helper coordinates
    const getX = (d: number) => padX + (d / maxDays) * plotW;
    const getY = (val: number) => h - padY - (val / maxPop) * plotH;

    // 1. Draw Susceptible (Ocean Cyan)
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    simData.forEach((pt, i) => {
      const x = getX(pt.day);
      const y = getY(pt.susceptible);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 2. Draw Infected (Ember Orange)
    ctx.strokeStyle = '#f26419';
    ctx.lineWidth = 3;
    ctx.beginPath();
    simData.forEach((pt, i) => {
      const x = getX(pt.day);
      const y = getY(pt.infected);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 3. Draw Recovered (Emerald Green)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    simData.forEach((pt, i) => {
      const x = getX(pt.day);
      const y = getY(pt.recovered);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Intervention line
    const intX = getX(interventionDay);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(intX, padY);
    ctx.lineTo(intX, h - padY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Label for Intervention
    ctx.fillStyle = '#eab308';
    ctx.font = '11px monospace';
    ctx.fillText(`Day ${interventionDay} Intervention`, intX + 6, padY + 16);
  }, [simData, population, interventionDay]);

  const handleRunPython = async () => {
    setIsPyRunning(true);
    const res = await pyEngine.run(pythonCode);
    setIsPyRunning(false);
    setPyOutput(res.stdout || res.stderr || 'Executed.');
  };

  const peakInfected = Math.max(...simData.map(d => d.infected), 0);
  const totalRecovered = simData[simData.length - 1]?.recovered || 0;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <Activity size={18} />
          <span>Epidemic SIR Simulator</span>
        </div>
        <h1>The Outbreak Simulator: Epidemiological SIR Modeling</h1>
        <p className={styles.subtitle}>
          Interactive mathematical simulation of communicable disease spread across Botswana health districts. Test how vaccination coverage, cold-chain refrigeration integrity, and public health interventions alter the reproduction curve (R_effective).
        </p>
      </header>

      {/* KPI Stats Bar */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Population</span>
          <span className={styles.kpiVal}>{population.toLocaleString()}</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Peak Infection Count</span>
          <span className={`${styles.kpiVal} ${styles.infectedVal}`}>{peakInfected.toLocaleString()}</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Immunized / Recovered</span>
          <span className={`${styles.kpiVal} ${styles.recoveredVal}`}>{totalRecovered.toLocaleString()}</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Cold-Chain Uptime</span>
          <span className={styles.kpiVal}>{coldChainUptime}%</span>
        </div>
      </div>

      <div className={styles.layoutGrid}>
        {/* Left: Interactive Canvas Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartLegend}>
              <span className={styles.dotSusceptible}>● Susceptible</span>
              <span className={styles.dotInfected}>● Active Cases</span>
              <span className={styles.dotRecovered}>● Recovered / Immune</span>
            </div>
            <span className={styles.chartTime}>60-Day Forecast</span>
          </div>

          <canvas ref={canvasRef} width={640} height={320} className={styles.canvasPlot} />

          {/* Interactive Parameters Drawer */}
          <div className={styles.paramsBox}>
            <h3>
              <Sliders size={16} />
              <span>District Field Parameters</span>
            </h3>

            <div className={styles.slidersGrid}>
              <div className={styles.sliderGroup}>
                <label>
                  <span>Vaccination Coverage: <strong>{vaccinationCoverage}%</strong></span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={vaccinationCoverage}
                  onChange={(e) => setVaccinationCoverage(Number(e.target.value))}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label>
                  <span>Cold-Chain Refrigerator Uptime: <strong>{coldChainUptime}%</strong></span>
                </label>
                <input
                  type="range"
                  min={40}
                  max={100}
                  value={coldChainUptime}
                  onChange={(e) => setColdChainUptime(Number(e.target.value))}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label>
                  <span>Base Reproduction Rate ($R_0$): <strong>{r0}</strong></span>
                </label>
                <input
                  type="range"
                  min={1.1}
                  max={5.0}
                  step={0.1}
                  value={r0}
                  onChange={(e) => setR0(Number(e.target.value))}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label>
                  <span>Deploy Community Intervention on Day: <strong>{interventionDay}</strong></span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={45}
                  value={interventionDay}
                  onChange={(e) => setInterventionDay(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Embedded Python SIR Engine */}
        <div className={styles.codeCard}>
          <div className={styles.codeHeader}>
            <span>Python Epidemic Math Engine</span>
            <button className={styles.runBtn} onClick={handleRunPython} disabled={isPyRunning}>
              <Play size={13} />
              <span>{isPyRunning ? 'Computing...' : 'Run Python'}</span>
            </button>
          </div>

          <textarea
            className={styles.codeTextarea}
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            rows={14}
            spellCheck={false}
          />

          {pyOutput && (
            <div className={styles.outputBox}>
              <div className={styles.outputTitle}>Terminal Output:</div>
              <pre className={styles.outputPre}>{pyOutput}</pre>
            </div>
          )}

          <div className={styles.epNote}>
            <Info size={14} />
            <span>
              Real-world WHO guidance: maintaining cold-chain refrigeration integrity between 2°C and 8°C ensures vaccine efficacy stays high enough to suppress R_effective &lt; 1.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
