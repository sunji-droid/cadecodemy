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
    },
    {
      id: 'js_03',
      trackId: 'javascript',
      order: 3,
      stageNumber: 2,
      title: 'Objects and Destructuring',
      objective: 'Extract data cleanly from nested structures using modern object syntax.',
      explanation: 'Destructuring unpacks properties from objects directly into distinct variables. This eliminates repetitive property accessors.',
      codeSnippet: 'const facility = { id: 101, name: "Thamaga Clinic", doses: 620 };\nconst { name, doses } = facility;\nconsole.log(`${name}: ${doses} doses`);',
      exercises: [
        {
          id: 'js_ex_03',
          instruction: 'Destructure title and author from the book object and log them.',
          initialCode: 'const book = { title: "Clean Code", author: "Robert Martin" };\nconst { title, author } = book;\nconsole.log(title, author);',
          solutionCode: 'const book = { title: "Clean Code", author: "Robert Martin" };\nconst { title, author } = book;\nconsole.log(title, author);',
          hints: ['Use const { title, author } = book;', 'Log both variables']
        }
      ],
      quiz: [
        {
          id: 'js_q_07',
          question: 'What does the spread operator (...) do when applied to an object?',
          options: ['Deletes the object', 'Copies the enumerable properties into a new object', 'Freezes all keys', 'Converts it to an array'],
          correctIndex: 1,
          explanation: 'The spread operator shallow-copies key-value pairs into a new target object.'
        },
        {
          id: 'js_q_08',
          question: 'How do you assign a default value during destructuring if the key is missing?',
          options: ['const { rate = 0 } = obj', 'const { rate: default 0 } = obj', 'const { rate || 0 } = obj', 'const { rate ?? 0 } = obj'],
          correctIndex: 0,
          explanation: 'Default values in destructuring patterns use the equals sign syntax (key = fallback).'
        },
        {
          id: 'js_q_09',
          question: 'Can you rename a property while destructuring it?',
          options: ['No', 'Yes, using the colon syntax: { name: facilityName }', 'Only with strings', 'Only in TypeScript'],
          correctIndex: 1,
          explanation: 'The colon operator inside destructuring patterns renames the extracted variable.'
        }
      ],
      whyItMatters: 'Handling JSON payloads from DHIS2 or health databases requires clean destructuring to extract relevant indicator fields.',
      estimatedMinutes: 6
    },
    {
      id: 'js_04',
      trackId: 'javascript',
      order: 4,
      stageNumber: 2,
      title: 'Promises and Async / Await',
      objective: 'Handle asynchronous API requests and data fetching without callback hell.',
      explanation: 'Asynchronous JavaScript coordinates network calls using Promises. The async and await keywords allow asynchronous code to read linearly like synchronous statements.',
      codeSnippet: 'async function fetchHealthStats() {\n  const res = { status: 200, data: { coverage: 78.1 } };\n  return res.data;\n}\nfetchHealthStats().then(data => console.log("Coverage:", data.coverage));',
      exercises: [
        {
          id: 'js_ex_04',
          instruction: 'Write an async function named loadData that returns "Ready" and log the resolved promise.',
          initialCode: 'async function loadData() {\n  return "Ready";\n}\nloadData().then(console.log);',
          solutionCode: 'async function loadData() {\n  return "Ready";\n}\nloadData().then(console.log);',
          hints: ['Define async function loadData()', 'Return "Ready"', 'Call loadData().then(console.log)']
        }
      ],
      quiz: [
        {
          id: 'js_q_10',
          question: 'What does an async function always return?',
          options: ['A callback', 'A Promise', 'An Object', 'A Boolean'],
          correctIndex: 1,
          explanation: 'Async functions always wrap their return values in a Promise.'
        },
        {
          id: 'js_q_11',
          question: 'What keyword catches errors thrown inside an async/await block?',
          options: ['catch block inside try/catch', 'onError', 'fallback', 'reject'],
          correctIndex: 0,
          explanation: 'Standard try/catch blocks intercept rejected Promises when using await.'
        },
        {
          id: 'js_q_12',
          question: 'What does Promise.all() do when supplied an array of promises?',
          options: ['Runs only the fastest promise', 'Waits for all promises to resolve or rejects immediately on the first error', 'Cancels all promises', 'Runs them sequentially in series'],
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
      explanation: 'Offline-ready applications cache data on the client device. LocalStorage stores small string key-values, while IndexedDB stores structured object stores for large datasets.',
      codeSnippet: 'const reportKey = "draft_campaign_2026";\nconst payload = JSON.stringify({ district: "Kweneng", complete: true });\nconsole.log("Cached offline key:", reportKey);\nconsole.log("Payload:", payload);',
      exercises: [
        {
          id: 'js_ex_05',
          instruction: 'Serialize an object with JSON.stringify and print the stringified output.',
          initialCode: 'const user = { role: "M&E Officer", facility: "Thamaga" };\nconst serialized = JSON.stringify(user);\nconsole.log(serialized);',
          solutionCode: 'const user = { role: "M&E Officer", facility: "Thamaga" };\nconst serialized = JSON.stringify(user);\nconsole.log(serialized);',
          hints: ['Use JSON.stringify(user)', 'Log serialized']
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
      explanation: 'Modern web systems communicate across the internet using RESTful HTTP interfaces. The browser native fetch() function issues HTTP requests asynchronously. You inspect status codes (such as 200 OK or 404 Not Found), parse the response with .json(), and render dynamic records.',
      codeSnippet: '// Fetching data from a public REST API\nasync function getCountryInfo(code) {\n  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);\n  if (!res.ok) throw new Error("Network request failed");\n  const data = await res.json();\n  return data[0].name.common;\n}',
      exercises: [
        {
          id: 'js_ex_06',
          instruction: 'Define a function parseApiResponse that takes a raw JSON string, parses it using JSON.parse, and logs the name property.',
          initialCode: 'const rawPayload = \'{"id": 72, "name": "Kweneng DHMT", "status": "active"}\';\n\nfunction parseApiResponse(jsonStr) {\n  const data = JSON.parse(jsonStr);\n  console.log(data.name);\n}\n\nparseApiResponse(rawPayload);',
          solutionCode: 'const rawPayload = \'{"id": 72, "name": "Kweneng DHMT", "status": "active"}\';\n\nfunction parseApiResponse(jsonStr) {\n  const data = JSON.parse(jsonStr);\n  console.log(data.name);\n}\n\nparseApiResponse(rawPayload);',
          hints: ['Parse with JSON.parse(jsonStr)', 'Access and print data.name']
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
