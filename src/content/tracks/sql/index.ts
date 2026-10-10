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
          instruction: 'Write a SQL query that selects all columns from the clinics table using the asterisk (*) wildcard.',
          initialCode: '-- Write a query to select all columns from clinics\n',
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
      explanation: 'The WHERE clause restricts results to rows matching Boolean conditions. Use comparison operators (=, !=, <, >, <=, >=) and text quotes.',
      codeSnippet: 'SELECT facility_name, doses_administered\nFROM clinics\nWHERE doses_administered > 500;',
      exercises: [
        {
          id: 'sql_ex_02',
          instruction: 'Select facility_name and district from clinics, but only for records where district equals "Kweneng".',
          initialCode: '-- Write a query to select facility_name, district from clinics where district = "Kweneng"\n',
          solutionCode: 'SELECT facility_name, district\nFROM clinics\nWHERE district = "Kweneng";',
          hints: ['Start with SELECT facility_name, district', 'Add FROM clinics', 'Add WHERE district = "Kweneng";']
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
      explanation: 'Aggregate functions summarize multiple rows into a single value. GROUP BY groups rows by a column; aggregate functions like SUM() calculate totals per group.',
      codeSnippet: 'SELECT district, COUNT(*) AS count\nFROM clinics\nGROUP BY district;',
      exercises: [
        {
          id: 'sql_ex_03',
          instruction: 'Query the clinics table: select district and calculate SUM(doses_administered) AS total_doses, grouping by district.',
          initialCode: '-- Group clinics by district and compute the SUM of doses_administered as total_doses\n',
          solutionCode: 'SELECT district, SUM(doses_administered) AS total_doses\nFROM clinics\nGROUP BY district;',
          hints: ['SELECT district, SUM(doses_administered) AS total_doses', 'FROM clinics', 'GROUP BY district;']
        }
      ],
      quiz: [
        {
          id: 'sql_q_07',
          question: 'What is the key difference between WHERE and HAVING?',
          options: ['WHERE is for numbers, HAVING is for text', 'WHERE filters before aggregation; HAVING filters aggregated groups', 'HAVING only runs in MySQL', 'WHERE is faster'],
          correctIndex: 1,
          explanation: 'WHERE evaluates row-by-row before grouping, whereas HAVING evaluates after GROUP BY aggregation.'
        },
        {
          id: 'sql_q_08',
          question: 'What does COUNT(DISTINCT column) compute?',
          options: ['Total rows including duplicates', 'The number of unique non-null entries in that column', 'The highest value', 'A random sample'],
          correctIndex: 1,
          explanation: 'COUNT(DISTINCT) deduplicates entries before tallying.'
        },
        {
          id: 'sql_q_09',
          question: 'Can you use an alias created in SELECT inside the WHERE clause?',
          options: ['Always', 'Never in standard SQL, because WHERE executes before SELECT', 'Only with strings', 'Only with JOINs'],
          correctIndex: 1,
          explanation: 'WHERE executes before SELECT creates the alias, causing reference errors in standard SQL.'
        }
      ],
      whyItMatters: 'District health profiles require aggregating hundreds of facility logs into consolidated summary totals.',
      estimatedMinutes: 8
    },
    {
      id: 'sql_04',
      trackId: 'sql',
      order: 4,
      stageNumber: 3,
      title: 'Relational Joins (INNER, LEFT, RIGHT)',
      objective: 'Combine records across multiple related tables using key relationships.',
      explanation: 'Relational databases normalize tables to eliminate redundancy. JOIN clauses stitch related tables back together using matching keys (e.g. facility_id).',
      codeSnippet: 'SELECT c.facility_name, s.batch_number\nFROM clinics c\nJOIN stock s ON c.id = s.facility_id;',
      exercises: [
        {
          id: 'sql_ex_04',
          instruction: 'Join clinics c and logs l on c.id = l.facility_id. Select c.facility_name and l.status.',
          initialCode: '-- Write an INNER JOIN between clinics c and logs l on c.id = l.facility_id\n',
          solutionCode: 'SELECT c.facility_name, l.status\nFROM clinics c\nJOIN logs l ON c.id = l.facility_id;',
          hints: ['SELECT c.facility_name, l.status', 'FROM clinics c JOIN logs l ON c.id = l.facility_id;']
        }
      ],
      quiz: [
        {
          id: 'sql_q_10',
          question: 'What happens to unmatched left-table rows in a LEFT JOIN?',
          options: ['They are excluded', 'They appear in results with NULLs for right-table columns', 'They crash the query', 'They are duplicated'],
          correctIndex: 1,
          explanation: 'LEFT JOIN preserves every row from the left table, filling right-side columns with NULL if unmatched.'
        },
        {
          id: 'sql_q_11',
          question: 'What type of key uniquely identifies a single row in a relational table?',
          options: ['Foreign key', 'Primary key', 'Candidate index', 'Unique hash'],
          correctIndex: 1,
          explanation: 'A Primary Key enforces unique non-null row identification.'
        },
        {
          id: 'sql_q_12',
          question: 'What is a CROSS JOIN?',
          options: ['A join between two databases', 'A Cartesian product pairing every row of table A with every row of table B', 'A join on dates', 'A faster INNER JOIN'],
          correctIndex: 1,
          explanation: 'A CROSS JOIN produces Cartesian multiplication (m × n total rows).'
        }
      ],
      whyItMatters: 'Clinic registers, vaccine stock manifests, and adverse incident reports live in separate tables connected by facility IDs.',
      estimatedMinutes: 9
    },
    {
      id: 'sql_05',
      trackId: 'sql',
      order: 5,
      stageNumber: 4,
      title: 'Subqueries and Common Table Expressions (CTEs)',
      objective: 'Deconstruct complex multi-step analysis into readable WITH statements.',
      explanation: 'A Common Table Expression (CTE) defines a named temporary result set using WITH. It makes nested subqueries far easier to read and maintain.',
      codeSnippet: 'WITH HighCoverage AS (\n  SELECT facility_name, doses_administered\n  FROM clinics\n  WHERE doses_administered > 1000\n)\nSELECT * FROM HighCoverage;',
      exercises: [
        {
          id: 'sql_ex_05',
          instruction: 'Write a CTE named TopClinics that selects facility_name from clinics where doses_administered > 1000. In the final query, SELECT * FROM TopClinics.',
          initialCode: '-- Define WITH TopClinics AS (...) and SELECT * FROM TopClinics\n',
          solutionCode: 'WITH TopClinics AS (\n  SELECT facility_name\n  FROM clinics\n  WHERE doses_administered > 1000\n)\nSELECT * FROM TopClinics;',
          hints: ['Start with WITH TopClinics AS (...)', 'Inside parentheses put SELECT facility_name FROM clinics WHERE doses_administered > 1000', 'Finish with SELECT * FROM TopClinics;']
        }
      ],
      quiz: [
        {
          id: 'sql_q_13',
          question: 'What keyword initiates a Common Table Expression in SQL?',
          options: ['CTE', 'CREATE TEMP', 'WITH', 'DECLARE'],
          correctIndex: 2,
          explanation: 'CTEs begin with the WITH keyword followed by the table alias and query definition.'
        },
        {
          id: 'sql_q_14',
          question: 'Can you reference multiple CTEs in a single query?',
          options: ['No, only one CTE per query', 'Yes, separating definitions with commas after a single WITH', 'Only in Oracle', 'Only with subqueries'],
          correctIndex: 1,
          explanation: 'Multiple CTEs can be defined sequentially separated by commas after one WITH keyword.'
        },
        {
          id: 'sql_q_15',
          question: 'What is the primary architectural advantage of CTEs over nested subqueries?',
          options: ['They run 10x faster always', 'Readability, modular reasoning, and top-down code flow', 'They consume zero memory', 'They bypass permissions'],
          correctIndex: 1,
          explanation: 'CTEs present top-down readable structure compared to deeply nested subqueries.'
        }
      ],
      whyItMatters: 'Epidemiological cohort pipelines and data audit checks require multi-stage data staging before final aggregation.',
      estimatedMinutes: 9
    },
    {
      id: 'sql_06',
      trackId: 'sql',
      order: 6,
      stageNumber: 5,
      title: 'Window Functions (ROW_NUMBER, RANK, LAG)',
      objective: 'Compute running totals and rankings across partitions without collapsing rows.',
      explanation: 'Unlike GROUP BY which collapses rows, Window Functions compute calculations across a set of rows while keeping each original row intact. They use the OVER() clause.',
      codeSnippet: 'SELECT facility_name, doses_administered,\n  ROW_NUMBER() OVER(ORDER BY doses_administered DESC) AS rank_pos\nFROM clinics;',
      exercises: [
        {
          id: 'sql_ex_06',
          instruction: 'Select facility_name, doses_administered, and calculate ROW_NUMBER() OVER(ORDER BY doses_administered DESC) AS rank_num from clinics.',
          initialCode: '-- Compute ROW_NUMBER() OVER (ORDER BY doses_administered DESC) AS rank_num from clinics\n',
          solutionCode: 'SELECT facility_name, doses_administered,\n  ROW_NUMBER() OVER(ORDER BY doses_administered DESC) AS rank_num\nFROM clinics;',
          hints: ['Use ROW_NUMBER() OVER(ORDER BY doses_administered DESC) AS rank_num', 'Include FROM clinics;']
        }
      ],
      quiz: [
        {
          id: 'sql_q_16',
          question: 'Which clause defines the grouping window in a window function?',
          options: ['GROUP BY', 'PARTITION BY', 'WINDOW BY', 'SPLIT BY'],
          correctIndex: 1,
          explanation: 'PARTITION BY divides rows into groups without collapsing them into a single row.'
        },
        {
          id: 'sql_q_17',
          question: 'What function fetches the value of a previous row within an ordered partition?',
          options: ['LEAD()', 'LAG()', 'PREV()', 'PRIOR()'],
          correctIndex: 1,
          explanation: 'LAG() accesses data from a previous row in the partition without a self-join.'
        },
        {
          id: 'sql_q_18',
          question: 'What is the difference between RANK() and DENSE_RANK() upon tied values?',
          options: ['RANK() leaves gaps in sequence; DENSE_RANK() leaves no gaps', 'DENSE_RANK() skips numbers', 'They are identical', 'RANK() is deprecated'],
          correctIndex: 0,
          explanation: 'RANK() skips sequential numbers after ties (1, 1, 3); DENSE_RANK() does not skip (1, 1, 2).'
        }
      ],
      whyItMatters: 'Calculating facility performance rankings and period-over-period temperature drops requires window functions.',
      estimatedMinutes: 10
    }
  ]
};
