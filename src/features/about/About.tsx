import React from 'react';
import { ExternalLink, Award, Code, MapPin, Database } from 'lucide-react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <header className={styles.aboutHeader}>
        <div className={styles.badge}>ORIGIN & AUTHORSHIP</div>
        <h1>About CadeCodemy</h1>
        <p className={styles.lead}>
          An independent, free coding and data science academy designed to teach true technical competence without paywalls or distractions.
        </p>
      </header>

      {/* Creator Profile Section with Verified Photograph */}
      <section className={styles.creatorCard}>
        <div className={styles.portraitWrapper}>
          <img
            src="/kabo-onamile.jpg"
            alt="Kabo Merapelo Onamile wearing a blue bucket hat and sunglasses"
            className={styles.portraitImg}
          />
        </div>

        <div className={styles.creatorDetails}>
          <div className={styles.creatorHeader}>
            <div>
              <h2>Kabo Merapelo Onamile</h2>
              <div className={styles.roleTitle}>
                Public Health M&E Specialist · Digital Health & Health Information Systems Developer
              </div>
            </div>
            <div className={styles.locationTag}>
              <MapPin size={16} />
              <span>Molepolole, Botswana</span>
            </div>
          </div>

          <p className={styles.creatorBio}>
            Public health professional specialising in monitoring, evaluation and health information systems, with two years in a district health management team and a track record of building the data systems that the analysis depends on. Led M&E for two rounds of a national polio vaccination campaign across 30 health facilities, including daily DHIS2 report validation. Holds HackerRank certifications in SQL (Advanced) and Software Engineer.
          </p>

          <div className={styles.credentialsRow}>
            <div className={styles.credential}>
              <Database size={16} className={styles.credIcon} />
              <span>HackerRank SQL (Advanced) Certified</span>
            </div>
            <div className={styles.credential}>
              <Code size={16} className={styles.credIcon} />
              <span>HackerRank Software Engineer Certified</span>
            </div>
            <div className={styles.credential}>
              <Award size={16} className={styles.credIcon} />
              <span>Author of me-indicator-toolkit (npm)</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://github.com/sunji-droid"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              <span>GitHub: @sunji-droid</span>
              <ExternalLink size={14} />
            </a>
            <a
              href="https://linkedin.com/in/kabo-onamile"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
            >
              <span>LinkedIn Profile</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy & Architecture */}
      <section className={styles.principlesGrid}>
        <div className={styles.principleCard}>
          <h3>In-Browser Execution</h3>
          <p>
            Your code executes directly in your browser using WebAssembly and sandboxed Web Workers. Your work is not stored on external servers or tracked by third-party analytics.
          </p>
        </div>

        <div className={styles.principleCard}>
          <h3>Free Forever</h3>
          <p>
            No credit card prompts, no trial periods, and no watermarked certificates. Technical education should be accessible to every student and analyst.
          </p>
        </div>

        <div className={styles.principleCard}>
          <h3>Synthetic Real-World Datasets</h3>
          <p>
            Exercises use realistic tables modeled on clinical logs, retail sales, and demographic indicators rather than abstract toy examples.
          </p>
        </div>
      </section>
    </div>
  );
};
