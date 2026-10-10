import React, { useState } from 'react';
import { useStore, getTotalXP, getCurrentStage } from '../../lib/store';
import { downloadPortfolioZip } from '../../lib/portfolioExporter';
import { 
  User, 
  Shield, 
  Moon, 
  Sun, 
  Contrast, 
  RotateCcw, 
  Check,
  Download,
  Code2,
  HardDrive
} from 'lucide-react';
import styles from './ProfileView.module.css';

export const ProfileView: React.FC = () => {
  const {
    profile,
    setProfileName,
    setTheme,
    setReducedMotion,
    xpEvents,
    currentStreak,
    longestStreak,
    freezesAvailable,
    unlockedBadges,
    resetAllProgress
  } = useStore();

  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);
  const [nameInput, setNameInput] = useState(profile.name);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setProfileName(nameInput.trim());
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetAllProgress();
    }
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <h1>Learner Profile &amp; Settings</h1>
        <p className={styles.lead}>
          Manage your certificate recipient identity, visual accessibility preferences, and local data.
        </p>
      </header>

      {/* Profile Overview Card */}
      <section className={styles.overviewCard}>
        <div className={styles.avatarCircle}>
          <User size={32} />
        </div>
        <div className={styles.overviewInfo}>
          <h2>{profile.name}</h2>
          <div className={styles.stageTag}>Stage {stage.id}: {stage.name}</div>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{xp}</span>
            <span className={styles.statLabel}>Total XP</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{currentStreak}d</span>
            <span className={styles.statLabel}>Current Streak</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{longestStreak}d</span>
            <span className={styles.statLabel}>Longest Streak</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{Object.keys(unlockedBadges).length}</span>
            <span className={styles.statLabel}>Badges</span>
          </div>
        </div>
      </section>

      {/* Name on Certificate Form */}
      <section className={styles.settingsSection}>
        <h3>Certificate Legal Name</h3>
        <p className={styles.sectionDesc}>
          This name will appear on all your downloadable Stage and Track completion certificates.
        </p>
        <form onSubmit={handleSaveName} className={styles.nameForm}>
          <input
            type="text"
            className={styles.textInput}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your full name"
          />
          <button type="submit" className={styles.saveBtn}>
            {savedMsg ? <Check size={16} /> : 'Save Name'}
          </button>
        </form>
      </section>

      {/* Theme & Display Preferences */}
      <section className={styles.settingsSection}>
        <h3>Display Theme</h3>
        <div className={styles.themeOptions}>
          <button
            className={`${styles.themeOptionBtn} ${profile.theme === 'dark' ? styles.activeTheme : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={18} />
            <span>Dark Ink (Default)</span>
          </button>
          <button
            className={`${styles.themeOptionBtn} ${profile.theme === 'light' ? styles.activeTheme : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={18} />
            <span>Warm Paper (Light)</span>
          </button>
          <button
            className={`${styles.themeOptionBtn} ${profile.theme === 'high-contrast' ? styles.activeTheme : ''}`}
            onClick={() => setTheme('high-contrast')}
          >
            <Contrast size={18} />
            <span>High Contrast</span>
          </button>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleTitle}>Reduce Motion</div>
            <div className={styles.toggleSub}>Disables animations and celebration transitions</div>
          </div>
          <input
            type="checkbox"
            checked={profile.reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className={styles.checkbox}
          />
        </div>
      </section>

      {/* Export to GitHub Portfolio & Offline Academy Pack */}
      <section className={styles.settingsSection}>
        <h3>Portfolio &amp; Offline Portability</h3>
        <p className={styles.sectionDesc}>
          Export your practical completions into a professional GitHub markdown repository, or download your offline data backup.
        </p>
        <div className={styles.exportGrid}>
          <button 
            type="button" 
            className={styles.exportBtn}
            onClick={() => downloadPortfolioZip(useStore.getState())}
          >
            <Code2 size={18} />
            <div>
              <strong>Export to GitHub Portfolio (README.md)</strong>
              <span>Generates clean Markdown of your passed exercises and verifiable credentials.</span>
            </div>
          </button>

          <button 
            type="button" 
            className={styles.exportBtn}
            onClick={() => {
              const data = JSON.stringify(useStore.getState(), null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'cadecodemy_offline_state_backup.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <HardDrive size={18} />
            <div>
              <strong>Backup Offline State (.json)</strong>
              <span>Preserves your XP events, streaks, and certificates for air-gapped devices.</span>
            </div>
          </button>
        </div>
      </section>

      {/* Local Storage & Reset */}
      <section className={styles.dangerSection}>
        <h3>Data Storage &amp; Privacy</h3>
        <p className={styles.sectionDesc}>
          All progress is stored directly inside your browser storage (localStorage &amp; IndexedDB). No analytics trackers are embedded.
        </p>
        <button className={styles.resetBtn} onClick={handleReset}>
          <RotateCcw size={16} />
          <span>Reset All Local Academy Data</span>
        </button>
      </section>
    </div>
  );
};
