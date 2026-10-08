export interface ReferenceSnippet {
  syntax: string;
  explanation: string;
  example: string;
  runnableCode?: string;
}

export interface ReferenceSection {
  id: string;
  title: string;
  language: 'Python' | 'SQL' | 'JavaScript' | 'Bash' | 'R' | 'Big-O';
  items: ReferenceSnippet[];
}

export const REFERENCE_DATA: ReferenceSection[] = [
  {
    id: 'python_ref',
    title: 'Python 3 Modern Standard Reference',
    language: 'Python',
    items: [
      {
        syntax: 'List Comprehension with Conditional',
        explanation: 'Constructs a new filtered list with transformed values in a single concise line.',
        example: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
        runnableCode: 'squares = [x**2 for x in range(10) if x % 2 == 0]\nprint("Even squares:", squares)'
      },
      {
        syntax: 'Dictionary Comprehension & Unpacking',
        explanation: 'Creates a dictionary dynamically or merges multiple mapping objects.',
        example: 'rates = {k: v * 1.15 for k, v in base_prices.items()}',
        runnableCode: 'base = {"syringe": 5.0, "bandage": 2.5}\nrates = {k: round(v * 1.15, 2) for k, v in base.items()}\nprint("Updated rates:", rates)'
      },
      {
        syntax: 'def func(*args, **kwargs) -> ReturnType:',
        explanation: 'Accepts arbitrary positional arguments (as a tuple) and keyword arguments (as a dict).',
        example: 'def log_event(event_name: str, *tags, **metadata): pass',
        runnableCode: 'def log_event(name, *tags, **meta):\n    print(f"Event: {name} | Tags: {tags} | Meta: {meta}")\nlog_event("SYNC_COMPLETE", "audit", "kweneng", status=200)'
      }
    ]
  },
  {
    id: 'sql_ref',
    title: 'SQL Relational & Analytical Reference',
    language: 'SQL',
    items: [
      {
        syntax: 'Common Table Expression (WITH ... AS)',
        explanation: 'Defines a temporary named result set that can be referenced within the main query.',
        example: 'WITH DistrictSummary AS (\n  SELECT district, AVG(target_pop) as avg_pop FROM clinics GROUP BY district\n)\nSELECT * FROM DistrictSummary;',
        runnableCode: 'SELECT district, AVG(target_pop) as avg_pop FROM clinics GROUP BY district;'
      },
      {
        syntax: 'COALESCE(column, default_value)',
        explanation: 'Evaluates the arguments in order and returns the current value of the first non-NULL expression.',
        example: 'SELECT facility_name, COALESCE(doses_administered, 0) FROM clinics;',
        runnableCode: 'SELECT facility_name, doses_administered FROM clinics LIMIT 3;'
      },
      {
        syntax: 'CAST(column AS datatype)',
        explanation: 'Converts an expression from one data type to another to prevent integer truncation.',
        example: 'ROUND((CAST(doses AS REAL) / target) * 100, 1)',
        runnableCode: 'SELECT facility_name, ROUND((CAST(doses_administered AS REAL) / target_pop) * 100, 1) as coverage FROM clinics;'
      }
    ]
  },
  {
    id: 'bash_ref',
    title: 'Linux CLI & Bash Shell Reference',
    language: 'Bash',
    items: [
      {
        syntax: 'grep -r "pattern" /path',
        explanation: 'Recursively searches for regular expression matches within all files under the path.',
        example: 'grep -r "ERROR" /var/log/syslog',
        runnableCode: 'ls -la'
      },
      {
        syntax: 'find . -type f -name "*.csv"',
        explanation: 'Searches directory hierarchies for matching filesystem objects by type, size, or pattern.',
        example: 'find ./data -name "*.csv"',
        runnableCode: 'cat /home/learner/welcome.txt'
      },
      {
        syntax: 'command1 | command2 (Piping)',
        explanation: 'Streams the standard output (stdout) of command1 directly into the standard input (stdin) of command2.',
        example: 'cat survey.csv | grep "Molepolole" | wc -l',
        runnableCode: 'pwd'
      }
    ]
  },
  {
    id: 'big_o_ref',
    title: 'Asymptotic Computational Complexity (Big-O)',
    language: 'Big-O',
    items: [
      {
        syntax: 'O(1) — Constant Time',
        explanation: 'Execution time remains invariant regardless of input dataset volume (e.g. hash map lookup, array index access).',
        example: 'element = array[index] or hash_map.get(key)'
      },
      {
        syntax: 'O(log n) — Logarithmic Time',
        explanation: 'Problem space halves with each operational step (e.g. Binary Search over sorted bounds).',
        example: 'while left <= right: mid = (left + right) // 2'
      },
      {
        syntax: 'O(n log n) — Linearithmic Time',
        explanation: 'Optimal lower bound for comparison-based array sorting (e.g. Merge Sort, Quick Sort average case).',
        example: 'Divide array into halves, sort recursively, merge in linear time'
      },
      {
        syntax: 'O(n²) — Quadratic Time',
        explanation: 'Nested iteration over input pairs (e.g. Bubble Sort, Selection Sort, pairwise matrix comparison).',
        example: 'for i in range(n): for j in range(n): ...'
      }
    ]
  }
];
