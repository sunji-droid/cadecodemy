import React, { useState } from 'react';
import { useStore, getTotalXP, getCurrentStage } from '../lib/store';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  Moon, 
  Sun, 
  Contrast, 
  Sliders, 
  Compass, 
  BookOpen, 
  Award, 
  Terminal, 
  ChevronDown, 
  User, 
  Info,
  ShieldCheck
} from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { xpEvents, currentStreak, profile, setTheme } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

        {/* Retractable Navigation Dropdown Menu */}
        <div className={styles.dropdownContainer}>
          <button 
            className={styles.dropdownToggleBtn}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <span>Navigation Menu</span>
            <ChevronDown size={14} className={`${styles.dropdownChevron} ${dropdownOpen ? styles.dropdownChevronOpen : ''}`} />
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu} onClick={() => setDropdownOpen(false)}>
              <div className={styles.dropdownSectionLabel}>CORE CURRICULUM</div>
              <Link to="/" className={styles.dropdownItem}>
                <Compass size={16} />
                <span>The Learning Path</span>
              </Link>
              <Link to="/tracks" className={styles.dropdownItem}>
                <BookOpen size={16} />
                <span>Tracks &amp; Courses (All 5 Languages)</span>
              </Link>
              <Link to="/playground" className={styles.dropdownItem}>
                <Terminal size={16} />
                <span>Multi-Language Playground</span>
              </Link>

              <div className={styles.dropdownSectionLabel}>PROGRESSION &amp; REWARDS</div>
              <Link to="/stages" className={styles.dropdownItem}>
                <Sparkles size={16} />
                <span>Six Stages &amp; Perks</span>
              </Link>
              <Link to="/badges" className={styles.dropdownItem}>
                <Award size={16} />
                <span>Badges Showcase</span>
              </Link>
              <Link to="/certificates" className={styles.dropdownItem}>
                <ShieldCheck size={16} />
                <span>Download Certificates</span>
              </Link>

              <div className={styles.dropdownSectionLabel}>ACCOUNT &amp; CONTROLS</div>
              <Link to="/profile" className={styles.dropdownItem}>
                <User size={16} />
                <span>Learner Profile</span>
              </Link>
              <Link to="/settings" className={styles.dropdownItem}>
                <Sliders size={16} />
                <span>Settings &amp; Personalisation</span>
              </Link>
              <Link to="/about" className={styles.dropdownItem}>
                <Info size={16} />
                <span>About Kabo Merapelo Onamile</span>
              </Link>
            </div>
          )}
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

        {/* Direct Link to Settings */}
        <Link to="/settings" className={styles.themeBtn} title="System Settings">
          <Sliders size={17} />
        </Link>

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
