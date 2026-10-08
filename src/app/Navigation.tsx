import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  Layers,
  Terminal,
  Award,
  Sparkles,
  FileCheck,
  User,
  Info,
  Database,
  Sliders,
  GitPullRequest,
  Search,
  Binary,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Menu,
  GraduationCap
} from 'lucide-react';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
  // Retractable accordion state for Progression bundle
  const [progressionOpen, setProgressionOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className={styles.desktopSidebar}>
        <NavLink to="/" className={styles.brandLink} title="Return to Learning Path">
          <div className={styles.brandContainer}>
            <div className={styles.logoMark}>
              <span className={styles.logoBracket}>&lt;</span>
              <span className={styles.logoC}>C</span>
              <span className={styles.logoBracket}>/&gt;</span>
            </div>
            <div className={styles.brandMeta}>
              <div className={styles.brandName}>CadeCodemy</div>
              <div className={styles.brandTagline}>From first line to full mastery</div>
            </div>
          </div>
        </NavLink>

        <nav className={styles.navMenu}>
          {/* SECTION 1: CORE LEARNING */}
          <div className={styles.navSectionLabel}>LEARNING PATH</div>
          <NavLink to="/" end className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Compass className={styles.navIcon} size={20} />
            <span>Learning Path</span>
          </NavLink>
          <NavLink to="/tracks" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Layers className={styles.navIcon} size={20} />
            <span>Tracks & Courses</span>
          </NavLink>
          <NavLink to="/playground" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Terminal className={styles.navIcon} size={20} />
            <span>Code Playground</span>
          </NavLink>

          {/* SECTION 2: BUNDLED PROGRESSION & ACADEMIC LABS (BURGER / ACCORDION DROPDOWN) */}
          <div className={styles.bundleSection}>
            <button 
              type="button"
              className={`${styles.bundleToggle} ${progressionOpen ? styles.bundleOpen : ''}`}
              onClick={() => setProgressionOpen(!progressionOpen)}
              aria-expanded={progressionOpen}
              aria-controls="progression-menu"
            >
              <div className={styles.bundleLabelLeft}>
                <Menu className={styles.burgerIcon} size={18} />
                <span className={styles.bundleTitle}>PROGRESSION &amp; LABS</span>
              </div>
              <div className={styles.bundleChevron}>
                {progressionOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </button>

            {/* Dropped down items container */}
            <div 
              id="progression-menu" 
              className={`${styles.bundleContent} ${progressionOpen ? styles.showContent : ''}`}
            >
              <NavLink to="/stages" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <Sparkles className={styles.subNavIcon} size={17} />
                <span>Stages & Perks</span>
              </NavLink>
              <NavLink to="/datasets" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <Database className={styles.subNavIcon} size={17} />
                <span>Datasets (Stage 4)</span>
              </NavLink>
              <NavLink to="/review" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <GitPullRequest className={styles.subNavIcon} size={17} />
                <span>Peer Review (Stage 5)</span>
              </NavLink>
              <NavLink to="/mystery" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <Search className={styles.subNavIcon} size={17} />
                <span>SQL Mystery Case</span>
              </NavLink>
              <NavLink to="/algorithms" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <Binary className={styles.subNavIcon} size={17} />
                <span>Algorithms Lab</span>
              </NavLink>
              <NavLink to="/visualizer" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <BarChart3 className={styles.subNavIcon} size={17} />
                <span>Sorting Visualizer</span>
              </NavLink>
              <NavLink to="/capstone/python" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <GraduationCap className={styles.subNavIcon} size={17} />
                <span>Master Capstones</span>
              </NavLink>
              <NavLink to="/badges" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <Award className={styles.subNavIcon} size={17} />
                <span>Badges</span>
              </NavLink>
              <NavLink to="/certificates" className={({ isActive }) => `${styles.subNavItem} ${isActive ? styles.active : ''}`}>
                <FileCheck className={styles.subNavIcon} size={17} />
                <span>Certificates</span>
              </NavLink>
            </div>
          </div>

          {/* SECTION 3: SYSTEM */}
          <div className={styles.navSectionLabel}>SYSTEM</div>
          <NavLink to="/profile" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <User className={styles.navIcon} size={20} />
            <span>Learner Profile</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Sliders className={styles.navIcon} size={20} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Info className={styles.navIcon} size={20} />
            <span>About & Creator</span>
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar (WCAG 44px min tap targets) */}
      <nav className={styles.mobileBottomNav} aria-label="Mobile Navigation">
        <NavLink to="/" end className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileActive : ''}`}>
          <Compass size={22} />
          <span>Path</span>
        </NavLink>
        <NavLink to="/tracks" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileActive : ''}`}>
          <Layers size={22} />
          <span>Tracks</span>
        </NavLink>
        <NavLink to="/playground" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileActive : ''}`}>
          <Terminal size={22} />
          <span>Play</span>
        </NavLink>
        <NavLink to="/stages" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileActive : ''}`}>
          <Sparkles size={22} />
          <span>Stages</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `${styles.mobileNavItem} ${isActive ? styles.mobileActive : ''}`}>
          <User size={22} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </>
  );
};
