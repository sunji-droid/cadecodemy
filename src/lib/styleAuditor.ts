export interface Style50Result {
  score: number; // 0 to 1.0 (e.g. 0.95 = 95%)
  grade: 'A' | 'B' | 'C' | 'Needs Work';
  metrics: {
    lineCount: number;
    commentDensity: number; // percentage
    namingConventionIssues: string[];
    longLines: number;
    formattingAlerts: string[];
  };
  recommendations: string[];
}

export function auditStyle50(code: string, language: string): Style50Result {
  const lines = code.split('\n');
  const lineCount = lines.length;
  let commentLines = 0;
  let longLines = 0;
  const namingIssues: string[] = [];
  const formattingAlerts: string[] = [];

  const isPython = language.toLowerCase().includes('py');
  const isSQL = language.toLowerCase().includes('sql');
  const isJS = language.toLowerCase().includes('js');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.length > 88) {
      longLines++;
    }

    if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('--')) {
      commentLines++;
    }

    // Check snake_case vs camelCase conventions for Python
    if (isPython) {
      const match = trimmed.match(/def\s+([A-Z][a-zA-Z0-9_]*)\s*\(/);
      if (match) {
        namingIssues.push(`Line ${index + 1}: Function '${match[1]}' uses PascalCase. PEP 8 standard requires snake_case.`);
      }
    }

    // Check uppercase keywords for SQL
    if (isSQL) {
      if (/^\s*(select|from|where|group by|order by|join)\s+/i.test(line) && !/^\s*(SELECT|FROM|WHERE|GROUP BY|ORDER BY|JOIN)\b/.test(line)) {
        formattingAlerts.push(`Line ${index + 1}: Standard SQL style dictates capitalizing core keywords like SELECT, FROM, and WHERE.`);
      }
    }

    // Trailing whitespace
    if (/\s+$/.test(line)) {
      formattingAlerts.push(`Line ${index + 1}: Trailing whitespace detected.`);
    }
  });

  const commentDensity = lineCount > 0 ? Math.round((commentLines / lineCount) * 100) : 0;
  
  const recommendations: string[] = [];
  let deduction = 0;

  if (longLines > 0) {
    recommendations.push(`Wrap ${longLines} line(s) exceeding 88 characters for terminal readability.`);
    deduction += Math.min(0.2, longLines * 0.05);
  }

  if (commentDensity < 15 && lineCount > 4) {
    recommendations.push('Add contextual documentation comments explaining logic and variable intent.');
    deduction += 0.15;
  }

  if (namingIssues.length > 0) {
    recommendations.push(...namingIssues);
    deduction += 0.15;
  }

  if (formattingAlerts.length > 0) {
    deduction += Math.min(0.2, formattingAlerts.length * 0.05);
  }

  const score = Math.max(0.4, Number((1.0 - deduction).toFixed(2)));
  let grade: 'A' | 'B' | 'C' | 'Needs Work' = 'A';
  if (score < 0.7) grade = 'Needs Work';
  else if (score < 0.8) grade = 'C';
  else if (score < 0.9) grade = 'B';

  return {
    score,
    grade,
    metrics: {
      lineCount,
      commentDensity,
      namingConventionIssues: namingIssues,
      longLines,
      formattingAlerts: formattingAlerts.slice(0, 3)
    },
    recommendations
  };
}
