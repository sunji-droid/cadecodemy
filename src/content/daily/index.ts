export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  language: 'python' | 'sql' | 'javascript';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  initialCode: string;
  solutionCode: string;
  testInput?: string;
  expectedOutput: string;
  hints: string[];
  xpReward: number;
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc_2026_10_10',
    date: '2026-10-10',
    title: 'Polio Campaign Cold-Chain Alert',
    language: 'python',
    difficulty: 'Easy',
    description: 'During a district vaccination campaign in Molepolole, cold-chain refrigerators must remain between 2°C and 8°C. Write a function check_temp(temp) that returns "ALERT" if temp < 2 or temp > 8, otherwise returns "SAFE".',
    initialCode: 'def check_temp(temp):\n    # Write your logic below\n    pass\n\nprint(check_temp(5))\nprint(check_temp(11))',
    solutionCode: 'def check_temp(temp):\n    if temp < 2 or temp > 8:\n        return "ALERT"\n    return "SAFE"\n\nprint(check_temp(5))\nprint(check_temp(11))',
    expectedOutput: 'SAFE\nALERT',
    hints: ['Check if temp < 2 or temp > 8', 'Return "ALERT" or "SAFE"'],
    xpReward: 30
  },
  {
    id: 'dc_2026_10_11',
    date: '2026-10-11',
    title: 'Find Top 3 Performing Health Posts',
    language: 'sql',
    difficulty: 'Medium',
    description: 'Write a query on the clinics table to select facility_name and doses_administered, sorted by doses_administered descending, limited to the top 3 clinics.',
    initialCode: '-- Select facility_name, doses_administered from clinics ordered desc, limit 3\n',
    solutionCode: 'SELECT facility_name, doses_administered FROM clinics ORDER BY doses_administered DESC LIMIT 3;',
    expectedOutput: 'Molepolole Main Clinic|1280',
    hints: ['Use ORDER BY doses_administered DESC', 'Add LIMIT 3;'],
    xpReward: 35
  },
  {
    id: 'dc_2026_10_12',
    date: '2026-10-12',
    title: 'Calculate National Drop-Out Rate',
    language: 'javascript',
    difficulty: 'Medium',
    description: 'Given dose1 = 1500 and dose2 = 1200, calculate the drop-out percentage: ((dose1 - dose2) / dose1) * 100. Print the result rounded to one decimal place using .toFixed(1).',
    initialCode: 'const dose1 = 1500;\nconst dose2 = 1200;\n// Calculate drop-out rate and log with .toFixed(1)\n',
    solutionCode: 'const dose1 = 1500;\nconst dose2 = 1200;\nconst rate = ((dose1 - dose2) / dose1) * 100;\nconsole.log(rate.toFixed(1));',
    expectedOutput: '20.0',
    hints: ['Calculate ((dose1 - dose2) / dose1) * 100', 'Use console.log(rate.toFixed(1))'],
    xpReward: 35
  }
];

export function getTodayChallenge(): DailyChallenge {
  const today = new Date().toISOString().split('T')[0];
  const found = DAILY_CHALLENGES.find(c => c.date === today);
  return found || DAILY_CHALLENGES[0];
}
