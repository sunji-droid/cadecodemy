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
    },
    {
      id: 'sql_04',
      trackId: 'sql',
      order: 4,
      stageNumber: 2,
      title: 'Relational Joins: INNER and LEFT JOIN',
      objective: 'Connect multiple tables using shared keys without duplicating rows.',
      explanation: 'Relational databases store related concepts across normalized tables. INNER JOIN matches rows where keys exist in both tables; LEFT JOIN preserves all left-hand records even when right-hand matches are absent.',
      codeSnippet: 'SELECT c.facility_name, s.item, s.quantity\nFROM clinics c\nJOIN sales s ON c.id = s.order_id;',
      exercises: [
        {
          id: 'sql_ex_04',
          instruction: 'Perform an INNER JOIN between clinics and sales on clinic id and sales order_id.',
          initialCode: 'SELECT c.facility_name, s.item\nFROM clinics c\nINNER JOIN sales s ON c.id = s.order_id;',
          solutionCode: 'SELECT c.facility_name, s.item\nFROM clinics c\nINNER JOIN sales s ON c.id = s.order_id;',
          hints: ['Use INNER JOIN sales s ON c.id = s.order_id', 'Run and check result']
        }
      ],
      quiz: [
        {
          id: 'sql_q_10',
          question: 'What rows does a LEFT JOIN keep if there is no match in the right table?',
          options: ['It drops the left row', 'It preserves the left row and fills right columns with NULL', 'It produces a syntax error', 'It keeps only the right row'],
          correctIndex: 1,
          explanation: 'LEFT JOIN retains all rows from the primary left table, replacing unmatched foreign columns with NULL.'
        },
        {
          id: 'sql_q_11',
          question: 'How do you perform an anti-join to find unmatched records?',
          options: ['ANTI JOIN table', 'LEFT JOIN with WHERE right.id IS NULL', 'FULL JOIN only', 'EXCLUDE WHERE'],
          correctIndex: 1,
          explanation: 'A LEFT JOIN coupled with WHERE foreign_key IS NULL identifies records missing from the counterpart table.'
        },
        {
          id: 'sql_q_12',
          question: 'What happens if the join condition is omitted in a query?',
          options: ['The database defaults to primary key', 'A Cartesian product (CROSS JOIN) of all row combinations is produced', 'The query returns empty', 'It creates an index'],
          correctIndex: 1,
          explanation: 'Omitting ON conditions multiplies every left row by every right row, creating an expensive Cartesian product.'
        }
      ],
      whyItMatters: 'Matching facility registers with inventory logs identifies which sites have never received cold-chain supplies.',
      estimatedMinutes: 8
    },
    {
      id: 'sql_05',
      trackId: 'sql',
      order: 5,
      stageNumber: 3,
      title: 'Common Table Expressions (WITH / CTE)',
      objective: 'Structure readable multi-stage queries using CTE blocks.',
      explanation: 'A Common Table Expression (CTE) defines a named temporary result set with the WITH keyword. CTEs simplify complex queries by breaking calculations into sequential steps.',
      codeSnippet: 'WITH DistrictStats AS (\n  SELECT district, SUM(doses_administered) AS total_doses\n  FROM clinics\n  GROUP BY district\n)\nSELECT district, total_doses\nFROM DistrictStats\nWHERE total_doses > 1500;',
      exercises: [
        {
          id: 'sql_ex_05',
          instruction: 'Write a CTE named FacilityTotals and query from it.',
          initialCode: 'WITH FacilityTotals AS (\n  SELECT facility_name, doses_administered\n  FROM clinics\n)\nSELECT * FROM FacilityTotals;',
          solutionCode: 'WITH FacilityTotals AS (\n  SELECT facility_name, doses_administered\n  FROM clinics\n)\nSELECT * FROM FacilityTotals;',
          hints: ['Define WITH FacilityTotals AS (...)', 'Select all columns from FacilityTotals']
        }
      ],
      quiz: [
        {
          id: 'sql_q_13',
          question: 'What keyword opens a Common Table Expression?',
          options: ['CTE', 'LET', 'WITH', 'DEFINE'],
          correctIndex: 2,
          explanation: 'The WITH keyword introduces a CTE in SQL.'
        },
        {
          id: 'sql_q_14',
          question: 'Can you define multiple CTEs in a single query?',
          options: ['No, only one', 'Yes, separated by commas after a single WITH keyword', 'Only in PostgreSQL', 'Only with UNION'],
          correctIndex: 1,
          explanation: 'Multiple CTEs can be defined in sequence separated by commas under the initial WITH statement.'
        },
        {
          id: 'sql_q_15',
          question: 'Why are CTEs preferred over deeply nested subqueries?',
          options: ['They run 10x faster automatically', 'They read top-to-bottom like modular sentences', 'They ignore NULL values', 'They bypass locks'],
          correctIndex: 1,
          explanation: 'CTEs structure query logic in clear linear stages rather than confusing nested parentheses.'
        }
      ],
      whyItMatters: 'Multi-indicator public health reports require calculating denominators and numerators in separate CTE stages before computing final percentages.',
      estimatedMinutes: 9
    },
    {
      id: 'sql_06',
      trackId: 'sql',
      order: 6,
      stageNumber: 3,
      title: 'Window Functions: ROW_NUMBER and OVER',
      objective: 'Rank records within partitions without collapsing rows.',
      explanation: 'Window functions perform calculations across sets of rows related to the current row without grouping them into a single summary line. The OVER clause defines the partitioning and ordering rules.',
      codeSnippet: 'SELECT facility_name, district, doses_administered,\n  ROW_NUMBER() OVER(PARTITION BY district ORDER BY doses_administered DESC) as rank_in_district\nFROM clinics;',
      exercises: [
        {
          id: 'sql_ex_06',
          instruction: 'Use ROW_NUMBER() OVER(ORDER BY doses_administered DESC) to rank facilities by volume.',
          initialCode: 'SELECT facility_name, doses_administered,\n  ROW_NUMBER() OVER(ORDER BY doses_administered DESC) as overall_rank\nFROM clinics;',
          solutionCode: 'SELECT facility_name, doses_administered,\n  ROW_NUMBER() OVER(ORDER BY doses_administered DESC) as overall_rank\nFROM clinics;',
          hints: ['Use ROW_NUMBER() OVER(ORDER BY doses_administered DESC)', 'Name the column overall_rank']
        }
      ],
      quiz: [
        {
          id: 'sql_q_16',
          question: 'How do window functions differ from GROUP BY aggregations?',
          options: ['Window functions collapse rows; GROUP BY does not', 'Window functions preserve individual rows; GROUP BY groups them into summary rows', 'Window functions only work on text', 'There is no difference'],
          correctIndex: 1,
          explanation: 'Window functions append calculation results to each original record without reducing the row count.'
        },
        {
          id: 'sql_q_17',
          question: 'What sub-clause inside OVER() divides data into ranking groups?',
          options: ['GROUP BY', 'PARTITION BY', 'DIVIDE BY', 'SPLIT BY'],
          correctIndex: 1,
          explanation: 'PARTITION BY resets the window calculation independently within each specified subset.'
        },
        {
          id: 'sql_q_18',
          question: 'Which window function fetches values from the previous row?',
          options: ['PREV()', 'PRIOR()', 'LAG()', 'BEFORE()'],
          correctIndex: 2,
          explanation: 'LAG() accesses data from a preceding record at a given physical offset.'
        }
      ],
      whyItMatters: 'District health analysts use window functions like LAG and ROW_NUMBER to calculate month-over-month reporting growth and identify top-performing facilities.',
      estimatedMinutes: 10
    }
  ]
};
