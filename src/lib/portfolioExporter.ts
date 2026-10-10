import { UserProfile, ProgressState } from './store';
import { XPEvent } from '../types';

export function generatePortfolioMarkdown(state: ProgressState): string {
  const learnerName = state.profile?.name || 'CadeCodemy Learner';
  const totalXP = state.xpEvents.reduce((sum: number, e: XPEvent) => sum + e.amount, 0);
  const completedLessonsCount = Object.keys(state.completedLessons).length;
  const completedExercisesCount = Object.keys(state.completedExercises).length;
  const streak = state.longestStreak || 1;

  return `# ${learnerName} — Developer & Health Data Portfolio

> Auto-generated from practical completions on [CadeCodemy](https://sunji-droid.github.io/cadecodemy/)  
> Founder & Systems Architect: **Kabo Merapelo Onamile**  
> Verifiable Credential Portal: [Verify Credentials](https://sunji-droid.github.io/cadecodemy/#/verify)

---

## 🏆 Verified Milestones & Competencies

- **Total Experience Earned:** \`${totalXP} XP\`
- **Interactive Exercises Passed:** \`${completedExercisesCount} Completed\`
- **Core Lessons Mastered:** \`${completedLessonsCount} Completed\`
- **Longest Practice Streak:** \`${streak} Days\`

---

## 🛠️ Technical Capabilities & Sandbox Work

### 1. Python for Data & Systems
- In-browser execution of algorithmic logic, string formatting, and list comprehension.
- Applied epidemiological modeling calculating vaccine coverage denominators and drop-out rates.

### 2. Relational Analytics & SQL
- Declarative querying across SQLite tables (\`clinics\`, \`stock\`, \`logs\`).
- Complex query authoring: Common Table Expressions (CTEs), multi-table \`INNER JOIN\`s, and \`ROW_NUMBER() OVER()\` window functions.
- Solved *The Great Molepolole Cold-Chain Mystery* through forensic relational audit logs.

### 3. Modern JavaScript & Web Systems
- Asynchronous data fetching with \`fetch()\` and \`async/await\`.
- Client-side persistence strategies with IndexedDB and \`localStorage\` for low-bandwidth environments.

### 4. Bash & Terminal Operations
- Standard Unix pipes, stream redirection (\`>\`, \`>>\`, \`2>&1\`), and pattern filtering with \`grep\`.
- Shell scripting with POSIX exit codes (\`$?\`) for automated data validation pipelines.

### 5. R & Statistical Computing
- Vectorized operations with \`c()\`, data frames, and summary statistics.
- Linear modeling formulas (\`lm(y ~ x)\`) and \`ggplot2\` aesthetic mappings.

---

## 📄 Cryptographic Verification
Certificates issued by CadeCodemy carry SHA-256 tamper-evident integrity hashes.  
Public Verification Engine: \`https://sunji-droid.github.io/cadecodemy/#/verify\`
`;
}

export function downloadPortfolioZip(state: any): void {
  const md = generatePortfolioMarkdown(state);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'CADECODEMY_GITHUB_PORTFOLIO.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
