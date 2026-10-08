import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_TRACKS } from '../../content';
import { useStore } from '../../lib/store';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../engines';
import { Play, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './LessonRunner.module.css';

const pyEngine = new PythonEngine();
const sqlEngine = new SQLEngine();
const jsEngine = new JavaScriptEngine();
const bashEngine = new BashEngine();
const rEngine = new REngine();

export const LessonRunner: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const {
    completedLessons,
    completedExercises,
    recordLessonComplete,
    recordExercisePass,
    recordQuizPass
  } = useStore();

  // Find target lesson
  let currentLesson = ALL_TRACKS[0].lessons[0];
  let currentTrack = ALL_TRACKS[0];

  for (const track of ALL_TRACKS) {
    const found = track.lessons.find((l) => l.id === lessonId);
    if (found) {
      currentLesson = found;
      currentTrack = track;
      break;
    }
  }

  const [code, setCode] = useState(currentLesson.codeSnippet);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'exercise' | 'quiz'>('explanation');

  // Exercise State
  const currentExercise = currentLesson.exercises[0];
  const [exerciseCode, setExerciseCode] = useState(currentExercise?.initialCode || '');
  const [exerciseOutput, setExerciseOutput] = useState('');
  const [exercisePassed, setExercisePassed] = useState(!!completedExercises[currentExercise?.id]);
  const [attemptCount, setAttemptCount] = useState(0);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Engine selection based on track
  const executeCode = async (sourceCode: string) => {
    switch (currentTrack.id) {
      case 'python': return await pyEngine.run(sourceCode);
      case 'sql': return await sqlEngine.run(sourceCode);
      case 'javascript': return await jsEngine.run(sourceCode);
      case 'bash': return await bashEngine.run(sourceCode);
      case 'r': return await rEngine.run(sourceCode);
      default: return await jsEngine.run(sourceCode);
    }
  };

  const handleRunDemo = async () => {
    setIsRunning(true);
    const result = await executeCode(code);
    setIsRunning(false);
    setOutput(result.stdout || result.stderr || 'Executed (no output returned).');
  };

  const handleRunExercise = async () => {
    setIsRunning(true);
    setAttemptCount(prev => prev + 1);
    const result = await executeCode(exerciseCode);
    setIsRunning(false);
    const out = result.stdout || result.stderr || '';
    setExerciseOutput(out);

    // Basic pass validation
    if (!result.error && out.trim().length > 0) {
      setExercisePassed(true);
      const isFirstTry = attemptCount === 0;
      recordExercisePass(currentExercise.id, isFirstTry);
      recordLessonComplete(currentLesson.id, currentTrack.id);
    }
  };

  const handleSelectQuiz = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    let allCorrect = true;
    currentLesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] !== q.correctIndex) allCorrect = false;
    });
    if (allCorrect) {
      recordQuizPass(currentLesson.id);
      recordLessonComplete(currentLesson.id, currentTrack.id);
    }
  };

  // Find next lesson
  const currentIdx = currentTrack.lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = currentTrack.lessons[currentIdx + 1];
  const prevLesson = currentTrack.lessons[currentIdx - 1];

  return (
    <div className={styles.lessonContainer}>
      {/* Top Nav & Breadcrumb */}
      <div className={styles.topBar}>
        <Link to="/tracks" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>{currentTrack.title}</span>
        </Link>
        <div className={styles.lessonPaging}>
          Lesson {currentLesson.order} of {currentTrack.lessons.length}
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.badgeRow}>
          <span className={styles.stageTag}>Stage {currentLesson.stageNumber}</span>
          <span className={styles.estTag}>{currentLesson.estimatedMinutes} mins</span>
          {completedLessons[currentLesson.id] && (
            <span className={styles.completedTag}>
              <CheckCircle2 size={13} />
              <span>Completed</span>
            </span>
          )}
        </div>
        <h1>{currentLesson.title}</h1>
        <p className={styles.objectiveText}><strong>Objective:</strong> {currentLesson.objective}</p>
      </header>

      {/* Tabs navigation */}
      <div className={styles.tabsRow}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'explanation' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('explanation')}
        >
          1. Concept &amp; Code
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'exercise' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('exercise')}
        >
          2. Practice Exercise
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'quiz' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          3. Check Understanding
        </button>
      </div>

      {/* Tab 1: Explanation & Interactive Snippet */}
      {activeTab === 'explanation' && (
        <section className={styles.tabContent}>
          <div className={styles.explanationText}>
            <p>{currentLesson.explanation}</p>
          </div>

          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <span className={styles.editorLang}>{currentTrack.badge} Code Cell</span>
              <button
                className={styles.runBtn}
                onClick={handleRunDemo}
                disabled={isRunning}
              >
                <Play size={14} />
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
            <textarea
              className={styles.codeTextarea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={5}
              spellCheck={false}
            />
            {output && (
              <div className={styles.outputBox}>
                <div className={styles.outputTitle}>Output:</div>
                <pre className={styles.outputPre}>{output}</pre>
              </div>
            )}
          </div>

          <div className={styles.whyBox}>
            <strong>Why this matters in practice:</strong> {currentLesson.whyItMatters}
          </div>
        </section>
      )}

      {/* Tab 2: Interactive Exercise */}
      {activeTab === 'exercise' && currentExercise && (
        <section className={styles.tabContent}>
          <div className={styles.exerciseInstruction}>
            <h3>Instructions</h3>
            <p>{currentExercise.instruction}</p>
          </div>

          <div className={styles.editorCard}>
            <div className={styles.editorHeader}>
              <span className={styles.editorLang}>Your Solution</span>
              <button
                className={styles.runBtn}
                onClick={handleRunExercise}
                disabled={isRunning}
              >
                <Play size={14} />
                <span>{isRunning ? 'Checking...' : 'Run & Check'}</span>
              </button>
            </div>
            <textarea
              className={styles.codeTextarea}
              value={exerciseCode}
              onChange={(e) => setExerciseCode(e.target.value)}
              rows={6}
              spellCheck={false}
            />
            {exerciseOutput && (
              <div className={styles.outputBox}>
                <div className={styles.outputTitle}>Execution Output:</div>
                <pre className={styles.outputPre}>{exerciseOutput}</pre>
              </div>
            )}
          </div>

          {exercisePassed && (
            <div className={styles.successBanner}>
              <CheckCircle2 size={18} />
              <span>Exercise Passed! 15 XP awarded.</span>
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Understanding Quiz */}
      {activeTab === 'quiz' && (
        <section className={styles.tabContent}>
          <div className={styles.quizList}>
            {currentLesson.quiz.map((q, qIdx) => (
              <div key={q.id} className={styles.quizCard}>
                <h4 className={styles.quizQuestion}>
                  {qIdx + 1}. {q.question}
                </h4>
                <div className={styles.optionsList}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[qIdx] === optIdx;
                    let optStyle = styles.optionItem;
                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) optStyle += ` ${styles.optionCorrect}`;
                      else if (isSelected) optStyle += ` ${styles.optionWrong}`;
                    } else if (isSelected) {
                      optStyle += ` ${styles.optionSelected}`;
                    }

                    return (
                      <button
                        key={optIdx}
                        className={optStyle}
                        onClick={() => handleSelectQuiz(qIdx, optIdx)}
                      >
                        <span className={styles.optLetter}>{String.fromCharCode(65 + optIdx)}</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className={styles.quizExplanation}>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!quizSubmitted ? (
            <button
              className={styles.submitQuizBtn}
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < currentLesson.quiz.length}
            >
              Submit Quiz Answers
            </button>
          ) : (
            <div className={styles.quizDoneBanner}>
              Quiz completed! Your score has been recorded.
            </div>
          )}
        </section>
      )}

      {/* Navigation to Prev/Next Lesson */}
      <footer className={styles.lessonFooterNav}>
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.id}`} className={styles.prevBtn}>
            <ArrowLeft size={16} />
            <span>Previous: {prevLesson.title}</span>
          </Link>
        ) : <div />}

        {nextLesson && (
          <Link to={`/lesson/${nextLesson.id}`} className={styles.nextBtn}>
            <span>Next: {nextLesson.title}</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </footer>
    </div>
  );
};
