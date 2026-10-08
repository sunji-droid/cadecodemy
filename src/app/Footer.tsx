import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.creditLine}>
          <span className={styles.brandTitle}>CadeCodemy</span> · Created by <strong>Kabo Merapelo Onamile</strong>
        </div>
        <div className={styles.subText}>
          Molepolole, Botswana · From first line to full mastery · Free, offline-ready coding academy
        </div>
        <div className={styles.linksRow}>
          <Link to="/about">About & Creator</Link>
          <span className={styles.divider}>•</span>
          <Link to="/verify">Verify Certificate</Link>
          <span className={styles.divider}>•</span>
          <a href="https://github.com/sunji-droid" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className={styles.divider}>•</span>
          <a href="https://linkedin.com/in/kabo-onamile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};
