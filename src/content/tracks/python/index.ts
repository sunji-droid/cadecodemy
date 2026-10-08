import { Track } from '../../../types';

export const pythonTrack: Track = {
  id: 'python',
  title: 'Python for Data & Systems',
  badge: 'Python',
  description: 'Master Python fundamentals, functional programming, data analysis with pandas, and clean software structure.',
  accentColor: '#38BDF8',
  iconName: 'Code',
  lessons: [
    {
      id: 'py_01',
      trackId: 'python',
      order: 1,
      stageNumber: 1,
      title: 'Printing and Variables',
      objective: 'Assign variables and output text to the console with print().',
      explanation: 'Variables store data values in memory. In Python, assignment uses the single equals sign (=). The print() function sends textual output to your standard console.',
      codeSnippet: 'name = "Kweneng District"\ntarget = 1200\nprint(f"Target for {name}: {target}")',
      exercises: [
        {
          id: 'py_ex_01',
          instruction: 'Create a variable named district with the value "Molepolole" and print it.',
          initialCode: '# Write your code below\ndistrict = "Molepolole"\nprint(district)',
          solutionCode: 'district = "Molepolole"\nprint(district)',
          hints: ['Assign district = "Molepolole"', 'Call print(district)']
        }
      ],
      quiz: [
        {
          id: 'py_q_01',
          question: 'Which symbol is used for variable assignment in Python?',
          options: ['==', '=', ':=', '<-'],
          correctIndex: 1,
          explanation: 'The single equals sign (=) assigns values to variables in Python.'
        },
        {
          id: 'py_q_02',
          question: 'What does the print() function do?',
          options: ['Sends text to an office printer', 'Displays values on screen', 'Creates a PDF document', 'Stops program execution'],
          correctIndex: 1,
          explanation: 'The print() function outputs strings and variable values to the standard console.'
        },
        {
          id: 'py_q_03',
          question: 'Which of the following is a valid variable name in Python?',
          options: ['2nd_count', 'clinic_name', 'clinic-name', 'class'],
          correctIndex: 1,
          explanation: 'Variable names cannot start with numbers, cannot have hyphens, and cannot use reserved keywords like class.'
        }
      ],
      whyItMatters: 'Every operational script begins with clean variable definitions and readable logging. Clean naming prevents calculation errors.',
      estimatedMinutes: 5
    },
    {
      id: 'py_02',
      trackId: 'python',
      order: 2,
      stageNumber: 1,
      title: 'Numbers and Basic Arithmetic',
      objective: 'Calculate sums, differences, rates, and coverage ratios using numeric operations.',
      explanation: 'Python supports integers (whole numbers) and floats (decimal values). Standard arithmetic operators include + (addition), - (subtraction), * (multiplication), and / (true division).',
      codeSnippet: 'administered = 1280\ntarget = 1500\ncoverage_rate = (administered / target) * 100\nprint(f"Coverage: {coverage_rate:.1f}%")',
      exercises: [
        {
          id: 'py_ex_02',
          instruction: 'Calculate the drop-out count: subtract 1280 from 1500 and print the result.',
          initialCode: 'target = 1500\nreached = 1280\nremaining = target - reached\nprint(remaining)',
          solutionCode: 'target = 1500\nreached = 1280\nremaining = target - reached\nprint(remaining)',
          hints: ['Use the subtraction operator -', 'Pass remaining to print()']
        }
      ],
      quiz: [
        {
          id: 'py_q_04',
          question: 'What is the result of 10 / 2 in Python 3?',
          options: ['5', '5.0', '5.5', '2'],
          correctIndex: 1,
          explanation: 'True division (/) always returns a float in Python 3.'
        },
        {
          id: 'py_q_05',
          question: 'Which operator returns the integer floor division?',
          options: ['/', '//', '%', '**'],
          correctIndex: 1,
          explanation: '// truncates decimal fractions and returns the floor quotient.'
        },
        {
          id: 'py_q_06',
          question: 'What operator raises a number to a power?',
          options: ['^', '**', 'pow() only', '^^'],
          correctIndex: 1,
          explanation: 'The ** operator raises base to exponent, such as 2 ** 3 = 8.'
        }
      ],
      whyItMatters: 'Calculating coverage rates, denominators, and indicators accurately is the foundation of programmatic analysis.',
      estimatedMinutes: 5
    },
    {
      id: 'py_03',
      trackId: 'python',
      order: 3,
      stageNumber: 1,
      title: 'Lists and Indexing',
      objective: 'Organize related values into ordered lists and retrieve items by zero-based index.',
      explanation: 'Lists store sequences of items inside square brackets. In Python, list indices start at 0. Negative indices count backward from the end.',
      codeSnippet: 'facilities = ["Molepolole Main", "Thamaga", "Lentsweletau"]\nprint(facilities[0])\nprint(facilities[-1])',
      exercises: [
        {
          id: 'py_ex_03',
          instruction: 'Add "Kopong" to the list of facilities and print the updated list.',
          initialCode: 'facilities = ["Thamaga", "Mogoditshane"]\nfacilities.append("Kopong")\nprint(facilities)',
          solutionCode: 'facilities = ["Thamaga", "Mogoditshane"]\nfacilities.append("Kopong")\nprint(facilities)',
          hints: ['Use facilities.append("Kopong")', 'Print the result']
        }
      ],
      quiz: [
        {
          id: 'py_q_07',
          question: 'What index accesses the first element of a Python list?',
          options: ['1', '0', '-1', 'first'],
          correctIndex: 1,
          explanation: 'Python lists are zero-indexed, meaning the first element is at index 0.'
        },
        {
          id: 'py_q_08',
          question: 'What does facilities[-1] return?',
          options: ['The first element', 'An error', 'The last element', 'None'],
          correctIndex: 2,
          explanation: 'Negative indexing starts from the tail; -1 retrieves the final element.'
        },
        {
          id: 'py_q_09',
          question: 'Which method appends an element to the end of a list in-place?',
          options: ['add()', 'push()', 'append()', 'insertEnd()'],
          correctIndex: 2,
          explanation: 'append() mutates the list by placing the argument at the final position.'
        }
      ],
      whyItMatters: 'Data pipelines process batches of facility names, record IDs, and timestamps as ordered lists.',
      estimatedMinutes: 6
    },
    {
      id: 'py_04',
      trackId: 'python',
      order: 4,
      stageNumber: 2,
      title: 'Dictionaries and Structured Records',
      objective: 'Structure clinic and patient records using key-value pairs.',
      explanation: 'Dictionaries hold key-value associations inside curly braces {}. Keys must be immutable types like strings or numbers. Access values with square brackets or the .get() method.',
      codeSnippet: 'facility_report = {\n  "name": "Thamaga Clinic",\n  "target": 800,\n  "vaccinated": 620\n}\nprint(facility_report["name"])',
      exercises: [
        {
          id: 'py_ex_04',
          instruction: 'Retrieve the "vaccinated" count from the dictionary and print it.',
          initialCode: 'record = {"name": "Lentsweletau", "vaccinated": 410}\nprint(record["vaccinated"])',
          solutionCode: 'record = {"name": "Lentsweletau", "vaccinated": 410}\nprint(record["vaccinated"])',
          hints: ['Use record["vaccinated"]', 'Print the value']
        }
      ],
      quiz: [
        {
          id: 'py_q_10',
          question: 'How do you safely fetch a key that might not exist without crashing?',
          options: ['dict[key]', 'dict.fetch(key)', 'dict.get(key, default)', 'dict.find(key)'],
          correctIndex: 2,
          explanation: 'dict.get() returns None or a specified default value instead of throwing a KeyError.'
        },
        {
          id: 'py_q_11',
          question: 'Can dictionary keys be duplicate?',
          options: ['Yes', 'No, each key must be unique', 'Only for integers', 'Only in Python 3.12+'],
          correctIndex: 1,
          explanation: 'Keys in a dictionary are unique; assigning to an existing key replaces its value.'
        },
        {
          id: 'py_q_12',
          question: 'Which function returns a list of all keys in a dictionary?',
          options: ['dict.all()', 'dict.keys()', 'dict.columns()', 'keys(dict)'],
          correctIndex: 1,
          explanation: 'dict.keys() produces a view of all keys in the mapping.'
        }
      ],
      whyItMatters: 'API payloads, DHIS2 JSON payloads, and database records map directly to Python dictionaries.',
      estimatedMinutes: 7
    },
    {
      id: 'py_05',
      trackId: 'python',
      order: 5,
      stageNumber: 2,
      title: 'Conditional Statements (if / elif / else)',
      objective: 'Control program flow by testing indicator thresholds.',
      explanation: 'Conditional logic checks Boolean truth values. If the condition evaluates to True, Python executes the indented block.',
      codeSnippet: 'coverage = 78.1\nif coverage >= 95.0:\n    print("Target Achieved")\nelif coverage >= 80.0:\n    print("Moderate Coverage")\nelse:\n    print("Redeployment Required")',
      exercises: [
        {
          id: 'py_ex_05',
          instruction: 'Write an if check: if doses > 1000 print "High Volume", else print "Standard Volume".',
          initialCode: 'doses = 1200\nif doses > 1000:\n    print("High Volume")\nelse:\n    print("Standard Volume")',
          solutionCode: 'doses = 1200\nif doses > 1000:\n    print("High Volume")\nelse:\n    print("Standard Volume")',
          hints: ['Check if doses > 1000', 'Ensure proper indentation']
        }
      ],
      quiz: [
        {
          id: 'py_q_13',
          question: 'How does Python define code blocks inside conditionals?',
          options: ['Curly braces {}', 'Indentation (spaces/tabs)', 'begin and end keywords', 'Parentheses ()'],
          correctIndex: 1,
          explanation: 'Python uses consistent whitespace indentation (conventionally 4 spaces) to mark scope.'
        },
        {
          id: 'py_q_14',
          question: 'Which operator checks if two values are equal?',
          options: ['=', '==', '===', 'is_equal'],
          correctIndex: 1,
          explanation: '== tests value equality, whereas = is for variable assignment.'
        },
        {
          id: 'py_q_15',
          question: 'What is the keyword for "else if" in Python?',
          options: ['elseif', 'else if', 'elif', 'elsif'],
          correctIndex: 2,
          explanation: 'Python contracts "else if" into elif.'
        }
      ],
      whyItMatters: 'Automated data validation rules flag out-of-range counts and missing fields using conditional gates.',
      estimatedMinutes: 6
    },
    {
      id: 'py_06',
      trackId: 'python',
      order: 6,
      stageNumber: 3,
      title: 'Functions and Modular Design',
      objective: 'Package reusable logic into clean, tested functions with return values.',
      explanation: 'Functions bundle statements under a name with def. They take parameters as input and send output back with the return keyword.',
      codeSnippet: 'def compute_coverage(doses, pop):\n    if pop == 0:\n        return 0.0\n    return round((doses / pop) * 100, 2)\n\nrate = compute_coverage(1280, 1500)\nprint(rate)',
      exercises: [
        {
          id: 'py_ex_06',
          instruction: 'Complete the function to return the product of a and b.',
          initialCode: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(6, 7))',
          solutionCode: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(6, 7))',
          hints: ['Use return a * b', 'Call multiply(6, 7)']
        }
      ],
      quiz: [
        {
          id: 'py_q_16',
          question: 'What keyword defines a function in Python?',
          options: ['function', 'fn', 'def', 'func'],
          correctIndex: 2,
          explanation: 'def begins a function definition in Python.'
        },
        {
          id: 'py_q_17',
          question: 'What happens if a function has no return statement?',
          options: ['It crashes', 'It returns None', 'It returns 0', 'It returns undefined'],
          correctIndex: 1,
          explanation: 'Functions without an explicit return statement return None upon finishing.'
        },
        {
          id: 'py_q_18',
          question: 'Why are small, pure functions preferred in data engineering?',
          options: ['They run 100x faster', 'They are easy to test and verify independently', 'They delete memory', 'They prevent loops'],
          correctIndex: 1,
          explanation: 'Modular pure functions can be unit tested without hidden side-effects.'
        }
      ],
      whyItMatters: 'Libraries like me-indicator-toolkit are built from small, rigorously tested calculation functions.',
      estimatedMinutes: 8
    }
  ]
};
