import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_TRACKS, SUPPORTING_COURSES } from '../../content';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { Lock, ArrowRight } from 'lucide-react';
import styles from './TracksView.module.css';

export const TracksView: React.FC = () => {
  const { xpEvents } = useStore();
  const xp = getTotalXP(xpEvents);
  const currentStage = getCurrentStage(xp);
  const supportingCoursesUnlocked = currentStage.id >= 2;

  return (
    <div className={styles.tracksContainer}>
      <header className={styles.header}>
        <h1>Core Tracks &amp; Essential Courses</h1>
        <p className={styles.lead}>
          Progress systematically through five programming languages and professional analytical disciplines.
        </p>
      </header>

      {/* 5 Core Coding Tracks */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Core Coding Languages</h2>
          <span className={styles.sectionCount}>5 Tracks</span>
        </div>

        <div className={styles.grid}>
          {ALL_TRACKS.map((track) => (
            <div key={track.id} className={styles.trackCard} style={{ borderTop: `3px solid ${track.accentColor}` }}>
              <div className={styles.cardHeader}>
                <span className={styles.trackBadge} style={{ color: track.accentColor }}>{track.badge}</span>
                <span className={styles.lessonCount}>{track.lessons.length} Lessons</span>
              </div>
              <h3 className={styles.cardTitle}>{track.title}</h3>
              <p className={styles.cardDesc}>{track.description}</p>
              <div className={styles.cardFooter}>
                <Link to={`/lesson/${track.lessons[0].id}`} className={styles.trackLink}>
                  <span>Explore Track</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8 Essential Supporting Courses */}
      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <div>
            <h2>Essential Supporting Courses</h2>
            <div className={styles.unlockCondition}>
              {supportingCoursesUnlocked ? (
                <span className={styles.unlockedTag}>Unlocked at Stage 2 (Sprout)</span>
              ) : (
                <span className={styles.lockedTag}>
                  <Lock size={13} />
                  <span>Unlocks at Stage 2 (500 XP required)</span>
                </span>
              )}
            </div>
          </div>
          <span className={styles.sectionCount}>8 Courses</span>
        </div>

        <div className={styles.grid}>
          {SUPPORTING_COURSES.map((course) => (
            <div
              key={course.id}
              className={`${styles.courseCard} ${!supportingCoursesUnlocked ? styles.disabledCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.courseBadge}>Course</span>
                <span className={styles.lessonCount}>{course.lessonsCount} Modules</span>
              </div>
              <h3 className={styles.cardTitle}>{course.title}</h3>
              <p className={styles.cardDesc}>{course.description}</p>
              <div className={styles.whyBox}>
                <strong>Why this matters:</strong> {course.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
