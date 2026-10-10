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
      explanation: 'Modern JavaScript uses const for values that will never be reassigned and let for variables that change. Avoid var due to hoisting issues. Output data with console.log().',
      codeSnippet: 'const clinic = "Thamaga Health Centre";\nlet count = 45;\ncount += 1;\nconsole.log(clinic, count);',
      exercises: [
        {
          id: 'js_ex_01',
          instruction: 'Declare a const variable named country with the string "Botswana". On the next line, print it using console.log(country).',
          initialCode: '// 1. Declare a const variable named country equal to "Botswana"\n// 2. Log it with console.log()\n',
          solutionCode: 'const country = "Botswana";\nconsole.log(country);',
          hints: ['Write const country = "Botswana";', 'Write console.log(country);']
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
      explanation: 'Array methods process collections cleanly: .filter() selects items matching a condition, .map() transforms elements, and .reduce() sums or accumulates values.',
      codeSnippet: 'const nums = [12, 65, 34, 88, 51];\nconst big = nums.filter(n => n > 50);\nconsole.log(big); // [65, 88, 51]',
      exercises: [
        {
          id: 'js_ex_02',
          instruction: 'Given the nums array, use .filter() to create a new array containing only numbers greater than 50. Log the filtered array to console.',
          initialCode: 'const nums = [12, 65, 34, 88, 51];\n// Use nums.filter() to keep numbers > 50 and log the result\n',
          solutionCode: 'const nums = [12, 65, 34, 88, 51];\nconst filtered = nums.filter(n => n > 50);\nconsole.log(filtered);',
          hints: ['Use nums.filter(n => n > 50)', 'Store in a variable or log directly']
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
          options: ['some()', 'every()', 'includes()', 'find()'],
          correctIndex: 0,
          explanation: 'some() returns true if any element satisfies the predicate function.'
        }
      ],
      whyItMatters: 'Web apps parse API responses and calculate summary cards using map and filter pipelines.',
      estimatedMinutes: 7
    },
    {
      id: 'js_03',
      trackId: 'javascript',
      order: 3,
      stageNumber: 2,
      title: 'Objects and Destructuring',
      objective: 'Extract data cleanly from nested structures using modern object syntax.',
      explanation: 'Destructuring unpacks properties from objects directly into distinct variables. This eliminates repetitive dot syntax.',
      codeSnippet: 'const facility = { id: 101, name: "Thamaga Clinic", doses: 620 };\nconst { name, doses } = facility;\nconsole.log(name, doses);',
      exercises: [
        {
          id: 'js_ex_03',
          instruction: 'Use object destructuring to extract title and author from the book object. Then log both variables separated by a space.',
          initialCode: 'const book = { title: "Clean Code", author: "Robert Martin" };\n// Destructure title and author, then log them\n',
          solutionCode: 'const book = { title: "Clean Code", author: "Robert Martin" };\nconst { title, author } = book;\nconsole.log(title, author);',
          hints: ['Write const { title, author } = book;', 'Call console.log(title, author);']
        }
      ],
      quiz: [
        {
          id: 'js_q_07',
          question: 'What does the spread operator (...) do when applied to an object?',
          options: ['Deletes its keys', 'Copies its enumerable properties into a new object', 'Freezes it from edits', 'Converts it to JSON'],
          correctIndex: 1,
          explanation: 'Spread ({ ...obj }) shallow-copies properties into the newly created object.'
        },
        {
          id: 'js_q_08',
          question: 'What does optional chaining (?.) prevent in deep object traversal?',
          options: ['TypeError: Cannot read property of undefined', 'Syntax errors', 'Infinite loops', 'Slow performance'],
          correctIndex: 0,
          explanation: 'Optional chaining returns undefined gracefully if a parent property is null or undefined.'
        },
        {
          id: 'js_q_09',
          question: 'How do you rename a property during object destructuring?',
          options: ['const { old as new } = obj;', 'const { old: newName } = obj;', 'const { newName <- old } = obj;', 'rename(obj.old, newName)'],
          correctIndex: 1,
          explanation: 'The colon syntax (const { property: alias } = obj) assigns the property value to a new variable name.'
        }
      ],
      whyItMatters: 'API responses return nested JSON structures that frontend components unpack through destructuring.',
      estimatedMinutes: 7
    },
    {
      id: 'js_04',
      trackId: 'javascript',
      order: 4,
      stageNumber: 3,
      title: 'Asynchronous Programming (Promises & async/await)',
      objective: 'Handle delayed network requests and concurrent tasks without blocking the UI.',
      explanation: 'JavaScript runs in a single-threaded event loop. Asynchronous operations return Promises. Use async/await syntax to write asynchronous code that reads sequentially.',
      codeSnippet: 'async function fetchStatus() {\n  return "System operational";\n}\n\nfetchStatus().then(status => console.log(status));',
      exercises: [
        {
          id: 'js_ex_04',
          instruction: 'Complete the async function getReport so it returns the string "Report Complete". Then call getReport() and log its resolved value.',
          initialCode: '// Define async function getReport() returning "Report Complete"\nasync function getReport() {\n    // return string\n}\n\ngetReport().then(res => console.log(res));',
          solutionCode: 'async function getReport() {\n  return "Report Complete";\n}\n\ngetReport().then(res => console.log(res));',
          hints: ['Add return "Report Complete"; inside getReport()', 'Run the code']
        }
      ],
      quiz: [
        {
          id: 'js_q_10',
          question: 'What states can a JavaScript Promise exist in?',
          options: ['started, running, ended', 'pending, fulfilled, rejected', 'waiting, active, closed', 'queued, dispatched, done'],
          correctIndex: 1,
          explanation: 'A Promise transitions from pending to either fulfilled (success) or rejected (failure).'
        },
        {
          id: 'js_q_11',
          question: 'Can you use await outside an async function in traditional ES5 code?',
          options: ['Always', 'Never; await requires an enclosing async function or top-level module context', 'Only inside for loops', 'Only with timeout'],
          correctIndex: 1,
          explanation: 'The await keyword pauses execution within an async function until the promise settles.'
        },
        {
          id: 'js_q_12',
          question: 'What happens when one promise inside Promise.all() rejects?',
          options: ['The rest continue quietly', 'Promise.all rejects immediately with that error', 'It retries 3 times', 'It returns null'],
          correctIndex: 1,
          explanation: 'Promise.all resolves when every input promise fulfills, or rejects as soon as one fails.'
        }
      ],
      whyItMatters: 'Web applications fetch clinic indicators and patient registers concurrently using asynchronous promises.',
      estimatedMinutes: 8
    },
    {
      id: 'js_05',
      trackId: 'javascript',
      order: 5,
      stageNumber: 3,
      title: 'Client-Side Storage: IndexedDB and LocalStorage',
      objective: 'Persist state locally for offline-first web reliability.',
      explanation: 'Offline-ready applications cache data on the client device. JSON.stringify() converts JavaScript objects into strings for local persistence, while JSON.parse() reconstructs them.',
      codeSnippet: 'const user = { role: "M&E Officer", facility: "Thamaga" };\nconst text = JSON.stringify(user);\nconsole.log(text);',
      exercises: [
        {
          id: 'js_ex_05',
          instruction: 'Convert the user object into a JSON string using JSON.stringify() and log it to the console.',
          initialCode: 'const user = { role: "M&E Officer", facility: "Thamaga" };\n// Serialize user using JSON.stringify() and log the string\n',
          solutionCode: 'const user = { role: "M&E Officer", facility: "Thamaga" };\nconst serialized = JSON.stringify(user);\nconsole.log(serialized);',
          hints: ['Use JSON.stringify(user)', 'Log serialized with console.log()']
        }
      ],
      quiz: [
        {
          id: 'js_q_13',
          question: 'What is the standard synchronous storage limit for LocalStorage in modern browsers?',
          options: ['100 MB', '5 MB', '1 GB', 'Unlimited'],
          correctIndex: 1,
          explanation: 'LocalStorage typically caps storage around 5 MB per origin.'
        },
        {
          id: 'js_q_14',
          question: 'Why is IndexedDB preferred over LocalStorage for offline data systems?',
          options: ['It is asynchronous, non-blocking, and supports indexed queries over large objects', 'It deletes data on refresh', 'It is older', 'It runs in Python'],
          correctIndex: 0,
          explanation: 'IndexedDB operates asynchronously without blocking the UI thread and accommodates hundreds of megabytes of structured data.'
        },
        {
          id: 'js_q_15',
          question: 'What method converts a JSON string back into a JavaScript object?',
          options: ['JSON.toObject()', 'JSON.parse()', 'JSON.decode()', 'JSON.unpack()'],
          correctIndex: 1,
          explanation: 'JSON.parse() parses a JSON-formatted string and reconstructs the JavaScript value or object.'
        }
      ],
      whyItMatters: 'Frontline tools like the Wheelchair Data Management System and NutriAssess rely on local storage to function when health facility connectivity drops.',
      estimatedMinutes: 8
    },
    {
      id: 'js_06',
      trackId: 'javascript',
      order: 6,
      stageNumber: 4,
      title: 'REST APIs & Fetching Public Data',
      objective: 'Consume real public REST endpoints, parse JSON payloads, and handle HTTP responses using async fetch().',
      explanation: 'Modern web systems communicate across the internet using RESTful HTTP interfaces. The browser native fetch() function issues HTTP requests asynchronously. You inspect status codes, parse JSON responses, and render records.',
      codeSnippet: 'const jsonStr = \'{"id": 72, "name": "Kweneng DHMT"}\';\nconst parsed = JSON.parse(jsonStr);\nconsole.log(parsed.name);',
      exercises: [
        {
          id: 'js_ex_06',
          instruction: 'Complete the parseApiResponse function: parse the jsonStr string using JSON.parse(), and log data.name.',
          initialCode: 'const rawPayload = \'{"id": 72, "name": "Kweneng DHMT", "status": "active"}\';\n\nfunction parseApiResponse(jsonStr) {\n  // 1. Parse jsonStr with JSON.parse\n  // 2. Log data.name\n}\n\nparseApiResponse(rawPayload);',
          solutionCode: 'const rawPayload = \'{"id": 72, "name": "Kweneng DHMT", "status": "active"}\';\n\nfunction parseApiResponse(jsonStr) {\n  const data = JSON.parse(jsonStr);\n  console.log(data.name);\n}\n\nparseApiResponse(rawPayload);',
          hints: ['Inside the function, write const data = JSON.parse(jsonStr);', 'Then write console.log(data.name);']
        }
      ],
      quiz: [
        {
          id: 'js_q_16',
          question: 'What HTTP status code indicates a successful GET request?',
          options: ['200 OK', '404 Not Found', '500 Server Error', '301 Redirect'],
          correctIndex: 0,
          explanation: 'HTTP 200 OK signals that the server successfully fulfilled the request and returned the requested representation.'
        },
        {
          id: 'js_q_17',
          question: 'What does the CORS (Cross-Origin Resource Sharing) header allow in public APIs?',
          options: ['It encrypts the payload with RSA', 'It permits browser JavaScript on other domains to fetch the API data', 'It blocks all mobile phones', 'It slows down the connection'],
          correctIndex: 1,
          explanation: 'Access-Control-Allow-Origin headers tell modern browsers that client-side web apps are permitted to consume the API across different domains.'
        },
        {
          id: 'js_q_18',
          question: 'Why should public APIs that do not require an API key be preferred for student beginner sandboxes?',
          options: ['They prevent secret credentials from being exposed in client-side source code and require zero signup friction', 'They run 10x faster', 'They delete local storage', 'They only work on desktop computers'],
          correctIndex: 0,
          explanation: 'Zero-auth public APIs eliminate API key exposure risks and allow learners to run requests immediately without sign-up hurdles.'
        }
      ],
      whyItMatters: 'Integrating live REST APIs transforms static web scripts into dynamic applications that pull real health indicators, exchange rates, and geographical registries.',
      estimatedMinutes: 8
    }
  ]
};
