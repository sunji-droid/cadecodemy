import React, { useState } from 'react';
import { MOLEPOLOLE_MYSTERY, MysteryCase } from '../../content/mystery';
import { SQLEngine } from '../../engines';
import { useStore } from '../../lib/store';
import { 
  Search, 
  Database, 
  Terminal, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import styles from './MysteryView.module.css';

const sqlEngine = new SQLEngine();

export const MysteryView: React.FC = () => {
  const mystery = MOLEPOLOLE_MYSTERY;
  const { recordMysterySolved } = useStore();

  const [query, setQuery] = useState(mystery.tables[0].sampleQuery);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryLog, setQueryLog] = useState<{ query: string; time: string }[]>([]);

  // Suspect deductions form
  const [suspectCulprit, setSuspectCulprit] = useState('');
  const [suspectClinic, setSuspectClinic] = useState('');
  const [suspectAccomplice, setSuspectAccomplice] = useState('');
  const [investigationSubmitted, setInvestigationSubmitted] = useState(false);
  const [caseSolved, setCaseSolved] = useState(false);

  const handleRunQuery = async () => {
    setIsExecuting(true);
    const res = await sqlEngine.run(query);
    setIsExecuting(false);
    setOutput(res.stdout || res.stderr || 'No rows returned.');
    
    setQueryLog(prev => [
      { query, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 7)
    ]);
  };

  const handleSolveCase = (e: React.FormEvent) => {
    e.preventDefault();
    setInvestigationSubmitted(true);

    const matchCulprit = suspectCulprit.trim().toLowerCase() === mystery.solution.culprit.toLowerCase();
    const matchClinic = suspectClinic.trim().toLowerCase().includes('thamaga');
    const matchAccomplice = suspectAccomplice.trim().toLowerCase() === mystery.solution.accompliceDriver.toLowerCase();

    if (matchCulprit && matchClinic && matchAccomplice) {
      setCaseSolved(true);
      recordMysterySolved(mystery.id);
    } else {
      setCaseSolved(false);
    }
  };

  return (
    <div className={styles.mysteryContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>HARVARD-STYLE DATABASE CASE STUDY · FIFTYVILLE IN KISWANA</div>
        <h1>{mystery.title}</h1>
        <p className={styles.locationMeta}>
          Incident Site: <strong>{mystery.incidentLocation}</strong> | Time: <strong>{mystery.incidentDate}</strong>
        </p>
        <p className={styles.synopsis}>{mystery.synopsis}</p>
      </header>

      {/* Clues Ribbon */}
      <section className={styles.cluesRibbon}>
        <h3>
          <Search size={18} />
          <span>Forensic Clues at Crime Scene</span>
        </h3>
        <ul>
          {mystery.clues.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <div className={styles.investigationGrid}>
        {/* Left column: Schema & Table Directory */}
        <aside className={styles.schemaPanel}>
          <h3>
            <Database size={16} />
            <span>Forensic Database Tables</span>
          </h3>
          <div className={styles.tableList}>
            {mystery.tables.map((tbl) => (
              <div key={tbl.name} className={styles.tableCard}>
                <div className={styles.tableHead}>
                  <strong>{tbl.name}</strong>
                  <button 
                    className={styles.quickQueryBtn}
                    onClick={() => setQuery(tbl.sampleQuery)}
                  >
                    Query
                  </button>
                </div>
                <p className={styles.tblDesc}>{tbl.description}</p>
                <div className={styles.columnsList}>
                  {tbl.columns.map((col) => (
                    <span key={col} className={styles.colTag}>{col}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right column: Interactive SQL Query Console */}
        <main className={styles.queryConsole}>
          <div className={styles.editorCard}>
            <div className={styles.editorBar}>
              <span className={styles.consoleTitle}>
                <Terminal size={14} />
                <span>Forensic SQL Query Terminal</span>
              </span>
              <button 
                className={styles.runQueryBtn} 
                onClick={handleRunQuery}
                disabled={isExecuting}
              >
                {isExecuting ? 'Querying...' : 'Run Forensic Query'}
              </button>
            </div>
            <textarea
              className={styles.sqlTextarea}
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              spellCheck={false}
            />
            {output && (
              <div className={styles.resultBox}>
                <div className={styles.resultLabel}>Relational Result Table:</div>
                <pre className={styles.resultPre}>{output}</pre>
              </div>
            )}
          </div>

          {/* Investigation Findings Deduction Form */}
          <div className={styles.findingsFormCard}>
            <h3>
              <ShieldCheck size={18} />
              <span>Official Forensic Indictment Submission</span>
            </h3>
            <form onSubmit={handleSolveCase} className={styles.findingsForm}>
              <div className={styles.fieldRow}>
                <label>1. Primary Culprit (Who stole the vaccines?):</label>
                <input
                  type="text"
                  placeholder="e.g. Kgosiemang Tau"
                  value={suspectCulprit}
                  onChange={(e) => setSuspectCulprit(e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldRow}>
                <label>2. Destination Clinic (Where was the shipment redirected?):</label>
                <input
                  type="text"
                  placeholder="e.g. Thamaga Sub-District Clinic"
                  value={suspectClinic}
                  onChange={(e) => setSuspectClinic(e.target.value)}
                  required
                />
              </div>

              <div className={styles.fieldRow}>
                <label>3. Accomplice Driver (Who drove the escape truck?):</label>
                <input
                  type="text"
                  placeholder="e.g. Mpho Molefe"
                  value={suspectAccomplice}
                  onChange={(e) => setSuspectAccomplice(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.submitCaseBtn}>
                Submit Case Indictment (Award 150 XP)
              </button>
            </form>

            {investigationSubmitted && (
              <div className={caseSolved ? styles.solvedBanner : styles.errorBanner}>
                {caseSolved ? (
                  <>
                    <CheckCircle2 size={24} />
                    <div>
                      <h4>CASE CRACKED! FULL INDICTMENT VERIFIED!</h4>
                      <p>You followed the gate logs, cell calls, and dispatch manifests to perfection. 150 XP has been credited to your dossier.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={24} />
                    <div>
                      <h4>Forensic Inconsistency Detected</h4>
                      <p>One or more suspects or destination facilities do not match the evidence trail. Re-query the phone_calls and security_gate_logs tables.</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
