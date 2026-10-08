import React, { useState } from 'react';
import { REFERENCE_DATA, ReferenceSection, ReferenceSnippet } from '../../content/reference';
import { PythonEngine, SQLEngine, BashEngine } from '../../engines';
import { 
  BookMarked, 
  Search, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Code2, 
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import styles from './ReferenceHubView.module.css';

const pyEngine = new PythonEngine();
const sqlEngine = new SQLEngine();
const bashEngine = new BashEngine();

export const ReferenceHubView: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeSnippetOutput, setActiveSnippetOutput] = useState<Record<string, string>>({});
  const [runningSnippet, setRunningSnippet] = useState<string | null>(null);

  const languages = ['All', 'Python', 'SQL', 'Bash', 'Big-O'];

  const filteredSections = REFERENCE_DATA.filter(sec => {
    if (selectedLang !== 'All' && sec.language !== selectedLang) return false;
    return true;
  }).map(sec => {
    if (!searchQuery.trim()) return sec;
    const q = searchQuery.toLowerCase();
    const matchedItems = sec.items.filter(item => 
      item.syntax.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q) ||
      item.example.toLowerCase().includes(q)
    );
    return { ...sec, items: matchedItems };
  }).filter(sec => sec.items.length > 0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleTestSnippet = async (item: ReferenceSnippet, lang: string, id: string) => {
    if (!item.runnableCode) return;
    setRunningSnippet(id);

    let res;
    if (lang === 'Python') {
      res = await pyEngine.run(item.runnableCode);
    } else if (lang === 'SQL') {
      res = await sqlEngine.run(item.runnableCode);
    } else {
      res = await bashEngine.run(item.runnableCode);
    }

    setRunningSnippet(null);
    setActiveSnippetOutput(prev => ({
      ...prev,
      [id]: res.stdout || res.stderr || 'Executed.'
    }));
  };

  return (
    <div className={styles.refContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>INSTITUTIONAL QUICK REFERENCE · HARVARD CS50 STYLE</div>
        <h1>Computer Science &amp; Engineering Reference Desk</h1>
        <p className={styles.lead}>
          Searchable, copy-pasteable, interactive syntax specifications across Python 3, modern SQL, Linux CLI, and asymptotic Big-O runtime complexities.
        </p>

        {/* Search & Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search syntax, operators, expressions, or complexities (e.g. CTE, Comprehension, O(log n))..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.langPills}>
            {languages.map((lang) => (
              <button
                key={lang}
                className={`${styles.pillBtn} ${selectedLang === lang ? styles.activePill : ''}`}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Reference Sections Grid */}
      <div className={styles.sectionsList}>
        {filteredSections.map((sec) => (
          <div key={sec.id} className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.langBadge}>{sec.language}</span>
              <h2>{sec.title}</h2>
            </div>

            <div className={styles.itemsGrid}>
              {sec.items.map((item, idx) => {
                const itemId = `${sec.id}_${idx}`;
                const output = activeSnippetOutput[itemId];
                const isRunning = runningSnippet === itemId;

                return (
                  <div key={idx} className={styles.itemCard}>
                    <div className={styles.itemTop}>
                      <code className={styles.syntaxCode}>{item.syntax}</code>
                      <button
                        className={styles.copyBtn}
                        onClick={() => handleCopy(item.example, itemId)}
                        title="Copy to clipboard"
                      >
                        {copiedIndex === itemId ? <Check size={14} className={styles.checkIcon} /> : <Copy size={14} />}
                      </button>
                    </div>

                    <p className={styles.explanation}>{item.explanation}</p>

                    <div className={styles.codeSnippetBlock}>
                      <pre>{item.example}</pre>
                    </div>

                    {item.runnableCode && (
                      <div className={styles.runnableArea}>
                        <button
                          className={styles.runInEngineBtn}
                          onClick={() => handleTestSnippet(item, sec.language, itemId)}
                          disabled={isRunning}
                        >
                          <Play size={12} />
                          <span>{isRunning ? 'Evaluating...' : `Execute ${sec.language} in Sandbox`}</span>
                        </button>

                        {output && (
                          <div className={styles.sandboxOutput}>
                            <div className={styles.outputTag}>Output:</div>
                            <pre className={styles.outPre}>{output}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
