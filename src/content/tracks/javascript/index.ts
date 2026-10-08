import { Track } from '../../../types';

export const javascriptTrack: Track = {
  id: 'javascript',
  title: 'Modern JavaScript & Web Logic',
  badge: 'JavaScript',
  description: 'Write robust browser and Node.js code: variables, array pipelines, async patterns, and DOM manipulation.',
  accentColor: '#EAB308',
  iconName: 'Braces',
  lessons: [
    {
      id: 'js_01',
      trackId: 'javascript',
      order: 1,
      stageNumber: 1,
      title: 'Variables: const and let',
      objective: 'Declare mutable and immutable identifiers using let and const.',
      explanation: 'Modern JavaScript uses const for bindings that will not be reassigned and let for mutable variables. Avoid var due to hoisting pitfalls.',
      codeSnippet: 'const clinicName = "Thamaga Health Centre";\nlet patientCount = 45;\npatientCount += 1;\nconsole.log(clinicName, patientCount);',
      exercises: [
        {
          id: 'js_ex_01',
          instruction: 'Declare a const variable named country with "Botswana" and log it with console.log().',
          initialCode: 'const country = "Botswana";\nconsole.log(country);',
          solutionCode: 'const country = "Botswana";\nconsole.log(country);',
          hints: ['Use const country = "Botswana";', 'Call console.log(country);']
        }
      ],
      quiz: [
        {
          id: 'js_q_01',
          question: 'What happens when you reassign a variable declared with const?',
          options: ['It updates quietly', 'A TypeError is thrown at runtime', 'The variable becomes let', 'It returns undefined'],
          correctIndex: 1,
          explanation: 'Reassigning a const binding triggers a TypeError in JavaScript engines.'
        },
        {
          id: 'js_q_02',
          question: 'Which keyword should be avoided in modern JavaScript due to function scoping and hoisting bugs?',
          options: ['const', 'let', 'var', 'def'],
          correctIndex: 2,
          explanation: 'var has function scope rather than block scope and can cause unexpected variable leakage.'
        },
        {
          id: 'js_q_03',
          question: 'What is the type of NaN in JavaScript?',
          options: ['"undefined"', '"null"', '"number"', '"NaN"'],
          correctIndex: 2,
          explanation: 'typeof NaN evaluates to "number" per the IEEE-754 floating point standard.'
        }
      ],
      whyItMatters: 'Predictable variable scoping prevents state corruption in offline-first web applications.',
      estimatedMinutes: 5
    },
    {
      id: 'js_02',
      trackId: 'javascript',
      order: 2,
      stageNumber: 1,
      title: 'Array Transforms: map, filter, and reduce',
      objective: 'Transform and aggregate dataset arrays using functional methods.',
      explanation: 'Array methods let you process collections without manual for loops. map transforms each item; filter picks items matching a test; reduce rolls up items into a single value.',
      codeSnippet: 'const scores = [85, 92, 78, 64, 90];\nconst passing = scores.filter(s => s >= 75);\nconst total = passing.reduce((sum, s) => sum + s, 0);\nconsole.log("Passing total:", total);',
      exercises: [
        {
          id: 'js_ex_02',
          instruction: 'Use .filter() on numbers to extract values greater than 50 and print them.',
          initialCode: 'const nums = [12, 65, 34, 88, 51];\nconst filtered = nums.filter(n => n > 50);\nconsole.log(filtered);',
          solutionCode: 'const nums = [12, 65, 34, 88, 51];\nconst filtered = nums.filter(n => n > 50);\nconsole.log(filtered);',
          hints: ['Use nums.filter(n => n > 50)', 'Log the filtered array']
        }
      ],
      quiz: [
        {
          id: 'js_q_04',
          question: 'Does array.map() modify the original array in-place?',
          options: ['Yes', 'No, it returns a new array with transformed elements', 'Only if numbers are passed', 'Only in strict mode'],
          correctIndex: 1,
          explanation: 'map() is a pure function that leaves the source array unchanged and returns a new copy.'
        },
        {
          id: 'js_q_05',
          question: 'What does array.reduce() return?',
          options: ['Always an array', 'Always a number', 'A single accumulated result of any chosen type', 'A boolean'],
          correctIndex: 2,
          explanation: 'reduce() accumulates items into whatever initial accumulator type you provide.'
        },
        {
          id: 'js_q_06',
          question: 'Which method checks if at least one item satisfies a condition?',
          options: ['every()', 'some()', 'includes()', 'find()'],
          correctIndex: 1,
          explanation: 'some() returns true if any element satisfies the predicate function.'
        }
      ],
      whyItMatters: 'Web apps parse API responses and calculate summary cards using map and filter pipelines.',
      estimatedMinutes: 7
    }
  ]
};
