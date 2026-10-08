import React, { useState } from 'react';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../engines';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { Play, RotateCcw, Lock } from 'lucide-react';
import styles from './Playground.module.css';

const engines = {
  python: new PythonEngine(),
  sql: new SQLEngine(),
  javascript: new JavaScriptEngine(),
  bash: new BashEngine(),
  r: new REngine()
};

const STARTER_CODE: Record<string, string> = {
  python: '# CadeCodemy Python Sandbox\nimport sys\n\ndef calculate_rates(total, target):\n    return (total / target) * 100\n\nrate = calculate_rates(1280, 1500)\nprint(f"Calculated Coverage: {rate:.1f}%")\n',
  sql: '-- Query seeded clinic records\nSELECT facility_name, target_pop, doses_administered\nFROM clinics\nWHERE doses_administered > 500\nORDER BY doses_administered DESC;',
  javascript: '// Modern JavaScript Runner\nconst clinics = [\n  { name: "Molepolole Main", doses: 1280 },\n  { name: "Thamaga Primary", doses: 620 }\n];\n\nconst total = clinics.reduce((acc, c) => acc + c.doses, 0);\nconsole.log("Total District Doses:", total);\n',
  bash: '# CadeCodemy Virtual Shell\npwd\nls\ncat /home/learner/welcome.txt\n',
  r: '# R Statistical Sandbox\ndoses <- c(1280, 620, 410, 1690)\nsummary(doses)\n'
};

export const Playground: React.FC = () => {
  const { xpEvents } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);
  const playgroundUnlocked = stage.id >= 2;

  const [lang, setLang] = useState<'python' | 'sql' | 'javascript' | 'bash' | 'r'>('python');
  const [code, setCode] = useState(STARTER_CODE.python);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleSelectLang = (selected: 'python' | 'sql' | 'javascript' | 'bash' | 'r') => {
    setLang(selected);
    setCode(STARTER_CODE[selected]);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    const engine = engines[lang];
    const res = await engine.run(code);
    setIsRunning(false);
    setOutput(res.stdout || res.stderr || 'Code executed (empty output).');
  };

  const handleReset = () => {
    setCode(STARTER_CODE[lang]);
    setOutput('');
  };

  if (!playgroundUnlocked) {
    return (
      <div className={styles.lockedContainer}>
        <div className={styles.lockIconBox}>
          <Lock size={32} />
        </div>
        <h2>Playground Locked</h2>
        <p>
          The multi-language Code Playground unlocks at <strong>Stage 2 (Sprout)</strong> at 500 XP.
        </p>
        <p className={styles.lockedSub}>
          Complete your first few lessons to unlock the open sandbox and snippet storage perk.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.playgroundContainer}>
      <header className={styles.header}>
        <div>
          <h1>Code Playground</h1>
          <p className={styles.lead}>Run and experiment with Python, SQL, JavaScript, Bash, and R in your browser.</p>
        </div>
        <div className={styles.langSelector}>
          {(['python', 'sql', 'javascript', 'bash', 'r'] as const).map((l) => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.activeLang : ''}`}
              onClick={() => handleSelectLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.editorPane}>
          <div className={styles.paneBar}>
            <span className={styles.paneTitle}>{lang.toUpperCase()} Source</span>
            <div className={styles.actionGroup}>
              <button className={styles.resetBtn} onClick={handleReset} title="Reset to starter snippet">
                <RotateCcw size={14} />
              </button>
              <button className={styles.runBtn} onClick={handleRun} disabled={isRunning}>
                <Play size={14} />
                <span>{isRunning ? 'Running...' : 'Run (Ctrl+Enter)'}</span>
              </button>
            </div>
          </div>
          <textarea
            className={styles.editorArea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className={styles.outputPane}>
          <div className={styles.paneBar}>
            <span className={styles.paneTitle}>Console Output</span>
          </div>
          <pre className={styles.outputPre}>
            {output || 'Click "Run" to view execution results...'}
          </pre>
        </div>
      </div>
    </div>
  );
};
