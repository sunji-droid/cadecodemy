import React, { useState, useEffect } from 'react';
import { MOCK_ASSESSMENTS, AssessmentTrack } from '../../content/assessments';
import { PythonEngine, SQLEngine } from '../../engines';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  FileCheck, 
  Download,
  Award
} from 'lucide-react';
import styles from './AssessmentView.module.css';

const pyEngine = new PythonEngine();
const sqlEngine = new SQLEngine();

export const AssessmentView: React.FC = () => {
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const track: AssessmentTrack = MOCK_ASSESSMENTS[selectedTrackIdx];

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userCode, setUserCode] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(track.durationMinutes * 60);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    let timer: any;
    if (isTestActive && timeLeft > 0 && !isCompleted) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isTestActive && !isCompleted) {
      handleFinalSubmit();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft, isCompleted]);

  const currentQ = track.questions[activeQuestionIdx];
  const currentCode = userCode[currentQ.id] !== undefined ? userCode[currentQ.id] : currentQ.starterCode;

  const handleStartAssessment = () => {
    setIsTestActive(true);
    setTimeLeft(track.durationMinutes * 60);
    setIsCompleted(false);
    setScore(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    let res: any;
    if (currentQ.category === 'Databases') {
      res = await sqlEngine.run(currentCode);
    } else {
      res = await pyEngine.run(currentCode);
    }
    setIsRunning(false);
    const out = (res.stdout || '').trim();
    setOutputs(prev => ({ ...prev, [currentQ.id]: out || res.stderr || 'No output.' }));
  };

  const handleFinalSubmit = () => {
    setIsCompleted(true);
    setIsTestActive(false);

    // Calculate score based on expected keywords and non-empty outputs
    let correctCount = 0;
    track.questions.forEach(q => {
      const out = outputs[q.id] || '';
      const hasKeywords = q.expectedKeywords.some(k => out.includes(k) || (userCode[q.id] || '').includes(k));
      if (hasKeywords) correctCount++;
    });

    const calculatedScore = Math.round((correctCount / track.questions.length) * 100);
    setScore(calculatedScore);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>
          <Briefcase size={18} />
          <span>Interview Readiness Lab</span>
        </div>
        <h1>Technical Assessment Screening</h1>
        <p className={styles.subtitle}>
          Simulate a real 25-minute technical coding interview used by technology firms, banks, and health institutions. Tests algorithms, clean syntax, and database query problem solving under timed conditions.
        </p>
      </header>

      {/* Track Selector */}
      <div className={styles.trackPicker}>
        {MOCK_ASSESSMENTS.map((t, idx) => (
          <button
            key={t.id}
            className={`${styles.trackBtn} ${selectedTrackIdx === idx ? styles.activeTrack : ''}`}
            onClick={() => {
              setSelectedTrackIdx(idx);
              setActiveQuestionIdx(0);
              setIsTestActive(false);
              setIsCompleted(false);
            }}
          >
            <strong>{t.title}</strong>
            <span>{t.roleTarget}</span>
          </button>
        ))}
      </div>

      {/* Pre-Assessment Card */}
      {!isTestActive && !isCompleted && (
        <div className={styles.readyCard}>
          <h2>{track.title}</h2>
          <p className={styles.roleDesc}>Target Role: <strong>{track.roleTarget}</strong></p>
          <div className={styles.rulesList}>
            <div>⏱️ <strong>Time Limit:</strong> {track.durationMinutes} minutes</div>
            <div>📋 <strong>Questions:</strong> {track.questions.length} Technical Challenges</div>
            <div>⚡ <strong>Execution:</strong> In-browser runtime with instant output testing</div>
          </div>
          <button className={styles.startBtn} onClick={handleStartAssessment}>
            Start Timed Assessment
          </button>
        </div>
      )}

      {/* Live Test Window */}
      {isTestActive && (
        <div className={styles.activeTestArea}>
          <div className={styles.timerBar}>
            <div className={styles.questionNav}>
              {track.questions.map((q, i) => (
                <button
                  key={q.id}
                  className={`${styles.qTab} ${activeQuestionIdx === i ? styles.activeQTab : ''}`}
                  onClick={() => setActiveQuestionIdx(i)}
                >
                  Q{i + 1}
                </button>
              ))}
            </div>

            <div className={`${styles.timerDisplay} ${timeLeft < 300 ? styles.timerWarning : ''}`}>
              <Clock size={16} />
              <span>Time Remaining: <strong>{formatTime(timeLeft)}</strong></span>
            </div>
          </div>

          <div className={styles.questionCard}>
            <span className={styles.catBadge}>{currentQ.category}</span>
            <h3 className={styles.qTitle}>{currentQ.title}</h3>
            <p className={styles.qPrompt}>{currentQ.prompt}</p>

            <div className={styles.editorArea}>
              <div className={styles.editorHeader}>
                <span>Solution Workspace</span>
                <button 
                  className={styles.runBtn}
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  <Play size={14} />
                  <span>{isRunning ? 'Running...' : 'Run Test Cases'}</span>
                </button>
              </div>

              <textarea
                className={styles.codeTextarea}
                value={currentCode}
                onChange={(e) => setUserCode({ ...userCode, [currentQ.id]: e.target.value })}
                rows={8}
                spellCheck={false}
              />

              {outputs[currentQ.id] && (
                <div className={styles.outputBox}>
                  <div className={styles.outputTitle}>Terminal Output:</div>
                  <pre className={styles.outputPre}>{outputs[currentQ.id]}</pre>
                </div>
              )}
            </div>

            <div className={styles.submitRow}>
              <button className={styles.finishBtn} onClick={handleFinalSubmit}>
                Finish &amp; Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scorecard Results */}
      {isCompleted && (
        <div className={styles.resultsCard}>
          <div className={styles.scoreHeader}>
            <Award size={28} className={styles.awardIcon} />
            <div>
              <h2>Interview Screening Complete</h2>
              <p>Assessment scorecard for <strong>{track.title}</strong></p>
            </div>
          </div>

          <div className={styles.scoreRow}>
            <div className={styles.scoreMetric}>
              <span className={styles.metricVal}>{score}%</span>
              <span className={styles.metricLabel}>Technical Competency Score</span>
            </div>
            <div className={styles.scoreStatus}>
              {score! >= 70 ? (
                <div className={styles.passLabel}>
                  <CheckCircle2 size={18} />
                  <span>Ready for Interview / Shortlisting</span>
                </div>
              ) : (
                <div className={styles.reviewLabel}>
                  <AlertCircle size={18} />
                  <span>Recommended for Further Practical Revision</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.retryRow}>
            <button className={styles.retryBtn} onClick={handleStartAssessment}>
              Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
