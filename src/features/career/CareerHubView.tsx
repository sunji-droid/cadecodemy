import React, { useState } from 'react';
import { 
  CAREER_BLUEPRINTS, 
  TECHNICAL_INTERVIEWS, 
  CareerTrackItem, 
  InterviewQuestion 
} from '../../content/career';
import { 
  Briefcase, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  Terminal, 
  FileCode2, 
  ChevronRight, 
  HelpCircle, 
  Sparkles,
  ShieldAlert,
  Award
} from 'lucide-react';
import styles from './CareerHubView.module.css';

export const CareerHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprints' | 'interviews'>('blueprints');
  const [selectedBlueprint, setSelectedBlueprint] = useState<CareerTrackItem>(CAREER_BLUEPRINTS[0]);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [learnerInterviewNotes, setLearnerInterviewNotes] = useState<Record<string, string>>({});

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.careerContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>HONORS CAREER SUITE · ZERO-PAYWALL INDUSTRY ADVANTAGE</div>
        <h1>Career &amp; Technical Interview Hub</h1>
        <p className={styles.lead}>
          Surpassing $20,000 corporate bootcamps: complete real-world portfolio architecture blueprints, master distributed system designs, and rehearse senior technical interview screenings.
        </p>

        {/* Tab Switcher */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'blueprints' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('blueprints')}
          >
            <Briefcase size={16} />
            <span>Senior Portfolio Blueprints &amp; System Designs</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'interviews' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('interviews')}
          >
            <Building2 size={16} />
            <span>Technical Screenings &amp; Architectural Q&amp;A</span>
          </button>
        </div>
      </header>

      {/* TAB 1: PORTFOLIO BLUEPRINTS */}
      {activeTab === 'blueprints' && (
        <div className={styles.blueprintLayout}>
          {/* Blueprint Selector list */}
          <div className={styles.blueprintSidebar}>
            {CAREER_BLUEPRINTS.map((bp) => (
              <button
                key={bp.id}
                className={`${styles.bpCard} ${selectedBlueprint.id === bp.id ? styles.activeBpCard : ''}`}
                onClick={() => setSelectedBlueprint(bp)}
              >
                <div className={styles.bpCategory}>{bp.category}</div>
                <div className={styles.bpTitle}>{bp.title}</div>
                <div className={styles.bpSalary}>{bp.salaryBenchmark}</div>
              </button>
            ))}
          </div>

          {/* Blueprint Detailed View */}
          <div className={styles.blueprintDetail}>
            <div className={styles.bpHeader}>
              <div className={styles.bpMeta}>
                <span className={styles.categoryBadge}>{selectedBlueprint.category}</span>
                <span className={styles.salaryBadge}>{selectedBlueprint.salaryBenchmark}</span>
              </div>
              <h2>{selectedBlueprint.title}</h2>
              <p className={styles.bpDesc}>{selectedBlueprint.description}</p>
            </div>

            {/* Core Competencies */}
            <div className={styles.competencyCard}>
              <h3>Key Engineering Competencies (Verified by Employers)</h3>
              <ul className={styles.compList}>
                {selectedBlueprint.keyCompetencies.map((comp, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Production Deliverable Code Blueprint */}
            <div className={styles.codeBlueprintCard}>
              <div className={styles.codeHeader}>
                <span className={styles.codeTitle}>Production Blueprint Architecture Template</span>
              </div>
              <pre className={styles.blueprintPre}>
                {selectedBlueprint.deliverableTemplate}
              </pre>
            </div>

            {/* Senior Evaluation Rubric */}
            <div className={styles.rubricCard}>
              <h3>Senior Engineering Evaluation Rubric</h3>
              <div className={styles.rubricGrid}>
                {selectedBlueprint.rubric.map((r, i) => (
                  <div key={i} className={styles.rubricItem}>
                    <div className={styles.rubricIndex}>Criterion {i + 1}</div>
                    <div className={styles.rubricText}>{r}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL SCREENINGS */}
      {activeTab === 'interviews' && (
        <div className={styles.interviewContainer}>
          <div className={styles.interviewIntro}>
            <h3>Staff &amp; Senior Technical Interview Screenings</h3>
            <p>
              Simulate actual technical interview rounds for high-compensation data engineering and software architecture roles. Draft your response first, then review against the model answer.
            </p>
          </div>

          <div className={styles.interviewList}>
            {TECHNICAL_INTERVIEWS.map((q) => {
              const isRevealed = !!revealedAnswers[q.id];
              return (
                <div key={q.id} className={styles.interviewCard}>
                  <div className={styles.qRoleBadge}>{q.role}</div>
                  <h4 className={styles.qText}>{q.question}</h4>
                  <p className={styles.qContext}>{q.context}</p>

                  <div className={styles.lookoutBox}>
                    <strong>What Technical Evaluators Look For:</strong>
                    <ul>
                      {q.evaluatorLookout.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Learner Draft Response Box */}
                  <div className={styles.userDraftBox}>
                    <label>Your Simulated Technical Response:</label>
                    <textarea
                      rows={3}
                      placeholder="Explain your approach, architectural trade-offs, and technical mechanisms..."
                      value={learnerInterviewNotes[q.id] || ''}
                      onChange={(e) => setLearnerInterviewNotes({ ...learnerInterviewNotes, [q.id]: e.target.value })}
                    />
                  </div>

                  <div className={styles.revealRow}>
                    <button
                      className={styles.revealBtn}
                      onClick={() => toggleAnswer(q.id)}
                    >
                      {isRevealed ? 'Hide Staff Architect Model Answer' : 'Reveal Staff Architect Model Answer'}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className={styles.modelAnswerCard}>
                      <div className={styles.modelAnswerHeader}>
                        <Sparkles size={16} />
                        <span>Staff Architect Benchmark Response</span>
                      </div>
                      <p>{q.sampleModelAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
