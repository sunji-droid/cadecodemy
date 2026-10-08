import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { XPEvent, STAGES, StageInfo } from '../types';

export interface UserProfile {
  name: string;
  theme: 'dark' | 'light' | 'high-contrast';
  reducedMotion: boolean;
  locale: string;
  createdAt: string;
}

export interface ProgressState {
  completedLessons: Record<string, boolean>; // lessonId -> true
  completedExercises: Record<string, boolean>; // exerciseId -> true
  completedQuizzes: Record<string, boolean>; // lessonId -> true
  firstTryExercises: Record<string, boolean>;
  unlockedBadges: Record<string, string>; // badgeId -> timestamp
  completedCourses: Record<string, boolean>; // courseId -> true
  completedTracks: Record<string, boolean>; // trackId -> true
  
  // XP Event log (Derived state, append-only to prevent drift)
  xpEvents: XPEvent[];

  // Streak state
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  freezesAvailable: number;

  // Profile
  profile: UserProfile;

  // Actions
  setProfileName: (name: string) => void;
  setTheme: (theme: 'dark' | 'light' | 'high-contrast') => void;
  setReducedMotion: (val: boolean) => void;
  recordLessonComplete: (lessonId: string, trackId: string) => void;
  recordExercisePass: (exerciseId: string, firstTry: boolean) => void;
  recordQuizPass: (lessonId: string) => void;
  recordStreakDay: () => void;
  useStreakFreeze: () => boolean;
  recordCourseComplete: (courseId: string) => void;
  recordCapstonePass: (trackId: string) => void;
  unlockBadge: (badgeId: string) => void;
  resetAllProgress: () => void;
}

