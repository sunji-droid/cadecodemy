export type StageId = 1 | 2 | 3 | 4 | 5 | 6;

export interface StageInfo {
  id: StageId;
  name: string;
  xpNeeded: number;
  themeColor: string;
  perkUnlocked: string;
  description: string;
}

export const STAGES: StageInfo[] = [
  {
    id: 1,
    name: 'Seedling',
    xpNeeded: 0,
    themeColor: 'var(--stage-1-sage)',
    perkUnlocked: 'Core lessons & daily streak tracker',
    description: 'Begin your journey through programming and data science foundations.'
  },
  {
    id: 2,
    name: 'Sprout',
    xpNeeded: 500,
    themeColor: 'var(--stage-2-fern)',
    perkUnlocked: 'Code playground with saved snippets & Supporting courses',
    description: 'Experiment freely with Python, SQL, JS, and Bash sandboxes.'
  },
  {
    id: 3,
    name: 'Builder',
    xpNeeded: 1500,
    themeColor: 'var(--stage-3-ember)',
    perkUnlocked: 'Streak freeze protection & Custom profile badge',
    description: 'Protect your practice momentum and construct complete workflows.'
  },
  {
    id: 4,
    name: 'Analyst',
    xpNeeded: 4000,
    themeColor: 'var(--stage-4-ocean)',
    perkUnlocked: 'Synthetic dataset explorer & Practice notebook export',
    description: 'Investigate complex data tables and export your work.'
  },
  {
    id: 5,
    name: 'Architect',
    xpNeeded: 9000,
    themeColor: 'var(--stage-5-dusk)',
    perkUnlocked: 'Advanced capstones & Local peer code review mode',
    description: 'Design robust pipelines and audit code against professional standards.'
  },
  {
    id: 6,
    name: 'Master',
    xpNeeded: 18000,
    themeColor: 'var(--stage-6-gold)',
    perkUnlocked: 'Master certificate eligibility & Master gold theme',
    description: 'Reach the pinnacle of technical and data mastery.'
  }
];

export interface Badge {
  id: string;
  name: string;
  category: 'Milestones' | 'Languages' | 'Streaks' | 'Craft' | 'Curiosity';
  description: string;
  iconName: string;
}

