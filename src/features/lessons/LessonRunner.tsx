import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_TRACKS } from '../../content';
import { useStore } from '../../lib/store';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../engines';
import { auditStyle50, Style50Result } from '../../lib/styleAuditor';
import { consultSocraticTutor, DiagnosticQuery } from '../../lib/socraticTutor';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Code2, 
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';
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

  // Find target lesson and track
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

  // Slide state: 1 = Concept & Code, 2 = Practice Exercise, 3 = Quiz Check
  const [currentSlide, setCurrentSlide] = useState<1 | 2 | 3>(1);

  // Demo Code State
  const [code, setCode] = useState(currentLesson.codeSnippet);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  // Exercise State
  const currentExercise = currentLesson.exercises[0];
  const [exerciseCode, setExerciseCode] = useState(currentExercise?.initialCode || '');
  const [exerciseOutput, setExerciseOutput] = useState('');
  const [exercisePassed, setExercisePassed] = useState(!!completedExercises[currentExercise?.id]);
  const [attemptCount, setAttemptCount] = useState(0);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Style & Socratic Diagnostic State
  const [styleAudit, setStyleAudit] = useState<Style50Result | null>(null);
  const [diagnostic, setDiagnostic] = useState<DiagnosticQuery | null>(null);

  const handleAuditStyle = () => {
    const res = auditStyle50(exerciseCode, currentTrack.id);
    setStyleAudit(res);
  };

  const handleConsultTutor = () => {
    const diag = consultSocraticTutor(exerciseCode, exerciseOutput, currentTrack.id);
    setDiagnostic(diag);
  };

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
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);
    const result = await executeCode(exerciseCode);
    setIsRunning(false);
    const out = result.stdout || result.stderr || '';
    setExerciseOutput(out);

    // Validate actual learner input vs starter placeholder
    const isStillStarter = exerciseCode.trim() === (currentExercise.initialCode || '').trim();
    const hasOutput = out.trim().length > 0;
    const noError = !result.error && !result.stderr.toLowerCase().includes('error');

    if (!isStillStarter && noError && hasOutput) {
      setExercisePassed(true);
      recordExercisePass(currentExercise.id, newAttemptCount);
      recordLessonComplete(currentLesson.id, currentTrack.id);
    } else if (isStillStarter) {
      setExercisePassed(false);
      setExerciseOutput("Write your solution in the editor before running. The starter prompt alone does not pass the test.");
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

  // Find next/prev lessons in track
  const currentIdx = currentTrack.lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = currentTrack.lessons[currentIdx + 1];
  const prevLesson = currentTrack.lessons[currentIdx - 1];

  return (
    <div className={styles.lessonContainer}>
      {/* Top Breadcrumb Navigation */}
      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>{currentTrack.badge} Learning Path</span>
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
              <span>Lesson Completed</span>
            </span>
          )}
        </div>
        <h1>{currentLesson.title}</h1>
        <p className={styles.objectiveText}><strong>Objective:</strong> {currentLesson.objective}</p>
      </header>

      {/* Multi-Slide Indicator Header & Carousel Stepper */}
      <div className={styles.carouselHeaderBar}>
        <div className={styles.slideCounter}>
          <span>SLIDE {currentSlide} OF 3</span>
          <span className={styles.slideName}>
            {currentSlide === 1 && '— Concept & Interactive Cell'}
            {currentSlide === 2 && '— Hands-On Exercise'}
            {currentSlide === 3 && '— Knowledge Check Quiz'}
          </span>
        </div>

        {/* Slide Progress Dots / Buttons */}
        <div className={styles.stepperDots}>
          <button
            className={`${styles.stepPill} ${currentSlide === 1 ? styles.stepActive : ''}`}
            onClick={() => setCurrentSlide(1)}
          >
            <BookOpen size={14} />
            <span>1. Concept</span>
          </button>
          <button
            className={`${styles.stepPill} ${currentSlide === 2 ? styles.stepActive : ''}`}
            onClick={() => setCurrentSlide(2)}
          >
            <Code2 size={14} />
            <span>2. Exercise</span>
          </button>
          <button
            className={`${styles.stepPill} ${currentSlide === 3 ? styles.stepActive : ''}`}
            onClick={() => setCurrentSlide(3)}
          >
            <HelpCircle size={14} />
            <span>3. Quiz</span>
          </button>
        </div>
      </div>

      {/* Slide Carousel Stage Area */}
      <div className={styles.slideViewport}>
        {/* SLIDE 1: Concept & Code Cell */}
        {currentSlide === 1 && (
          <div className={styles.slideCard}>
            <div className={styles.slideBadge}>SLIDE 1 · CONCEPT &amp; RUNNER</div>
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
                  <div className={styles.outputTitle}>Execution Output:</div>
                  <pre className={styles.outputPre}>{output}</pre>
                </div>
              )}
            </div>

            <div className={styles.whyBox}>
              <strong>Why this matters in practice:</strong> {currentLesson.whyItMatters}
            </div>

            <div className={styles.slideActionRow}>
              <div />
              <button className={styles.nextSlideBtn} onClick={() => setCurrentSlide(2)}>
                <span>Continue to Exercise (Slide 2)</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 2: Interactive Practice Exercise */}
        {currentSlide === 2 && currentExercise && (
          <div className={styles.slideCard}>
            <div className={styles.slideBadge}>SLIDE 2 · PRACTICE EXERCISE</div>
            <div className={styles.exerciseInstruction}>
              <h3>Exercise Challenge</h3>
              <p>{currentExercise.instruction}</p>
            </div>

            <div className={styles.editorCard}>
              <div className={styles.editorHeader}>
                <span className={styles.editorLang}>Your Solution Workspace</span>
                <div className={styles.academicActions}>
                  <button
                    className={styles.academicBtn}
                    onClick={handleAuditStyle}
                    title="Audit Code Style & PEP Standards"
                  >
                    <ShieldCheck size={13} />
                    <span>Style Audit</span>
                  </button>
                  <button
                    className={styles.academicBtn}
                    onClick={handleConsultTutor}
                    title="Consult Socratic Diagnostic Assistant"
                  >
                    <Compass size={13} />
                    <span>Socratic Diagnostic</span>
                  </button>
                  <button
                    className={styles.runBtn}
                    onClick={handleRunExercise}
                    disabled={isRunning}
                  >
                    <Play size={14} />
                    <span>{isRunning ? 'Checking...' : 'Run & Check'}</span>
                  </button>
                </div>
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
                  <div className={styles.outputTitle}>Test Output:</div>
                  <pre className={styles.outputPre}>{exerciseOutput}</pre>
                </div>
              )}
            </div>

            {/* Academic Style 50 Panel */}
            {styleAudit && (
              <div className={styles.styleAuditPanel}>
                <div className={styles.styleHeader}>
                  <div className={styles.gradeBadge}>
                    Style Grade: <strong>{styleAudit.grade}</strong> ({(styleAudit.score * 100).toFixed(0)}%)
                  </div>
                  <span className={styles.metricsSpan}>
                    Lines: {styleAudit.metrics.lineCount} | Comments: {styleAudit.metrics.commentDensity}%
                  </span>
                </div>
                {styleAudit.recommendations.length > 0 ? (
                  <ul className={styles.recsList}>
                    {styleAudit.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.perfectStyle}>Exemplary code style. Meets institutional readability benchmarks.</p>
                )}
              </div>
            )}

            {/* Socratic Diagnostic Panel */}
            {diagnostic && (
              <div className={styles.diagnosticPanel}>
                <div className={styles.diagHeader}>
                  <Compass size={16} className={styles.diagIcon} />
                  <strong>Socratic Diagnostic Guidance</strong>
                </div>
                <p className={styles.diagHint}>{diagnostic.hint}</p>
                <div className={styles.diagQuestionBox}>
                  <strong>Probing Inquiry:</strong> {diagnostic.probingQuestion}
                </div>
                <div className={styles.conceptsRow}>
                  {diagnostic.relevantConcepts.map((c, i) => (
                    <span key={i} className={styles.conceptPill}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {exercisePassed && (
              <div className={styles.successBanner}>
                <CheckCircle2 size={18} />
                <span>
                  Exercise Passed! {attemptCount <= 1 ? '+20 XP (First Try Perfection!)' : attemptCount === 2 ? '+15 XP awarded' : '+10 XP awarded (Keep practicing!)'}
                </span>
              </div>
            )}

            <div className={styles.slideActionRow}>
              <button className={styles.prevSlideBtn} onClick={() => setCurrentSlide(1)}>
                <ChevronLeft size={18} />
                <span>Back to Concept (Slide 1)</span>
              </button>
              <button className={styles.nextSlideBtn} onClick={() => setCurrentSlide(3)}>
                <span>Go to Quiz (Slide 3)</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 3: Check Understanding Quiz */}
        {currentSlide === 3 && (
          <div className={styles.slideCard}>
            <div className={styles.slideBadge}>SLIDE 3 · KNOWLEDGE CHECK</div>
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
                <Sparkles size={16} />
                <span>Quiz evaluated! Total lesson score recorded.</span>
              </div>
            )}

            <div className={styles.slideActionRow}>
              <button className={styles.prevSlideBtn} onClick={() => setCurrentSlide(2)}>
                <ChevronLeft size={18} />
                <span>Back to Exercise (Slide 2)</span>
              </button>
              {nextLesson && (
                <Link to={`/lesson/${nextLesson.id}`} className={styles.nextSlideBtn} onClick={() => setCurrentSlide(1)}>
                  <span>Advance to Lesson {nextLesson.order}</span>
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lesson Footer Progression Links */}
      <footer className={styles.lessonFooterNav}>
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.id}`} className={styles.prevBtn} onClick={() => setCurrentSlide(1)}>
            <ArrowLeft size={16} />
            <span>Previous: {prevLesson.title}</span>
          </Link>
        ) : <div />}

        {nextLesson && (
          <Link to={`/lesson/${nextLesson.id}`} className={styles.nextBtn} onClick={() => setCurrentSlide(1)}>
            <span>Next: {nextLesson.title}</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </footer>
    </div>
  );
};
