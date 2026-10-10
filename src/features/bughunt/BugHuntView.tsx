import React, { useState } from 'react';
import { BUG_HUNT_LEVELS, BugHuntLevel } from '../../content/bughunt';
import { useStore } from '../../lib/store';
import { 
  Bug, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import styles from './BugHuntView.module.css';

export const BugHuntView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [inspected, setInspected] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<Record<string, boolean>>({});

  const { recordExercisePass } = useStore();
  const level: BugHuntLevel = BUG_HUNT_LEVELS[currentIdx];

  const codeLines = level.buggyCode.split('\n');

  const handleLineClick = (lineNum: number) => {
    setSelectedLine(lineNum);
    setInspected(true);

    if (lineNum === level.bugLineNumber) {
      if (!solved[level.id]) {
        setSolved(prev => ({ ...prev, [level.id]: true }));
        recordExercisePass(`bughunt_${level.id}`, 1);
      }
    }
  };

  const isCorrect = selectedLine === level.bugLineNumber;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <Bug size={18} />
          <span>Spot The Bug Lab</span>
        </div>
        <h1>Peer Code Review &amp; Bug Hunt</h1>
        <p className={styles.subtitle}>
          80% of professional software engineering is reading and debugging code written by others. Inspect the scenario, click the line containing the flaw, and study the architectural fix.
        </p>
      </header>

      {/* Level Stepper */}
      <div className={styles.stepperBar}>
        <span className={styles.stepCounter}>
          Case {currentIdx + 1} of {BUG_HUNT_LEVELS.length}
        </span>
        <div className={styles.stepTabs}>
          {BUG_HUNT_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.id}
              className={`${styles.stepTab} ${currentIdx === idx ? styles.activeTab : ''} ${solved[lvl.id] ? styles.solvedTab : ''}`}
              onClick={() => {
                setCurrentIdx(idx);
                setSelectedLine(null);
                setInspected(false);
                setShowHint(false);
              }}
            >
              Case {idx + 1} {solved[lvl.id] && '✓'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.caseCard}>
        <div className={styles.metaRow}>
          <span className={styles.langBadge}>{level.language.toUpperCase()}</span>
          <span className={styles.diffBadge}>{level.difficulty}</span>
          <span className={styles.xpBadge}>+{level.xpReward} XP</span>
        </div>

        <h2 className={styles.caseTitle}>{level.title}</h2>
        <div className={styles.scenarioBox}>
          <strong>Incident Scenario:</strong> {level.scenario}
        </div>

        <div className={styles.instructionPrompt}>
          👉 <strong>Instructions:</strong> Review the snippet below and <em>click directly on the line of code</em> that causes the defect or performance flaw.
        </div>

        {/* Interactive Code Line Inspector */}
        <div className={styles.codeContainer}>
          {codeLines.map((line, idx) => {
            const lineNum = idx + 1;
            const isSelected = selectedLine === lineNum;
            const isTargetBug = lineNum === level.bugLineNumber && inspected;

            return (
              <div
                key={idx}
                className={`${styles.codeLine} ${isSelected ? styles.lineSelected : ''} ${isTargetBug ? styles.lineBugConfirmed : ''}`}
                onClick={() => handleLineClick(lineNum)}
              >
                <span className={styles.lineNum}>{lineNum}</span>
                <span className={styles.lineContent}>{line || ' '}</span>
              </div>
            );
          })}
        </div>

        {/* Hint toggle */}
        <div className={styles.hintSection}>
          <button 
            className={styles.hintBtn}
            onClick={() => setShowHint(!showHint)}
          >
            <HelpCircle size={14} />
            <span>{showHint ? 'Hide Diagnostic Hint' : 'Reveal Diagnostic Hint'}</span>
          </button>
          {showHint && (
            <p className={styles.hintText}>💡 {level.hint}</p>
          )}
        </div>

        {/* Inspection Result Card */}
        {inspected && (
          <div className={isCorrect ? styles.correctAlert : styles.wrongAlert}>
            {isCorrect ? (
              <div>
                <div className={styles.alertHeader}>
                  <CheckCircle2 size={20} />
                  <strong>Flaw Identified on Line {level.bugLineNumber}!</strong>
                </div>
                <p className={styles.explanationText}>{level.bugExplanation}</p>
                <div className={styles.fixBox}>
                  <strong>Production Fix:</strong>
                  <pre>{level.fixedCode}</pre>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.alertHeader}>
                  <AlertTriangle size={18} />
                  <span>Line {selectedLine} is not the root defect. Re-examine the execution logic or review the diagnostic hint.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation bottom */}
        <div className={styles.navRow}>
          <button
            className={styles.navBtn}
            disabled={currentIdx === 0}
            onClick={() => {
              setCurrentIdx(currentIdx - 1);
              setSelectedLine(null);
              setInspected(false);
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous Case</span>
          </button>
          <button
            className={styles.navBtn}
            disabled={currentIdx === BUG_HUNT_LEVELS.length - 1}
            onClick={() => {
              setCurrentIdx(currentIdx + 1);
              setSelectedLine(null);
              setInspected(false);
            }}
          >
            <span>Next Case</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
