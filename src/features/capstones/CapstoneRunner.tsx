import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CAPSTONES } from '../../content/capstones';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { PythonEngine, SQLEngine } from '../../engines';
import { 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  ArrowLeft, 
  Award, 
  AlertCircle,
  FileText,
  Lock,
  ChevronRight
} from 'lucide-react';
import styles from './CapstoneRunner.module.css';

const pyEngine = new PythonEngine();
const sqlEngine = new SQLEngine();

export const CapstoneRunner: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const { xpEvents, recordCapstonePass, completedTracks } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);

  // Capstone unlocked at Stage 5 (Architect, 9,000 XP) or direct preview
  const isUnlocked = stage.id >= 3; // Unlocked at Stage 3 for active testing

  const capstone = CAPSTONES.find(c => c.trackId === trackId) || CAPSTONES[0];
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const activePhase = capstone.stages[currentStageIdx];

  const [code, setCode] = useState(activePhase.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [phasePassed, setPhasePassed] = useState(false);
  const [capstoneComplete, setCapstoneComplete] = useState(!!completedTracks[capstone.trackId]);

  const handleRun = async () => {
    setIsRunning(true);
    let res;
    if (capstone.trackId === 'python') {
      res = await pyEngine.run(code);
    } else {
      res = await sqlEngine.run(code);
    }
    setIsRunning(false);
    setOutput(res.stdout || res.stderr || 'Executed.');

    // Validate expected criteria
    const hasKeywords = activePhase.expectedKeywords.every(kw => code.includes(kw));
    if (!res.error && res.stdout.length > 0 && hasKeywords) {
      setPhasePassed(true);
      if (currentStageIdx === capstone.stages.length - 1) {
        setCapstoneComplete(true);
        recordCapstonePass(capstone.trackId);
      }
    }
  };

  const handleNextPhase = () => {
    if (currentStageIdx < capstone.stages.length - 1) {
      const nextIdx = currentStageIdx + 1;
      setCurrentStageIdx(nextIdx);
      setCode(capstone.stages[nextIdx].starterCode);
      setOutput('');
      setPhasePassed(false);
    }
  };

  return (
    <div className={styles.capstoneContainer}>
      <div className={styles.topBar}>
        <Link to="/tracks" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Return to Tracks</span>
        </Link>
        <span className={styles.levelTag}>{capstone.credentialLevel}</span>
      </div>

      <header className={styles.header}>
        <div className={styles.badgeRow}>
          <span className={styles.capstoneBadge}>HARVARD-GRADE CAPSTONE DEFENSE</span>
          <span className={styles.phaseIndicator}>Phase {currentStageIdx + 1} of {capstone.stages.length}</span>
        </div>
        <h1>{capstone.title}</h1>
        <p className={styles.scenarioLead}>{capstone.fieldScenario}</p>
      </header>

      {/* Phase Challenge Card */}
      <section className={styles.workspaceCard}>
        <div className={styles.phaseHeader}>
          <div>
            <h2>{activePhase.title}</h2>
            <p className={styles.phaseTask}>{activePhase.scenario}</p>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className={styles.criteriaBox}>
          <span className={styles.criteriaTitle}>Evaluation Criteria:</span>
          <ul>
            {activePhase.solutionCriteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Code Editor */}
        <div className={styles.editorWrapper}>
          <div className={styles.editorBar}>
            <span className={styles.editorLang}>{capstone.trackId.toUpperCase()} Capstone Environment</span>
            <button className={styles.runBtn} onClick={handleRun} disabled={isRunning}>
              <Play size={14} />
              <span>{isRunning ? 'Auditing Code...' : 'Execute & Validate'}</span>
            </button>
          </div>
          <textarea
            className={styles.codeTextarea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            spellCheck={false}
          />
          {output && (
            <div className={styles.outputBox}>
              <div className={styles.outputLabel}>Execution Result:</div>
              <pre className={styles.outputPre}>{output}</pre>
            </div>
          )}
        </div>

        {/* Phase / Capstone Success Banners */}
        {phasePassed && !capstoneComplete && (
          <div className={styles.passBanner}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Phase {currentStageIdx + 1} Validated!</strong> All evaluation criteria satisfied.
            </div>
            <button className={styles.nextPhaseBtn} onClick={handleNextPhase}>
              <span>Advance to Phase {currentStageIdx + 2}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {capstoneComplete && (
          <div className={styles.completionCard}>
            <Award size={36} className={styles.awardIcon} />
            <div>
              <h3>Master Capstone Defended &amp; Passed</h3>
              <p>200 XP awarded. You are officially eligible for your verified Track Certificate of Mastery.</p>
            </div>
            <Link to="/certificates" className={styles.claimCertBtn}>
              <ShieldCheck size={16} />
              <span>Claim Certificate</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
