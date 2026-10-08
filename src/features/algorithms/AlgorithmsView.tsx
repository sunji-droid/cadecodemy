import React, { useState } from 'react';
import { ALGORITHM_LABS, AlgorithmLab } from '../../content/algorithms';
import { PythonEngine } from '../../engines';
import { useStore } from '../../lib/store';
import { 
  Binary, 
  Play, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Layers, 
  Award,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import styles from './AlgorithmsView.module.css';

const pyEngine = new PythonEngine();

export const AlgorithmsView: React.FC = () => {
  const [activeLab, setActiveLab] = useState<AlgorithmLab>(ALGORITHM_LABS[0]);
  const [code, setCode] = useState(activeLab.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{ passed: boolean; message: string } | null>(null);

  const { completedExercises, recordExercisePass } = useStore();

  const handleSelectLab = (lab: AlgorithmLab) => {
    setActiveLab(lab);
    setCode(lab.starterCode);
    setOutput('');
    setTestResult(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestResult(null);

    // Run user execution
    const runRes = await pyEngine.run(code);
    setIsRunning(false);
    setOutput(runRes.stdout || runRes.stderr || 'Executed.');

    // Run automated verification test harness
    const hasKeywords = activeLab.solutionKeywords.every(k => code.includes(k));
    const testCode = `${code}\n${activeLab.testRunner}`;
    const testRes = await pyEngine.run(testCode);

    if (!testRes.error && hasKeywords) {
      setTestResult({ passed: true, message: 'All algorithmic test assertions passed.' });
      recordExercisePass(`algo_${activeLab.id}`, true);
    } else {
      setTestResult({
        passed: false,
        message: testRes.error ? `Assertion Failed: ${testRes.error}` : 'Code must satisfy the structural complexity requirements.'
      });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>HONORS CURRICULUM · HARVARD CS50 ALGORITHMS &amp; DATA STRUCTURES</div>
        <h1>Algorithms &amp; Data Structures Laboratory</h1>
        <p className={styles.lead}>
          Master fundamental computer science algorithms: from logarithmic pivot searches and ranked-choice voting tabulators to memory-efficient prefix trees (Tries) and cryptographic ciphers.
        </p>
      </header>

      {/* Lab Tabs */}
      <div className={styles.labTabs}>
        {ALGORITHM_LABS.map((lab) => (
          <button
            key={lab.id}
            className={`${styles.labTab} ${activeLab.id === lab.id ? styles.activeTab : ''}`}
            onClick={() => handleSelectLab(lab)}
          >
            <div className={styles.tabDifficulty}>{lab.difficulty}</div>
            <div className={styles.tabTitle}>{lab.title}</div>
            <div className={styles.tabCategory}>{lab.category}</div>
          </button>
        ))}
      </div>

      <div className={styles.mainLayout}>
        {/* Theory & Complexity Overview */}
        <div className={styles.specPanel}>
          <div className={styles.specHeader}>
            <h2>{activeLab.title}</h2>
            <div className={styles.complexityBadges}>
              <span className={styles.compPill}>
                <Clock size={12} />
                <span>Time: {activeLab.timeComplexity}</span>
              </span>
              <span className={styles.compPill}>
                <Layers size={12} />
                <span>Space: {activeLab.spaceComplexity}</span>
              </span>
            </div>
          </div>

          <div className={styles.descriptionBox}>
            <p>{activeLab.description}</p>
          </div>

          <div className={styles.theoryBox}>
            <h3>
              <BookOpen size={16} />
              <span>Algorithmic Theory &amp; Foundations</span>
            </h3>
            <p>{activeLab.theory}</p>
          </div>
        </div>

        {/* Interactive Editor Panel */}
        <div className={styles.editorPanel}>
          <div className={styles.editorBar}>
            <span className={styles.editorTitle}>Python 3 Algorithmic Sandbox</span>
            <button
              className={styles.runBtn}
              onClick={handleRunCode}
              disabled={isRunning}
            >
              <Play size={14} />
              <span>{isRunning ? 'Auditing Assertions...' : 'Run & Audit Assertions'}</span>
            </button>
          </div>

          <textarea
            className={styles.codeArea}
            rows={12}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />

          {output && (
            <div className={styles.outputBox}>
              <div className={styles.outputLabel}>Standard Output:</div>
              <pre className={styles.outputPre}>{output}</pre>
            </div>
          )}

          {testResult && (
            <div className={testResult.passed ? styles.testPassed : styles.testFailed}>
              {testResult.passed ? (
                <>
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Assertion Verification Passed!</strong>
                    <div>{testResult.message} 30 XP awarded.</div>
                  </div>
                </>
              ) : (
                <>
                  <Cpu size={20} />
                  <div>
                    <strong>Test Verification Warning:</strong>
                    <div>{testResult.message}</div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
