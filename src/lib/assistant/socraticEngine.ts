export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'hint' | 'concept' | 'debug';
}

interface SocraticRule {
  keywords: string[];
  response: string;
  category: 'hint' | 'concept' | 'debug';
}

const PEDAGOGICAL_RULES: SocraticRule[] = [
  {
    keywords: ['syntaxerror', 'syntax error', 'invalid syntax', 'unexpected token'],
    category: 'debug',
    response: "Syntax errors mean the interpreter couldn't parse the structure of your instructions. Check the line right before the error marker:\n1. Did you close every quotation mark, parenthesis `()`, or curly brace `{}`?\n2. In Python, did you remember the colon `:` after `def`, `if`, or `for`?\n3. Are your indentation spaces consistent?"
  },
  {
    keywords: ['nameerror', 'not defined', 'no such column', 'undefined variable'],
    category: 'debug',
    response: "A `NameError` occurs when the runtime encounters a name it hasn't seen before. Ask yourself:\n1. Did you spell the variable exactly the same way where it was assigned?\n2. Is the variable defined in a local function scope that isn't accessible where you are calling it?\n3. Did you assign it *before* trying to use it?"
  },
  {
    keywords: ['typeerror', 'cannot read property', 'unsupported operand'],
    category: 'debug',
    response: "A `TypeError` means you're performing an operation on a datatype that doesn't support it. For example, trying to add a string and an integer (`\"5\" + 5`) or calling `.length` on `undefined`. Print the datatype of your variables right before this operation to see what the computer is actually holding."
  },
  {
    keywords: ['sql', 'join', 'select', 'where', 'group by', 'query'],
    category: 'concept',
    response: "In SQL, remember the logical order of query execution:\n1. `FROM` & `JOIN` (Identify source tables)\n2. `WHERE` (Filter rows before grouping)\n3. `GROUP BY` (Aggregate rows)\n4. `HAVING` (Filter aggregated groups)\n5. `SELECT` (Choose columns)\n6. `ORDER BY` & `LIMIT` (Sort and slice result)\nWhere in that sequence does your target data need to be transformed?"
  },
  {
    keywords: ['dijkstra', 'shortest path', 'graph', 'bfs'],
    category: 'concept',
    response: "Dijkstra's algorithm relies on the **Greedy Choice Property** and edge relaxation. When inspecting neighbors, it checks: *Is the known distance to node A plus the edge weight to node B shorter than our current best distance to node B?* If yes, we update it. Have you inspected the Graph Networks visualizer on CadeCodemy to trace this step by step?"
  },
  {
    keywords: ['loop', 'for', 'while', 'infinite loop', 'iteration'],
    category: 'concept',
    response: "When a loop isn't behaving as expected, step through the counter manually:\n- What is the value of your loop condition before the first iteration?\n- Does your termination condition ever evaluate to False?\n- If using a `while` loop, are you incrementing or modifying the state variable inside the loop body?"
  },
  {
    keywords: ['answer', 'give me the code', 'solve it', 'solution', 'write the code'],
    category: 'hint',
    response: "As your Socratic teaching assistant, I don't give away direct solutions because true mastery comes from building the mental model yourself! What part of the problem statement feels unclear, or what have you tried so far? Show me your code and let's trace where it diverges."
  },
  {
    keywords: ['who are you', 'what are you', 'duck', 'assistant'],
    category: 'concept',
    response: "I am the CadeCodemy Socratic Assistant, inspired by Harvard's Rubber Duck Debugger. I run 100% in your browser without consuming mobile data, helping you diagnose bugs, unpack algorithm theory, and build problem-solving intuition."
  }
];

export function getSocraticAssistantReply(userQuery: string, currentContext?: string): string {
  const query = userQuery.toLowerCase().trim();

  // Search through rule base
  for (const rule of PEDAGOGICAL_RULES) {
    if (rule.keywords.some(k => query.includes(k))) {
      return rule.response;
    }
  }

  // Fallback probing inquiry
  return "That's an interesting technical question. Let's break it down methodically:\n1. What is the expected output or behavior you are trying to achieve?\n2. What is the actual result or error message the computer is giving you?\n3. If you trace the first 2 lines of your execution step by step, what is the exact state of your variables?";
}
