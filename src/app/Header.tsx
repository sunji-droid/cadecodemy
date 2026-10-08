import React from 'react';
import { useStore, getTotalXP, getCurrentStage } from '../lib/store';
import { Flame, Sparkles, Moon, Sun, Contrast } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { xpEvents, currentStreak, profile, setTheme } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);

  const cycleTheme = () => {
    if (profile.theme === 'dark') setTheme('light');
    else if (profile.theme === 'light') setTheme('high-contrast');
    else setTheme('dark');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.stageChip} style={{ borderColor: stage.themeColor }}>
          <Sparkles size={14} style={{ color: stage.themeColor }} />
          <span className={styles.stageName}>Stage {stage.id}: {stage.name}</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        {/* Streak Indicator */}
        <div className={styles.metricPill} title={`${currentStreak} day learning streak`}>
          <Flame size={18} className={styles.streakFlame} />
          <span className={styles.metricValue}>{currentStreak}</span>
          <span className={styles.metricLabel}>streak</span>
        </div>

        {/* Total Points XP */}
        <div className={styles.metricPill} title={`${xp} Total XP earned`}>
          <span className={styles.xpBadge}>XP</span>
          <span className={styles.metricValue}>{xp}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className={styles.themeBtn}
          onClick={cycleTheme}
          aria-label={`Toggle theme (currently ${profile.theme})`}
        >
          {profile.theme === 'dark' && <Moon size={18} />}
          {profile.theme === 'light' && <Sun size={18} />}
          {profile.theme === 'high-contrast' && <Contrast size={18} />}
        </button>
      </div>
    </header>
  );
};
