export interface AssessmentQuestion {
  id: string;
  title: string;
  category: 'Algorithms' | 'Data Structures' | 'Databases' | 'Systems & APIs';
  prompt: string;
  starterCode: string;
  solutionCode: string;
  expectedKeywords: string[];
}

export interface AssessmentTrack {
  id: string;
  title: string;
  roleTarget: string; // e.g., "Full-Stack Software Engineer" or "Health Data Informatician"
  durationMinutes: number;
  questions: AssessmentQuestion[];
}

export const MOCK_ASSESSMENTS: AssessmentTrack[] = [
  {
    id: 'swe_core',
    title: 'Software Engineer Technical Screening',
    roleTarget: 'Junior / Mid-Level Software Engineer (BDIH, SmartBots, Tech Hubs)',
    durationMinutes: 25,
    questions: [
      {
        id: 'q1_palindrome',
        title: 'Question 1: In-Place Two-Pointer Validation',
        category: 'Algorithms',
        prompt: 'Implement a function is_clean_palindrome(s) that returns True if the string reads the same backwards (case-insensitive and ignoring whitespace), otherwise False.',
        starterCode: 'def is_clean_palindrome(s):\n    # Write your logic\n    pass\n\nprint(is_clean_palindrome("Race car"))\nprint(is_clean_palindrome("Botswana"))',
        solutionCode: 'def is_clean_palindrome(s):\n    clean = "".join(c.lower() for c in s if c.isalnum())\n    return clean == clean[::-1]\n\nprint(is_clean_palindrome("Race car"))\nprint(is_clean_palindrome("Botswana"))',
        expectedKeywords: ['True', 'False']
      },
      {
        id: 'q2_sql_aggregate',
        title: 'Question 2: Relational Aggregations & Outliers',
        category: 'Databases',
        prompt: 'Query the clinics table to compute the average target_pop and total doses_administered for the "Kweneng" district.',
        starterCode: '-- Write query computing AVG(target_pop) and SUM(doses_administered) for district = "Kweneng"\n',
        solutionCode: 'SELECT AVG(target_pop), SUM(doses_administered) FROM clinics WHERE district = "Kweneng";',
        expectedKeywords: ['SELECT', 'AVG', 'SUM', 'Kweneng']
      }
    ]
  },
  {
    id: 'health_informatics',
    title: 'Health Informatics & M&E Technical Screening',
    roleTarget: 'District M&E Focal Person / Health Data Analyst (DHMT, WHO, MoH)',
    durationMinutes: 30,
    questions: [
      {
        id: 'q1_dhis2_rate',
        title: 'Question 1: Vaccine Coverage Ratio & Anomaly Flags',
        category: 'Systems & APIs',
        prompt: 'Write a Python function calculate_coverage(administered, target) that returns the float percentage rounded to 2 decimals. If administered > target * 1.15, print an anomaly alert flag.',
        starterCode: 'def calculate_coverage(administered, target):\n    # Write logic\n    pass\n\nprint(calculate_coverage(1280, 1500))\nprint(calculate_coverage(2400, 1800))',
        solutionCode: 'def calculate_coverage(administered, target):\n    rate = round((administered / target) * 100, 2)\n    if administered > target * 1.15:\n        print("[ANOMALY] Target exceeded by >15%")\n    return rate\n\nprint(calculate_coverage(1280, 1500))\nprint(calculate_coverage(2400, 1800))',
        expectedKeywords: ['85.33', 'ANOMALY']
      }
    ]
  }
];
