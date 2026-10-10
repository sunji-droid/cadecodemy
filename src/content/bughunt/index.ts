export interface BugHuntLevel {
  id: string;
  title: string;
  language: 'python' | 'sql' | 'javascript';
  difficulty: 'Easy' | 'Medium' | 'Tricky';
  scenario: string;
  buggyCode: string;
  bugLineNumber: number;
  bugExplanation: string;
  fixedCode: string;
  hint: string;
  xpReward: number;
}

export const BUG_HUNT_LEVELS: BugHuntLevel[] = [
  {
    id: 'bug_01_off_by_one',
    title: 'The Silent Off-By-One Index Bug',
    language: 'python',
    difficulty: 'Easy',
    scenario: 'A health facility script is attempting to print every clinic in the list, but it crashes at the end with an IndexError.',
    buggyCode: 'clinics = ["Thamaga", "Molepolole", "Lentsweletau"]\n\n# Bug: Range goes up to len(clinics) + 1\nfor i in range(len(clinics) + 1):\n    print(f"Clinic #{i}: {clinics[i]}")',
    bugLineNumber: 4,
    bugExplanation: 'Python list indexing is 0-based up to len(list) - 1. Using range(len(clinics) + 1) exceeds the maximum bounds and raises an IndexError.',
    fixedCode: 'clinics = ["Thamaga", "Molepolole", "Lentsweletau"]\n\nfor i in range(len(clinics)):\n    print(f"Clinic #{i}: {clinics[i]}")',
    hint: 'Look closely at the range() upper bound on line 4.',
    xpReward: 25
  },
  {
    id: 'bug_02_sql_null_equality',
    title: 'The Invisible NULL Equality Trap',
    language: 'sql',
    difficulty: 'Medium',
    scenario: 'An epidemiological query is trying to find all patients with unrecorded batch numbers, but the query returns 0 rows even though blank records exist.',
    buggyCode: 'SELECT patient_id, vaccine_type\nFROM vaccination_records\nWHERE batch_number = NULL;',
    bugLineNumber: 3,
    bugExplanation: 'In SQL, NULL signifies an unknown state and cannot be evaluated with standard equality (=). Comparing with = NULL always returns UNKNOWN. You must use IS NULL.',
    fixedCode: 'SELECT patient_id, vaccine_type\nFROM vaccination_records\nWHERE batch_number IS NULL;',
    hint: 'How does SQL compare against NULL values on line 3?',
    xpReward: 30
  },
  {
    id: 'bug_03_js_mutation',
    title: 'The Unintended Array Mutation',
    language: 'javascript',
    difficulty: 'Tricky',
    scenario: 'A frontend component wants to display sorted clinic queues without altering the original incoming record order, but the original list is being scrambled.',
    buggyCode: 'const originalQueue = [105, 102, 109, 101];\n\n// Bug: Array.prototype.sort() mutates in place\nconst sortedQueue = originalQueue.sort();\n\nconsole.log("Original:", originalQueue);\nconsole.log("Sorted:", sortedQueue);',
    bugLineNumber: 4,
    bugExplanation: 'Array.prototype.sort() mutates the array in-place. To avoid mutating the original queue, create a shallow copy first using slice() or spread: [...originalQueue].sort().',
    fixedCode: 'const originalQueue = [105, 102, 109, 101];\n\nconst sortedQueue = [...originalQueue].sort();\n\nconsole.log("Original:", originalQueue);\nconsole.log("Sorted:", sortedQueue);',
    hint: 'Does .sort() mutate the original array, or should we copy it first?',
    xpReward: 35
  }
];
