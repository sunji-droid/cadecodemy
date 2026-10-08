import { Track } from '../../../types';

export const sqlTrack: Track = {
  id: 'sql',
  title: 'SQL & Relational Analytics',
  badge: 'SQL',
  description: 'Master declarative database queries: filtering, joins, aggregations, CTEs, and window functions.',
  accentColor: '#F26419',
  iconName: 'Database',
  lessons: [
    {
      id: 'sql_01',
      trackId: 'sql',
      order: 1,
      stageNumber: 1,
      title: 'SELECT and FROM',
      objective: 'Retrieve specific columns and table records with SQL queries.',
      explanation: 'SQL is declarative: you describe what data you want rather than prescribing how to fetch it. SELECT chooses columns; FROM specifies the target table.',
      codeSnippet: 'SELECT facility_name, target_pop\nFROM clinics;',
      exercises: [
        {
          id: 'sql_ex_01',
          instruction: 'Select all columns from the clinics table using the asterisk (*).',
          initialCode: 'SELECT * FROM clinics;',
          solutionCode: 'SELECT * FROM clinics;',
          hints: ['Use SELECT *', 'Specify FROM clinics;']
        }
      ],
      quiz: [
        {
          id: 'sql_q_01',
          question: 'What does the asterisk (*) represent in a SELECT statement?',
          options: ['Only numeric columns', 'All columns in the table', 'Only primary keys', 'The first row'],
          correctIndex: 1,
          explanation: 'The asterisk wildcard selects all columns present in the queried table.'
        },
        {
          id: 'sql_q_02',
          question: 'Which clause defines the table source in a basic query?',
          options: ['WHERE', 'FROM', 'SOURCE', 'TABLE'],
          correctIndex: 1,
          explanation: 'FROM designates the table or view being queried.'
        },
        {
          id: 'sql_q_03',
          question: 'Is SQL keyword capitalization strictly enforced by relational database engines?',
          options: ['Yes, queries fail if lowercase', 'No, SQL is case-insensitive, but uppercase is convention', 'Only on Linux', 'Only for table names'],
          correctIndex: 1,
          explanation: 'Standard SQL keywords are case-insensitive, though uppercase conventions improve clarity.'
        }
      ],
      whyItMatters: 'Every relational report begins with choosing the precise fields needed for analysis.',
      estimatedMinutes: 5
    },
    {
      id: 'sql_02',
      trackId: 'sql',
      order: 2,
      stageNumber: 1,
      title: 'Filtering Rows with WHERE',
      objective: 'Filter rows based on exact matches, thresholds, and logical operators.',
      explanation: 'The WHERE clause restricts results to rows matching Boolean conditions. Use comparison operators (=, !=, <, >, <=, >=) and combine them with AND and OR.',
      codeSnippet: 'SELECT facility_name, doses_administered\nFROM clinics\nWHERE doses_administered > 500;',
      exercises: [
        {
          id: 'sql_ex_02',
          instruction: 'Select all clinics where district equals "Kweneng".',
          initialCode: 'SELECT facility_name, district\nFROM clinics\nWHERE district = "Kweneng";',
          solutionCode: 'SELECT facility_name, district\nFROM clinics\nWHERE district = "Kweneng";',
          hints: ['Use WHERE district = "Kweneng"', 'Check column spelling']
        }
      ],
      quiz: [
        {
          id: 'sql_q_04',
          question: 'How do you check for missing/null values in SQL?',
          options: ['column == NULL', 'column = NULL', 'column IS NULL', 'column IS EMPTY'],
          correctIndex: 2,
          explanation: 'NULL represents unknown state; use IS NULL or IS NOT NULL instead of equality.'
        },
        {
          id: 'sql_q_05',
          question: 'Which clause filters rows before aggregation occurs?',
          options: ['HAVING', 'WHERE', 'LIMIT', 'FILTER'],
          correctIndex: 1,
          explanation: 'WHERE filters individual records prior to GROUP BY aggregation.'
        },
        {
          id: 'sql_q_06',
          question: 'What does the LIKE operator do?',
          options: ['Compares integers', 'Performs pattern matching on strings', 'Finds similar column types', 'Orders rows'],
          correctIndex: 1,
          explanation: 'LIKE matches text patterns with wildcards such as % and _.'
        }
      ],
      whyItMatters: 'Filtering isolates priority clinics, non-reporting facilities, and anomalies in large operational tables.',
      estimatedMinutes: 6
    },
    {
      id: 'sql_03',
      trackId: 'sql',
      order: 3,
      stageNumber: 2,
      title: 'Aggregation with GROUP BY and HAVING',
      objective: 'Calculate summary metrics (COUNT, SUM, AVG) grouped by categories.',
      explanation: 'Aggregate functions summarize multiple rows into a single scalar value. GROUP BY divides data into groups; HAVING filters groups after aggregation.',
      codeSnippet: 'SELECT district, COUNT(*) AS facility_count, SUM(doses_administered) AS total_doses\nFROM clinics\nGROUP BY district\nHAVING total_doses > 1000;',
      exercises: [
        {
          id: 'sql_ex_03',
          instruction: 'Group clinics by district and calculate the total doses administered.',
          initialCode: 'SELECT district, SUM(doses_administered) AS total_doses\nFROM clinics\nGROUP BY district;',
          solutionCode: 'SELECT district, SUM(doses_administered) AS total_doses\nFROM clinics\nGROUP BY district;',
          hints: ['Use SUM(doses_administered)', 'Add GROUP BY district']
        }
      ],
      quiz: [
        {
          id: 'sql_q_07',
          question: 'What is the key difference between WHERE and HAVING?',
          options: ['WHERE filters rows; HAVING filters aggregated groups', 'HAVING runs first', 'WHERE cannot use strings', 'There is no difference'],
          correctIndex: 0,
          explanation: 'WHERE filters records before aggregation; HAVING filters groups created by GROUP BY.'
        },
        {
          id: 'sql_q_08',
          question: 'What function counts non-null records in a column?',
          options: ['TOTAL()', 'COUNT()', 'ROWS()', 'NUMBER()'],
          correctIndex: 1,
          explanation: 'COUNT(column) counts the number of non-null entries.'
        },
        {
          id: 'sql_q_09',
          question: 'Can you use aggregate functions in the WHERE clause?',
          options: ['Yes, always', 'No, use HAVING for aggregated conditions', 'Only in SQLite', 'Only with numbers'],
          correctIndex: 1,
          explanation: 'Aggregates are evaluated after WHERE, so they cannot be tested in WHERE.'
        }
      ],
      whyItMatters: 'National and district indicators aggregate facility tallies into official coverage summaries.',
      estimatedMinutes: 8
    }
  ]
};
