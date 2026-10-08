import React, { useState } from 'react';
import { BADGES } from '../../types';
import { useStore } from '../../lib/store';
import { Award, CheckCircle2, Lock } from 'lucide-react';
import styles from './BadgesView.module.css';

export const BadgesView: React.FC = () => {
  const { unlockedBadges } = useStore();
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Milestones', 'Languages', 'Streaks', 'Craft', 'Curiosity'];

  const filteredBadges = filter === 'All'
    ? BADGES
    : BADGES.filter(b => b.category === filter);

  const totalUnlocked = Object.keys(unlockedBadges).length;

  return (
    <div className={styles.badgesContainer}>
      <header className={styles.header}>
        <div>
          <h1>Achievement Badges</h1>
          <p className={styles.lead}>
            Earn verifiable badges across milestones, languages, streaks, clean craft, and deep curiosity.
          </p>
        </div>
        <div className={styles.statsPill}>
          <Award size={18} className={styles.statsIcon} />
          <span>{totalUnlocked} of {BADGES.length} Unlocked</span>
        </div>
      </header>

      {/* Category filters */}
      <div className={styles.filtersRow}>
        {categories.map((c) => (
          <button
            key={c}
            className={`${styles.filterBtn} ${filter === c ? styles.activeFilter : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className={styles.grid}>
        {filteredBadges.map((badge) => {
          const isUnlocked = !!unlockedBadges[badge.id];

          return (
            <div
              key={badge.id}
              className={`${styles.badgeCard} ${isUnlocked ? styles.unlockedCard : styles.lockedCard}`}
            >
              <div className={styles.iconCircle}>
                {isUnlocked ? (
                  <CheckCircle2 size={24} className={styles.badgeSuccessIcon} />
                ) : (
                  <Lock size={20} className={styles.badgeLockIcon} />
                )}
              </div>

              <div className={styles.badgeInfo}>
                <div className={styles.categoryTag}>{badge.category}</div>
                <h3 className={styles.badgeName}>{badge.name}</h3>
                <p className={styles.badgeDesc}>{badge.description}</p>
              </div>

              <div className={styles.badgeFooter}>
                {isUnlocked ? (
                  <span className={styles.unlockedDate}>
                    Unlocked {new Date(unlockedBadges[badge.id]).toLocaleDateString()}
                  </span>
                ) : (
                  <span className={styles.lockedLabel}>Locked · 25 XP</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
