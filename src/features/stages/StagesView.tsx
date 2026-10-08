import React from 'react';
import { STAGES } from '../../types';
import { useStore, getTotalXP, getCurrentStage, getNextStage } from '../../lib/store';
import { Sparkles, CheckCircle2, Lock } from 'lucide-react';
import styles from './StagesView.module.css';

export const StagesView: React.FC = () => {
  const { xpEvents } = useStore();
  const xp = getTotalXP(xpEvents);
  const currentStage = getCurrentStage(xp);
  const nextStage = getNextStage(xp);

  const xpProgress = nextStage
    ? Math.min(100, Math.round(((xp - currentStage.xpNeeded) / (nextStage.xpNeeded - currentStage.xpNeeded)) * 100))
    : 100;

  return (
    <div className={styles.stagesContainer}>
      <header className={styles.header}>
        <h1>Six Stages of Mastery</h1>
        <p className={styles.lead}>
          Advance from total novice to verified architect. Each stage unlocks substantive platform perks and capabilities.
        </p>
      </header>

      {/* Current Progress Banner */}
      <section className={styles.currentCard} style={{ borderLeftColor: currentStage.themeColor }}>
        <div className={styles.currentHeader}>
          <div>
            <div className={styles.currentStageTag}>ACTIVE LEVEL</div>
            <h2>Stage {currentStage.id}: {currentStage.name}</h2>
          </div>
          <div className={styles.xpTotalBox}>
            <span className={styles.xpLabel}>Total Practice XP</span>
            <span className={styles.xpValue}>{xp}</span>
          </div>
        </div>

        {nextStage ? (
          <div className={styles.progressSection}>
            <div className={styles.progressLabels}>
              <span>Progress to Stage {nextStage.id} ({nextStage.name})</span>
              <span>{xp} / {nextStage.xpNeeded} XP</span>
            </div>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${xpProgress}%`, backgroundColor: currentStage.themeColor }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.masterBanner}>
            <Sparkles size={16} />
            <span>Highest Mastery Level Achieved</span>
          </div>
        )}
      </section>

      {/* Grid of All 6 Stages */}
      <section className={styles.stagesGrid}>
        {STAGES.map((s) => {
          const isPassed = xp >= s.xpNeeded;
          const isCurrent = currentStage.id === s.id;

          return (
            <div
              key={s.id}
              className={`${styles.stageCard} ${isCurrent ? styles.activeCard : ''} ${!isPassed ? styles.lockedCard : ''}`}
              style={{ borderTopColor: s.themeColor }}
            >
              <div className={styles.cardTop}>
                <span className={styles.stageNumber} style={{ color: s.themeColor }}>Stage {s.id}</span>
                {isPassed ? (
                  <CheckCircle2 size={16} className={styles.passedIcon} />
                ) : (
                  <Lock size={16} className={styles.lockIcon} />
                )}
              </div>

              <h3 className={styles.stageName}>{s.name}</h3>
              <div className={styles.xpThreshold}>{s.xpNeeded.toLocaleString()} XP Required</div>
              <p className={styles.stageDesc}>{s.description}</p>

              <div className={styles.perkBox}>
                <span className={styles.perkTitle}>Perk Unlocked:</span>
                <span className={styles.perkText}>{s.perkUnlocked}</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
