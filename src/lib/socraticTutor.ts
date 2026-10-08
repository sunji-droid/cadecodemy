export interface DiagnosticQuery {
  hint: string;
  probingQuestion: string;
  relevantConcepts: string[];
}

export function consultSocraticTutor(code: string, errorMsg?: string, language?: string): DiagnosticQuery {
  const err = (errorMsg || '').toLowerCase();
  const c = code.toLowerCase();

  if (err.includes('syntaxerror') || err.includes('unexpected token')) {
    return {
      hint: 'Syntax errors typically stem from unclosed delimiters, mismatched parentheses, or missing punctuation.',
      probingQuestion: 'Look at the line immediately preceding the error marker. Did every opened parenthesis `(`, brace `{`, or quotation mark close properly?',
      relevantConcepts: ['Balanced Delimiters', 'Lexical Grammar', 'Indentation Integrity']
    };
  }

  if (err.includes('nameerror') || err.includes('is not defined') || err.includes('no such column')) {
    return {
      hint: 'The runtime encountered an identifier before it was bound to an existing value or schema attribute.',
      probingQuestion: 'Where did you declare or assign this identifier? Is there a subtle spelling typo, or is the scope where it was created inaccessible here?',
      relevantConcepts: ['Lexical Scope', 'Variable Hoisting / Binding', 'Database Schema Inspection']
    };
  }

  if (err.includes('typeerror') || err.includes('cannot read property')) {
    return {
      hint: 'An operation was applied to a datatype that does not support that operation.',
      probingQuestion: 'What exact datatype does your expression evaluate to at runtime? Could a variable unexpectedly hold `null`, `undefined`, or an integer instead of a string or array?',
      relevantConcepts: ['Type Invariants', 'Type Coercion', 'Defensive Null Checks']
    };
  }

  if (err.includes('zerodivisionerror') || err.includes('division by zero')) {
    return {
      hint: 'The denominator evaluated to 0 during arithmetic execution.',
      probingQuestion: 'What condition could cause your divisor variable to equal 0? Can you guard the division with an if statement or default fallback?',
      relevantConcepts: ['Arithmetic Bounds', 'Denominator Guards', 'Edge-Case Handling']
    };
  }

  // Default general Socratic inquiry
  return {
    hint: 'Step through your instructions systematically from top to bottom, keeping track of variable states on paper.',
    probingQuestion: 'If you were the computer executing this line by line, what is the exact state of each variable right before the unexpected outcome occurred?',
    relevantConcepts: ['Mental Model Tracing', 'Rubber Duck Debugging', 'Single Responsibility Principle']
  };
}
