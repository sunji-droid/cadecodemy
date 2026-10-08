import React from 'react';
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
  ShieldAlert,
  Search
} from 'lucide-react';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
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

          <div className={styles.navSectionLabel}>PROGRESSION</div>
          <NavLink to="/stages" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Sparkles className={styles.navIcon} size={20} />
            <span>Stages & Perks</span>
          </NavLink>
          <NavLink to="/datasets" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Database className={styles.navIcon} size={20} />
            <span>Datasets (Stage 4)</span>
          </NavLink>
          <NavLink to="/review" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <GitPullRequest className={styles.navIcon} size={20} />
            <span>Peer Review (Stage 5)</span>
          </NavLink>
          <NavLink to="/mystery" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Search className={styles.navIcon} size={20} />
            <span>SQL Mystery Case</span>
          </NavLink>
          <NavLink to="/capstone/python" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Award className={styles.navIcon} size={20} />
            <span>Master Capstones</span>
          </NavLink>
          <NavLink to="/badges" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <Award className={styles.navIcon} size={20} />
            <span>Badges</span>
          </NavLink>
          <NavLink to="/certificates" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
            <FileCheck className={styles.navIcon} size={20} />
            <span>Certificates</span>
          </NavLink>

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
