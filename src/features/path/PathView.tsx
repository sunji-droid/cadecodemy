import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_TRACKS } from '../../content';
import { useStore } from '../../lib/store';
import { CheckCircle2, Circle, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import styles from './PathView.module.css';

export const PathView: React.FC = () => {
  const { completedLessons } = useStore();
  const currentTrack = ALL_TRACKS[0]; // Python default
  const lessons = currentTrack.lessons;

  return (
    <div className={styles.pathContainer}>
      {/* Daily Ritual / Today's 5 Minutes Card */}
      <section className={styles.dailyCard}>
        <div className={styles.dailyHeader}>
          <div className={styles.dailyBadge}>
            <Sparkles size={14} />
            <span>DAILY RITUAL</span>
          </div>
          <div className={styles.dailyEst}>
            <Clock size={14} />
            <span>5 minutes</span>
          </div>
        </div>

        <div className={styles.dailyContent}>
          <h2>Today&apos;s Focus: Core Syntax &amp; Execution</h2>
          <p>
            Complete one lesson and one exercise to maintain your learning streak and earn your daily XP bonus.
          </p>
        </div>

        <div className={styles.dailyActionRow}>
          <Link to={`/lesson/${lessons[0].id}`} className={styles.startBtn}>
            <span>Begin Lesson 1</span>
            <ArrowRight size={16} />
          </Link>
          <span className={styles.dailySubtext}>No account required · Progress saved automatically</span>
        </div>
      </section>

      {/* The Visual Zig-Zag Learning Path */}
      <section className={styles.pathSection}>
        <div className={styles.pathHeader}>
          <div>
            <h2>The Python Path</h2>
            <p>From first variables to automated pipelines and data frames</p>
          </div>
          <Link to="/tracks" className={styles.switchTrackLink}>
            <BookOpen size={16} />
            <span>View All Tracks</span>
          </Link>
        </div>

        <div className={styles.nodesWrapper}>
          {lessons.map((lesson, index) => {
            const isCompleted = !!completedLessons[lesson.id];
            // Alternate left-center-right zig-zag layout
            const alignment = index % 3 === 0 ? styles.alignLeft : index % 3 === 1 ? styles.alignCenter : styles.alignRight;

            return (
              <div key={lesson.id} className={`${styles.nodeRow} ${alignment}`}>
                <div className={`${styles.lessonNode} ${isCompleted ? styles.completedNode : ''}`}>
                  <div className={styles.nodeHeader}>
                    <span className={styles.nodeStage}>Stage {lesson.stageNumber}</span>
                    <span className={styles.nodeTime}>{lesson.estimatedMinutes}m</span>
                  </div>

                  <h3 className={styles.nodeTitle}>{lesson.title}</h3>
                  <p className={styles.nodeObjective}>{lesson.objective}</p>

                  <div className={styles.nodeFooter}>
                    <Link to={`/lesson/${lesson.id}`} className={styles.nodeLink}>
                      {isCompleted ? (
                        <>
                          <CheckCircle2 size={16} className={styles.checkIcon} />
                          <span>Review Lesson</span>
                        </>
                      ) : (
                        <>
                          <Circle size={16} />
                          <span>Start Lesson</span>
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