export const BADGES: Badge[] = [
  // Milestones
  { id: 'first_step', name: 'First Line', category: 'Milestones', description: 'Run your first interactive code cell.', iconName: 'Terminal' },
  { id: 'stage_1_done', name: 'Rooted', category: 'Milestones', description: 'Reach Stage 1: Seedling.', iconName: 'Sprout' },
  { id: 'stage_2_done', name: 'Branching Out', category: 'Milestones', description: 'Reach Stage 2: Sprout (500 XP).', iconName: 'TreePine' },
  { id: 'stage_3_done', name: 'Master Mason', category: 'Milestones', description: 'Reach Stage 3: Builder (1,500 XP).', iconName: 'Hammer' },
  { id: 'stage_4_done', name: 'Pattern Finder', category: 'Milestones', description: 'Reach Stage 4: Analyst (4,000 XP).', iconName: 'LineChart' },
  { id: 'stage_5_done', name: 'System Designer', category: 'Milestones', description: 'Reach Stage 5: Architect (9,000 XP).', iconName: 'Cpu' },
  { id: 'stage_6_done', name: 'Grand Master', category: 'Milestones', description: 'Reach Stage 6: Master (18,000 XP).', iconName: 'Crown' },
  { id: 'centurion', name: 'Centurion', category: 'Milestones', description: 'Complete 100 lessons or exercises.', iconName: 'Award' },

  // Languages
  { id: 'python_init', name: 'Python Initiate', category: 'Languages', description: 'Complete 5 Python lessons.', iconName: 'Code' },
  { id: 'python_master', name: 'Python Navigator', category: 'Languages', description: 'Complete the Python Track & Capstone.', iconName: 'FileCode' },
  { id: 'sql_init', name: 'Query Crafter', category: 'Languages', description: 'Complete 5 SQL lessons.', iconName: 'Database' },
  { id: 'sql_master', name: 'Relational Architect', category: 'Languages', description: 'Complete the SQL Track & Capstone.', iconName: 'Table' },
  { id: 'r_init', name: 'Tidy Thinker', category: 'Languages', description: 'Complete 5 R lessons.', iconName: 'BarChart' },
  { id: 'r_master', name: 'Statistical Modeler', category: 'Languages', description: 'Complete the R Track & Capstone.', iconName: 'PieChart' },
  { id: 'js_init', name: 'Script Smith', category: 'Languages', description: 'Complete 5 JavaScript lessons.', iconName: 'Braces' },
  { id: 'js_master', name: 'Full-Spectrum JS', category: 'Languages', description: 'Complete the JavaScript Track & Capstone.', iconName: 'Layers' },
  { id: 'bash_init', name: 'Shell Operator', category: 'Languages', description: 'Complete 5 Bash terminal lessons.', iconName: 'Terminal' },
  { id: 'bash_master', name: 'Terminal Sovereign', category: 'Languages', description: 'Complete the Bash Track & Capstone.', iconName: 'Shield' },

  // Streaks
  { id: 'streak_3', name: 'Consistency Sparks', category: 'Streaks', description: 'Maintain a 3-day learning streak.', iconName: 'Flame' },
  { id: 'streak_7', name: 'Unbroken Week', category: 'Streaks', description: 'Maintain a 7-day learning streak.', iconName: 'Zap' },
  { id: 'streak_14', name: 'Fortnight Habit', category: 'Streaks', description: 'Maintain a 14-day learning streak.', iconName: 'Calendar' },
  { id: 'streak_30', name: 'Monthly Momentum', category: 'Streaks', description: 'Maintain a 30-day learning streak.', iconName: 'Compass' },
  { id: 'streak_freeze_saved', name: 'Ice In Your Veins', category: 'Streaks', description: 'Protect your streak using a streak freeze.', iconName: 'ShieldAlert' },

  // Craft
  { id: 'first_try_ace', name: 'Flawless Execution', category: 'Craft', description: 'Pass 5 exercises on the first attempt.', iconName: 'CheckCircle2' },
  { id: 'quiz_perfectionist', name: 'Quiz Master', category: 'Craft', description: 'Score 100% on 10 quizzes.', iconName: 'CheckCheck' },
  { id: 'speed_demon', name: 'Sharp Mind', category: 'Craft', description: 'Solve an exercise in under 45 seconds.', iconName: 'Clock' },
  { id: 'clean_coder', name: 'Zero Warnings', category: 'Craft', description: 'Submit code with zero syntax errors 10 times in a row.', iconName: 'Sparkles' },

  // Curiosity
  { id: 'explorer_stats', name: 'Inference Seeker', category: 'Curiosity', description: 'Complete the Statistics for Data Work course.', iconName: 'TrendingUp' },
  { id: 'explorer_cleaning', name: 'Sanitation Chief', category: 'Curiosity', description: 'Complete the Data Cleaning & Validation course.', iconName: 'Filter' },
  { id: 'explorer_public_health', name: 'DHIS2 Investigator', category: 'Curiosity', description: 'Complete the Public Health Data Basics course.', iconName: 'Activity' },
  { id: 'polyglot', name: 'The Polyglot', category: 'Curiosity', description: 'Run code in all 5 core languages in the playground.', iconName: 'Globe' }
];

export interface XPEvent {
  id: string;
  type: 'lesson_complete' | 'exercise_pass' | 'first_try_bonus' | 'quiz_pass' | 'streak_day' | 'stage_complete' | 'course_complete' | 'capstone_pass' | 'badge_earned';
  amount: number;
  sourceId: string;
  timestamp: string;
}

export interface Exercise {
  id: string;
  instruction: string;
  initialCode: string;
  solutionCode: string;
  hints: string[];
  expectedOutputRegex?: string;
  customValidator?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  trackId: string;
  order: number;
  title: string;
  stageNumber: number;
  objective: string;
  explanation: string;
  codeSnippet: string;
  exercises: Exercise[];
  quiz: QuizQuestion[];
  whyItMatters: string;
  estimatedMinutes: number;
}

export interface Track {
  id: string;
  title: string;
  badge: string;
  description: string;
  accentColor: string;
  iconName: string;
  lessons: Lesson[];
}

export interface SupportingCourse {
  id: string;
  title: string;
  description: string;
  iconName: string;
  lessonsCount: number;
  whyItMatters: string;
  modules: {
    title: string;
    description: string;
    keyTakeaways: string[];
  }[];
}
