import { Track } from '../../../types';

export const pythonTrack: Track = {
  id: 'python',
  title: 'Python for Data & Systems',
  badge: 'Python',
  description: 'Master Python fundamentals, functional programming, data analysis, and clean software structure.',
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
      explanation: 'Variables store data values in memory. In Python, assignment uses the single equals sign (=). The print() function outputs values to the screen.',
      codeSnippet: 'facility = "Molepolole Clinic"\ntarget = 1200\nprint(facility)\nprint(target)',
      exercises: [
        {
          id: 'py_ex_01',
          instruction: 'Assign the variable district with the string "Molepolole". On the next line, print the value of district.',
          initialCode: '# 1. Create a variable called district and assign it the string "Molepolole"\n# 2. Print district\n',
          solutionCode: 'district = "Molepolole"\nprint(district)',
          hints: ['Write district = "Molepolole"', 'Then on a new line write print(district)']
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
      explanation: 'Python supports integers and floats. Basic arithmetic uses + (addition), - (subtraction), * (multiplication), and / (division).',
      codeSnippet: 'target = 1500\nreached = 1280\nremaining = target - reached\nprint("Remaining:", remaining)',
      exercises: [
        {
          id: 'py_ex_02',
          instruction: 'Calculate the unreached population: assign target to 1500 and reached to 1280. Subtract reached from target, store the result in remaining, and print remaining.',
          initialCode: 'target = 1500\nreached = 1280\n# Calculate remaining (target minus reached) and print it\n',
          solutionCode: 'target = 1500\nreached = 1280\nremaining = target - reached\nprint(remaining)',
          hints: ['Write remaining = target - reached', 'Call print(remaining)']
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
      explanation: 'Lists store collections of items inside square brackets []. In Python, indices start at 0. Use the .append() method to add new items to the end.',
      codeSnippet: 'facilities = ["Thamaga", "Mogoditshane"]\nfacilities.append("Kopong")\nprint(facilities[0])',
      exercises: [
        {
          id: 'py_ex_03',
          instruction: 'Add "Kopong" to the facilities list using .append(), then print the updated facilities list.',
          initialCode: 'facilities = ["Thamaga", "Mogoditshane"]\n# Append "Kopong" to facilities and print the list\n',
          solutionCode: 'facilities = ["Thamaga", "Mogoditshane"]\nfacilities.append("Kopong")\nprint(facilities)',
          hints: ['Use facilities.append("Kopong")', 'Call print(facilities)']
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
      explanation: 'Dictionaries hold key-value associations inside curly braces {}. Values are accessed by specifying the key inside square brackets [].',
      codeSnippet: 'record = {"facility": "Molepolole", "target": 1200}\nprint(record["facility"])',
      exercises: [
        {
          id: 'py_ex_04',
          instruction: 'Extract the "vaccinated" value from the record dictionary and print it to the console.',
          initialCode: 'record = {"name": "Lentsweletau", "vaccinated": 410}\n# Retrieve and print the value associated with key "vaccinated"\n',
          solutionCode: 'record = {"name": "Lentsweletau", "vaccinated": 410}\nprint(record["vaccinated"])',
          hints: ['Access the key with record["vaccinated"]', 'Wrap it in print(...)']
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
      explanation: 'Conditional logic checks Boolean truth values. Remember the colon (:) after conditions and 4 spaces for block indentation.',
      codeSnippet: 'doses = 1200\nif doses > 1000:\n    print("High Volume")\nelse:\n    print("Standard Volume")',
      exercises: [
        {
          id: 'py_ex_05',
          instruction: 'Write an if/else conditional: if doses is greater than 1000, print "High Volume". Otherwise, print "Standard Volume".',
          initialCode: 'doses = 1200\n# Check if doses is greater than 1000 and print the correct label\n',
          solutionCode: 'doses = 1200\nif doses > 1000:\n    print("High Volume")\nelse:\n    print("Standard Volume")',
          hints: ['Start with if doses > 1000:', 'Indent 4 spaces for print("High Volume")', 'Add else: and print("Standard Volume")']
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
      explanation: 'Functions bundle statements under a name with def. They take arguments as input and send output back with the return keyword.',
      codeSnippet: 'def add(a, b):\n    return a + b\n\nresult = add(10, 20)\nprint(result)',
      exercises: [
        {
          id: 'py_ex_06',
          instruction: 'Complete the multiply function so that it returns the product of a and b (using *). Then call multiply(6, 7) and print the output.',
          initialCode: '# Define multiply(a, b), return their product, and print multiply(6, 7)\ndef multiply(a, b):\n    # Complete here\n    pass\n',
          solutionCode: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(6, 7))',
          hints: ['Replace pass with return a * b', 'Outside the function, call print(multiply(6, 7))']
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