export const useStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      completedExercises: {},
      completedQuizzes: {},
      firstTryExercises: {},
      unlockedBadges: {},
      completedCourses: {},
      completedTracks: {},
      xpEvents: [],
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      freezesAvailable: 1,
      profile: {
        name: 'Learner',
        theme: 'dark',
        reducedMotion: false,
        locale: 'en',
        createdAt: new Date().toISOString()
      },

      setProfileName: (name: string) =>
        set((state) => ({ profile: { ...state.profile, name } })),

      setTheme: (theme: 'dark' | 'light' | 'high-contrast') => {
        document.documentElement.setAttribute('data-theme', theme);
        set((state) => ({ profile: { ...state.profile, theme } }));
      },

      setReducedMotion: (reducedMotion: boolean) =>
        set((state) => ({ profile: { ...state.profile, reducedMotion } })),

      recordLessonComplete: (lessonId: string, _trackId: string) => {
        const state = get();
        if (state.completedLessons[lessonId]) return;

        const newEvent: XPEvent = {
          id: `xp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          type: 'lesson_complete',
          amount: 10,
          sourceId: lessonId,
          timestamp: new Date().toISOString()
        };

        set({
          completedLessons: { ...state.completedLessons, [lessonId]: true },
          xpEvents: [...state.xpEvents, newEvent]
        });

        // Trigger streak check
        get().recordStreakDay();
      },

      recordExercisePass: (exerciseId: string, firstTry: boolean) => {
        const state = get();
        if (state.completedExercises[exerciseId]) return;

        const events: XPEvent[] = [
          {
            id: `xp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            type: 'exercise_pass',
            amount: 15,
            sourceId: exerciseId,
            timestamp: new Date().toISOString()
          }
        ];

        if (firstTry) {
          events.push({
            id: `xp_${Date.now()}_ft_${Math.random().toString(36).substring(2, 6)}`,
            type: 'first_try_bonus',
            amount: 5,
            sourceId: exerciseId,
            timestamp: new Date().toISOString()
          });
        }

        set({
          completedExercises: { ...state.completedExercises, [exerciseId]: true },
          firstTryExercises: firstTry
            ? { ...state.firstTryExercises, [exerciseId]: true }
            : state.firstTryExercises,
          xpEvents: [...state.xpEvents, ...events]
        });

        // Check first step badge
        if (!state.unlockedBadges['first_step']) {
          get().unlockBadge('first_step');
        }
      },

      recordQuizPass: (lessonId: string) => {
        const state = get();
        if (state.completedQuizzes[lessonId]) return;

        const newEvent: XPEvent = {
          id: `xp_${Date.now()}_quiz_${Math.random().toString(36).substring(2, 6)}`,
          type: 'quiz_pass',
          amount: 20,
          sourceId: lessonId,
          timestamp: new Date().toISOString()
        };

        set({
          completedQuizzes: { ...state.completedQuizzes, [lessonId]: true },
          xpEvents: [...state.xpEvents, newEvent]
        });
      },

      recordStreakDay: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        if (state.lastActiveDate === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        let newStreak = 1;

        if (state.lastActiveDate === yesterday) {
          newStreak = state.currentStreak + 1;
        } else if (state.lastActiveDate && state.freezesAvailable > 0) {
          // Used freeze automatically or kept streak alive
          newStreak = state.currentStreak;
        }

        const streakBonus = Math.min(newStreak, 7) * 5;
        const newEvent: XPEvent = {
          id: `xp_${Date.now()}_streak_${Math.random().toString(36).substring(2, 6)}`,
          type: 'streak_day',
          amount: streakBonus,
          sourceId: today,
          timestamp: new Date().toISOString()
        };

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, state.longestStreak),
          lastActiveDate: today,
          xpEvents: [...state.xpEvents, newEvent]
        });

        if (newStreak >= 3) get().unlockBadge('streak_3');
        if (newStreak >= 7) get().unlockBadge('streak_7');
      },

      useStreakFreeze: () => {
        const state = get();
        if (state.freezesAvailable <= 0) return false;
        set({ freezesAvailable: state.freezesAvailable - 1 });
        get().unlockBadge('streak_freeze_saved');
        return true;
      },

      recordCourseComplete: (courseId: string) => {
        const state = get();
        if (state.completedCourses[courseId]) return;

        const event: XPEvent = {
          id: `xp_${Date.now()}_course_${Math.random().toString(36).substring(2, 6)}`,
          type: 'course_complete',
          amount: 150,
          sourceId: courseId,
          timestamp: new Date().toISOString()
        };

        set({
          completedCourses: { ...state.completedCourses, [courseId]: true },
          xpEvents: [...state.xpEvents, event]
        });
      },

      recordCapstonePass: (trackId: string) => {
        const state = get();
        if (state.completedTracks[trackId]) return;

        const event: XPEvent = {
          id: `xp_${Date.now()}_capstone_${Math.random().toString(36).substring(2, 6)}`,
          type: 'capstone_pass',
          amount: 200,
          sourceId: trackId,
          timestamp: new Date().toISOString()
        };

        set({
          completedTracks: { ...state.completedTracks, [trackId]: true },
          xpEvents: [...state.xpEvents, event]
        });
      },

      unlockBadge: (badgeId: string) => {
        const state = get();
        if (state.unlockedBadges[badgeId]) return;

        const event: XPEvent = {
          id: `xp_${Date.now()}_badge_${Math.random().toString(36).substring(2, 6)}`,
          type: 'badge_earned',
          amount: 25,
          sourceId: badgeId,
          timestamp: new Date().toISOString()
        };

        set({
          unlockedBadges: { ...state.unlockedBadges, [badgeId]: new Date().toISOString() },
          xpEvents: [...state.xpEvents, event]
        });
      },

      resetAllProgress: () => {
        set({
          completedLessons: {},
          completedExercises: {},
          completedQuizzes: {},
          firstTryExercises: {},
          unlockedBadges: {},
          completedCourses: {},
          completedTracks: {},
          xpEvents: [],
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          freezesAvailable: 1
        });
      }
    }),
    {
      name: 'cadecodemy-v1-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// Derivation helper functions
export function getTotalXP(events: XPEvent[]): number {
  return events.reduce((sum, evt) => sum + evt.amount, 0);
}

export function getCurrentStage(xp: number): StageInfo {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (xp >= STAGES[i].xpNeeded) {
      return STAGES[i];
    }
  }
  return STAGES[0];
}

export function getNextStage(xp: number): StageInfo | null {
  for (let i = 0; i < STAGES.length; i++) {
    if (xp < STAGES[i].xpNeeded) {
      return STAGES[i];
    }
  }
  return null;
}
