import { describe, it, expect, beforeEach } from 'vitest';
import { useStore, getTotalXP, getCurrentStage } from '../../src/lib/store';

describe('Gamification & XP Engine (Stage 2 Rules)', () => {
  beforeEach(() => {
    useStore.getState().resetAllProgress();
  });

  it('starts at 0 XP and Stage 1 (Seedling)', () => {
    const state = useStore.getState();
    const xp = getTotalXP(state.xpEvents);
    expect(xp).toBe(0);
    const stage = getCurrentStage(xp);
    expect(stage.name).toBe('Seedling');
    expect(stage.id).toBe(1);
  });

  it('awards 10 XP on completing a lesson', () => {
    useStore.getState().recordLessonComplete('py_01', 'python');
    const state = useStore.getState();
    expect(state.completedLessons['py_01']).toBe(true);
    const xp = getTotalXP(state.xpEvents);
    expect(xp).toBe(10);

    // Repeated call does not duplicate XP (anti-gaming rule)
    useStore.getState().recordLessonComplete('py_01', 'python');
    expect(getTotalXP(useStore.getState().xpEvents)).toBe(10);
  });

  it('awards 15 XP + 5 bonus for passing exercise on first try', () => {
    useStore.getState().recordExercisePass('ex_py_01', true);
    const state = useStore.getState();
    expect(state.completedExercises['ex_py_01']).toBe(true);
    expect(state.firstTryExercises['ex_py_01']).toBe(true);

    // 15 (pass) + 5 (first try) + 25 (first_step badge unlocked) = 45 XP
    const xp = getTotalXP(state.xpEvents);
    expect(xp).toBe(45);

    // Repeated pass gives no new XP
    useStore.getState().recordExercisePass('ex_py_01', false);
    expect(getTotalXP(useStore.getState().xpEvents)).toBe(45);
  });

  it('progresses through stages as XP accumulates', () => {
    expect(getCurrentStage(0).name).toBe('Seedling');
    expect(getCurrentStage(500).name).toBe('Sprout');
    expect(getCurrentStage(1500).name).toBe('Builder');
    expect(getCurrentStage(4000).name).toBe('Analyst');
    expect(getCurrentStage(9000).name).toBe('Architect');
    expect(getCurrentStage(18000).name).toBe('Master');
  });

  it('handles streak freeze mechanics correctly', () => {
    expect(useStore.getState().freezesAvailable).toBe(1);
    const success = useStore.getState().useStreakFreeze();
    expect(success).toBe(true);
    expect(useStore.getState().freezesAvailable).toBe(0);
    expect(useStore.getState().unlockedBadges['streak_freeze_saved']).toBeDefined();

    // Trying again when zero available fails
    const fail = useStore.getState().useStreakFreeze();
    expect(fail).toBe(false);
  });
});
