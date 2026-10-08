import React, { useState } from 'react';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { 
  GitPullRequest, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Sparkles, 
  Code,
  ShieldCheck,
  Lock
} from 'lucide-react';
import styles from './CodeReviewView.module.css';

interface ReviewScenario {
  id: string;
  title: string;
  language: string;
  context: string;
  diffCode: string;
  flawsIdentified: { line: number; issue: string; severity: 'Critical' | 'Warning' | 'Style' }[];
  modelCritique: string;
}

const REVIEW_SCENARIOS: ReviewScenario[] = [
  {
    id: 'rev_1',
    title: 'Vaccine Cold-Chain Logger API',
    language: 'Python',
    context: 'Pull Request #42: Automated facility temperature logger for district vaccine fridges.',
    diffCode: `def record_temp(facility_id, temp_celsius):\n    # Bug: mutable default or missing bounds check\n    if temp_celsius < 2.0 or temp_celsius > 8.0:\n        send_alert(facility_id, "Cold chain violation!")\n    db_conn.execute("INSERT INTO logs VALUES (" + facility_id + ", " + temp_celsius + ")")\n    return True`,
    flawsIdentified: [
      { line: 5, issue: 'SQL Injection Vulnerability: String concatenation used for SQL query parameters instead of prepared parameter binding.', severity: 'Critical' },
      { line: 3, issue: 'Missing Exception Handling: Missing try/catch around external alert dispatch.', severity: 'Warning' },
      { line: 1, issue: 'Missing Type Hints: Parameters lack PEP 484 type annotations (facility_id: int, temp_celsius: float).', severity: 'Style' }
    ],
    modelCritique: 'Professional code review audits for security vulnerabilities first. Concatenating parameters into raw SQL strings allows SQL injection attacks. Parameterized queries (? or %s) must always be enforced in health systems.'
  },
  {
    id: 'rev_2',
    title: 'DHIS2 Monthly Indicator Aggregator',
    language: 'SQL',
    context: 'Pull Request #89: National routine immunization summary calculation.',
    diffCode: `SELECT district,\n       COUNT(*) as total_records,\n       SUM(doses) / SUM(target) * 100 as raw_rate\nFROM clinic_reports\nGROUP BY district\nHAVING raw_rate > 80;`,
    flawsIdentified: [
      { line: 3, issue: 'Integer Division Truncation: In standard relational engines like SQLite and Postgres, dividing integers truncates decimal points before multiplication.', severity: 'Critical' },
      { line: 5, issue: 'HAVING alias reference: Some SQL engines do not allow referencing computed column aliases in HAVING without re-stating the aggregate expression.', severity: 'Warning' }
    ],
    modelCritique: 'In relational indicator calculations, always cast integer counts to floating-point numbers (e.g. CAST(doses AS REAL)) prior to division to prevent integer truncation errors.'
  }
];

export const CodeReviewView: React.FC = () => {
  const { xpEvents } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);
  const isUnlocked = stage.id >= 3; // Unlocked at Stage 3 for review

  const [activeScenario, setActiveScenario] = useState<ReviewScenario>(REVIEW_SCENARIOS[0]);
  const [learnerNotes, setLearnerNotes] = useState('');
  const [reviewed, setReviewed] = useState(false);

  if (!isUnlocked) {
    return (
      <div className={styles.lockedContainer}>
        <div className={styles.lockIconBox}>
          <Lock size={36} />
        </div>
        <h2>Peer Code Review Simulation Locked</h2>
        <p>
          The Peer Code Review Mode is unlocked at <strong>Stage 5: Architect (9,000 XP)</strong>.
        </p>
        <p className={styles.lockedSub}>
          Train your critical eye by reviewing production pull requests against strict security, correctness, and style standards.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.reviewContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>STAGE 5 PERK · ARCHITECT CRITIQUE</div>
        <h1>Peer Code Review Simulation</h1>
        <p className={styles.lead}>
          Conduct architectural code reviews on simulated pull requests. Identify vulnerabilities, performance bottlenecks, and style violations.
        </p>
      </header>

      {/* Scenario Selector */}
      <div className={styles.scenarioTabs}>
        {REVIEW_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            className={`${styles.tabBtn} ${activeScenario.id === sc.id ? styles.activeTab : ''}`}
            onClick={() => { setActiveScenario(sc); setReviewed(false); setLearnerNotes(''); }}
          >
            <GitPullRequest size={16} />
            <span>{sc.title} ({sc.language})</span>
          </button>
        ))}
      </div>

      <div className={styles.reviewWorkspace}>
        {/* Pull Request Diff Panel */}
        <div className={styles.diffPanel}>
          <div className={styles.diffHeader}>
            <div className={styles.prMeta}>
              <GitPullRequest size={16} className={styles.prIcon} />
              <span className={styles.prTitle}>{activeScenario.context}</span>
            </div>
            <span className={styles.langTag}>{activeScenario.language}</span>
          </div>

          <pre className={styles.diffPre}>
            {activeScenario.diffCode}
          </pre>

          <div className={styles.critiqueInputBox}>
            <label className={styles.inputLabel}>
              <MessageSquare size={14} />
              <span>Your Architectural Review Notes:</span>
            </label>
            <textarea
              className={styles.notesArea}
              rows={4}
              placeholder="List the security bugs, calculation risks, or style flaws you observe in this code..."
              value={learnerNotes}
              onChange={(e) => setLearnerNotes(e.target.value)}
            />
            <button
              className={styles.submitReviewBtn}
              onClick={() => setReviewed(true)}
              disabled={!learnerNotes.trim()}
            >
              <ShieldCheck size={16} />
              <span>Submit Peer Review &amp; Reveal Faculty Audit</span>
            </button>
          </div>
        </div>

        {/* Faculty Benchmark Analysis */}
        {reviewed && (
          <div className={styles.benchmarkPanel}>
            <div className={styles.benchmarkHeader}>
              <Sparkles size={18} className={styles.sparkleIcon} />
              <h3>Senior Architect Benchmark Audit</h3>
            </div>

            <div className={styles.flawsList}>
              {activeScenario.flawsIdentified.map((flaw, idx) => (
                <div key={idx} className={styles.flawCard}>
                  <div className={styles.flawMeta}>
                    <span className={`${styles.severityBadge} ${styles[flaw.severity.toLowerCase()]}`}>
                      {flaw.severity}
                    </span>
                    <span className={styles.lineTag}>Line {flaw.line}</span>
                  </div>
                  <p className={styles.flawText}>{flaw.issue}</p>
                </div>
              ))}
            </div>

            <div className={styles.modelCritiqueBox}>
              <h4>Architectural Synthesis:</h4>
              <p>{activeScenario.modelCritique}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
