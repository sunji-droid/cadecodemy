import React, { useState } from 'react';
import { getTodayChallenge } from '../../content/daily';
import { PythonEngine, SQLEngine, JavaScriptEngine } from '../../engines';
import { useStore } from '../../lib/store';
import { 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Play, 
  HelpCircle, 
  Sparkles, 
  Clock,
  Award
} from 'lucide-react';
import styles from './DailyChallengeView.module.css';

const pyEngine = new PythonEngine();
const sqlEngine = new SQLEngine();
const jsEngine = new JavaScriptEngine();

export const DailyChallengeView: React.FC = () => {
  const challenge = getTodayChallenge();
  const { currentStreak, recordStreakDay, recordExercisePass } = useStore();

  const [code, setCode] = useState(challenge.initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [passed, setPassed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setErrorMsg(null);

    let res: any;
    if (challenge.language === 'python') {
      res = await pyEngine.run(code);
    } else if (challenge.language === 'sql') {
      res = await sqlEngine.run(code);
    } else {
      res = await jsEngine.run(code);
    }

    setIsRunning(false);
    const stdout = (res.stdout || '').trim();
    setOutput(stdout || res.stderr || 'Executed (no output returned).');

    // Validation
    const isUntouched = code.trim() === challenge.initialCode.trim();
    if (isUntouched) {
      setErrorMsg('Please write your solution before running.');
      return;
    }

    if (!res.error && stdout.length > 0) {
      setPassed(true);
      recordStreakDay();
      recordExercisePass(challenge.id, 1);
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.streakBadge}>
          <Flame size={18} className={styles.flameIcon} />
          <span>Active Streak: {currentStreak} Days</span>
        </div>
        <h1>Daily Micro-Challenge</h1>
        <p className={styles.subtitle}>
          A new 5-minute practical puzzle drops every day at 08:00 CAT. Keep your streak alive and sharpen real-world syntax.
        </p>
      </header>

      <div className={styles.challengeCard}>
        <div className={styles.metaRow}>
          <div className={styles.dateBadge}>
            <Calendar size={14} />
            <span>{challenge.date}</span>
          </div>
          <span className={styles.langBadge}>{challenge.language.toUpperCase()}</span>
          <span className={styles.diffBadge}>{challenge.difficulty}</span>
          <span className={styles.xpBadge}>+{challenge.xpReward} XP</span>
        </div>

        <h2 className={styles.challengeTitle}>{challenge.title}</h2>
        <p className={styles.descriptionText}>{challenge.description}</p>

        <div className={styles.editorBox}>
          <div className={styles.editorToolbar}>
            <span className={styles.editorLabel}>Interactive Solution Editor</span>
            <div className={styles.toolbarBtns}>
              <button 
                className={styles.hintBtn}
                onClick={() => setShowHint(!showHint)}
              >
                <HelpCircle size={14} />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
              <button 
                className={styles.runBtn} 
                onClick={handleRun}
                disabled={isRunning}
              >
                <Play size={14} />
                <span>{isRunning ? 'Testing...' : 'Run Challenge'}</span>
              </button>
            </div>
          </div>

          <textarea
            className={styles.codeTextarea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={8}
            spellCheck={false}
          />

          {showHint && (
            <div className={styles.hintBox}>
              <strong>💡 Pro Tip:</strong> {challenge.hints.join(' ')}
            </div>
          )}

          {output && (
            <div className={styles.outputBox}>
              <div className={styles.outputTitle}>Terminal Output:</div>
              <pre className={styles.outputPre}>{output}</pre>
            </div>
          )}

          {errorMsg && (
            <div className={styles.errorAlert}>
              ⚠️ {errorMsg}
            </div>
          )}

          {passed && (
            <div className={styles.successBanner}>
              <CheckCircle2 size={20} />
              <div>
                <strong>Challenge Cleared!</strong>
                <span>+{challenge.xpReward} XP awarded & streak secured for today.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
