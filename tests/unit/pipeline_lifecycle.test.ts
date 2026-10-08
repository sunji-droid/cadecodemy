import { describe, it, expect, beforeEach } from 'vitest';
import { useStore, getTotalXP, getCurrentStage } from '../../src/lib/store';
import { generateVerificationCode, createCertificatePDF } from '../../src/lib/certificates';

describe('End-to-End Pipeline & State Dispatch Audit', () => {
  beforeEach(() => {
    useStore.getState().resetAllProgress();
  });

  it('receives lesson and exercise completion and logs immutable XP events', () => {
    const store = useStore.getState();

    // 1. Complete Python Lesson 1
    store.recordLessonComplete('py_01', 'python');
    let state = useStore.getState();
    expect(state.completedLessons['py_01']).toBe(true);
    expect(getTotalXP(state.xpEvents)).toBe(10);

    // 2. Pass Exercise on first try -> awards 15 XP + 5 XP bonus + triggers 'first_step' badge (+25 XP)
    store.recordExercisePass('py_ex_01', true);
    state = useStore.getState();
    expect(state.completedExercises['py_ex_01']).toBe(true);
    expect(state.firstTryExercises['py_ex_01']).toBe(true);
    expect(state.unlockedBadges['first_step']).toBeDefined();
    expect(getTotalXP(state.xpEvents)).toBe(55); // 10 + 15 + 5 + 25 = 55

    // 3. Complete Quiz (3/3) -> awards 20 XP
    store.recordQuizPass('py_01');
    state = useStore.getState();
    expect(state.completedQuizzes['py_01']).toBe(true);
    expect(getTotalXP(state.xpEvents)).toBe(75);

    // 4. Repeated submission does not duplicate points (anti-gaming rule)
    store.recordLessonComplete('py_01', 'python');
    store.recordExercisePass('py_ex_01', false);
    store.recordQuizPass('py_01');
    state = useStore.getState();
    expect(getTotalXP(state.xpEvents)).toBe(75);
  });

  it('progresses stages faithfully and unlocks perks', () => {
    const store = useStore.getState();

    // Start at Stage 1
    expect(getCurrentStage(0).id).toBe(1);

    // Award 500 XP directly via event log
    store.recordCourseComplete('stats_01');
    store.recordCourseComplete('stats_02');
    store.recordCourseComplete('stats_03');
    store.recordCapstonePass('sql');

    const state = useStore.getState();
    const xp = getTotalXP(state.xpEvents);
    expect(xp).toBeGreaterThanOrEqual(500);

    const stage = getCurrentStage(xp);
    expect(stage.id).toBeGreaterThanOrEqual(2);
    expect(stage.name).toBe('Sprout');
  });

  it('generates cryptographic certificate code and compiles valid PDF binary', async () => {
    const code = generateVerificationCode('python');
    expect(code).toMatch(/^CC-PYTHON-\d{8}-[A-Z0-9]{6}$/);

    const pdfBytes = await createCertificatePDF({
      learnerName: 'Kabo Merapelo Onamile',
      trackOrStageTitle: 'Python for Data & Systems',
      type: 'Track Completion',
      dateStr: 'October 8, 2026',
      verificationCode: code
    });

    expect(pdfBytes.length).toBeGreaterThan(1000);
  });
});
