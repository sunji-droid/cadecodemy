import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { 
  Palette, 
  Eye, 
  Volume2, 
  Globe, 
  Database, 
  Sparkles, 
  Check, 
  RotateCcw,
  Sliders,
  ChevronDown
} from 'lucide-react';
import styles from './SettingsView.module.css';

export const SettingsView: React.FC = () => {
  const { profile, setTheme, setReducedMotion, setProfileName, resetAllProgress } = useStore();
  const [nameInput, setNameInput] = useState(profile.name);
  const [savedNotice, setSavedNotice] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'compact'>('normal');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'tn'>('en');

  // Retractable collapsible sections state
  const [openSection, setOpenSection] = useState<'appearance' | 'accessibility' | 'identity' | 'data'>('appearance');

  const toggleSection = (section: 'appearance' | 'accessibility' | 'identity' | 'data') => {
    setOpenSection(openSection === section ? ('' as any) : section);
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setProfileName(nameInput.trim());
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all progress, XP event logs, and badges? This cannot be undone.')) {
      resetAllProgress();
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>PREFERENCES &amp; SYSTEM CONTROLS</div>
        <h1>Settings &amp; Personalisation</h1>
        <p className={styles.lead}>
          Configure your visual theme, accessibility controls, UI language, and local storage data.
        </p>
      </header>

      <div className={styles.accordionGroup}>
        {/* 1. Retractable Appearance & Theme Dropdown */}
        <div className={styles.accordionItem}>
          <button 
            className={styles.accordionHeader} 
            onClick={() => toggleSection('appearance')}
            aria-expanded={openSection === 'appearance'}
          >
            <div className={styles.headerTitleGroup}>
              <Palette className={styles.sectionIcon} size={20} />
              <div>
                <h3>Visual Theme &amp; Styling</h3>
                <span className={styles.headerSub}>Dark Ink, Warm Paper Light, or High Contrast</span>
              </div>
            </div>
            <ChevronDown className={`${styles.chevron} ${openSection === 'appearance' ? styles.chevronOpen : ''}`} size={20} />
          </button>

          {openSection === 'appearance' && (
            <div className={styles.accordionBody}>
              <div className={styles.themeOptionsGrid}>
                <button
                  className={`${styles.themeOptionCard} ${profile.theme === 'dark' ? styles.themeActive : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className={styles.previewBoxDark} />
                  <div className={styles.themeName}>Dark Ink (Default)</div>
                  <div className={styles.themeDesc}>Engineered for long coding sessions with deep contrast (#0E1116)</div>
                </button>

                <button
                  className={`${styles.themeOptionCard} ${profile.theme === 'light' ? styles.themeActive : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <div className={styles.previewBoxLight} />
                  <div className={styles.themeName}>Warm Paper (Light)</div>
                  <div className={styles.themeDesc}>Tactile, editorial tone inspired by printed technical manuals (#F6F3EC)</div>
                </button>

                <button
                  className={`${styles.themeOptionCard} ${profile.theme === 'high-contrast' ? styles.themeActive : ''}`}
                  onClick={() => setTheme('high-contrast')}
                >
                  <div className={styles.previewBoxHC} />
                  <div className={styles.themeName}>High Contrast</div>
                  <div className={styles.themeDesc}>Pure pitch black (#000000) and vibrant neon outlines for maximum legibility</div>
                </button>
              </div>

              <div className={styles.controlRow}>
                <div>
                  <div className={styles.controlLabel}>Editor Font Size</div>
                  <div className={styles.controlSub}>Adjust monospace font scale in coding sandboxes</div>
                </div>
                <div className={styles.pillGroup}>
                  {(['compact', 'normal', 'large'] as const).map(size => (
                    <button
                      key={size}
                      className={`${styles.pillBtn} ${fontSize === size ? styles.pillActive : ''}`}
                      onClick={() => setFontSize(size)}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Retractable Accessibility & Motion Controls */}
        <div className={styles.accordionItem}>
          <button 
            className={styles.accordionHeader} 
            onClick={() => toggleSection('accessibility')}
            aria-expanded={openSection === 'accessibility'}
          >
            <div className={styles.headerTitleGroup}>
              <Eye className={styles.sectionIcon} size={20} />
              <div>
                <h3>Accessibility &amp; Interaction</h3>
                <span className={styles.headerSub}>Motion reduction, WCAG focus states, and readability</span>
              </div>
            </div>
            <ChevronDown className={`${styles.chevron} ${openSection === 'accessibility' ? styles.chevronOpen : ''}`} size={20} />
          </button>

          {openSection === 'accessibility' && (
            <div className={styles.accordionBody}>
              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.controlLabel}>Reduce Motion (prefers-reduced-motion)</div>
                  <div className={styles.controlSub}>Disables celebration particles, stage ceremony animations, and layout transitions</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className={styles.checkbox}
                />
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <div className={styles.controlLabel}>Interface Language</div>
                  <div className={styles.controlSub}>Select language for navigation and platform headers</div>
                </div>
                <div className={styles.pillGroup}>
                  <button 
                    className={`${styles.pillBtn} ${selectedLanguage === 'en' ? styles.pillActive : ''}`}
                    onClick={() => setSelectedLanguage('en')}
                  >
                    English (Default)
                  </button>
                  <button 
                    className={`${styles.pillBtn} ${selectedLanguage === 'tn' ? styles.pillActive : ''}`}
                    onClick={() => setSelectedLanguage('tn')}
                  >
                    Setswana (Beta)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Retractable Learner Identity & Certification */}
        <div className={styles.accordionItem}>
          <button 
            className={styles.accordionHeader} 
            onClick={() => toggleSection('identity')}
            aria-expanded={openSection === 'identity'}
          >
            <div className={styles.headerTitleGroup}>
              <Sparkles className={styles.sectionIcon} size={20} />
              <div>
                <h3>Learner Identity &amp; Certification Name</h3>
                <span className={styles.headerSub}>Name imprinted on verified PDF certificates</span>
              </div>
            </div>
            <ChevronDown className={`${styles.chevron} ${openSection === 'identity' ? styles.chevronOpen : ''}`} size={20} />
          </button>

          {openSection === 'identity' && (
            <div className={styles.accordionBody}>
              <p className={styles.controlSub}>
                Enter your official name exactly as you wish it to appear on your verified certificates of mastery.
              </p>
              <form onSubmit={handleSaveIdentity} className={styles.nameForm}>
                <input
                  type="text"
                  className={styles.textInput}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Kabo Merapelo Onamile"
                />
                <button type="submit" className={styles.saveBtn}>
                  {savedNotice ? <Check size={16} /> : 'Save Name'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 4. Retractable Data Privacy & Reset */}
        <div className={styles.accordionItem}>
          <button 
            className={styles.accordionHeader} 
            onClick={() => toggleSection('data')}
            aria-expanded={openSection === 'data'}
          >
            <div className={styles.headerTitleGroup}>
              <Database className={styles.sectionIcon} size={20} />
              <div>
                <h3>Data Storage &amp; Privacy</h3>
                <span className={styles.headerSub}>Inspect local storage, offline readiness, and hard reset</span>
              </div>
            </div>
            <ChevronDown className={`${styles.chevron} ${openSection === 'data' ? styles.chevronOpen : ''}`} size={20} />
          </button>

          {openSection === 'data' && (
            <div className={styles.accordionBody}>
              <p className={styles.controlSub}>
                CadeCodemy stores all learning progress, code snippets, and XP logs strictly inside your local browser. No data is transmitted to analytics or advertising servers.
              </p>
              <button className={styles.dangerBtn} onClick={handleResetData}>
                <RotateCcw size={16} />
                <span>Reset All Local Storage Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
