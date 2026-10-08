import fs from 'fs';
import path from 'path';

// Banned words & phrases from Section 9.1 of Master Build Prompt & Field Guide
const BANNED_WORDS = [
  'delve', 'delves', 'delving',
  'tapestry',
  'testament',
  'realm',
  'landscape', // checked in context
  'underscore', 'underscores', 'underscoring', 'underscored',
  'showcase', 'showcases', 'showcasing', 'showcased',
  'foster', 'fosters', 'fostering', 'fostered',
  'resonate', 'resonates', 'resonating',
  'navigate', 'navigates', 'navigating', // checked in context
  'pivotal',
  'intricate',
  'meticulous',
  'paramount',
  'crucial',
  'commendable',
  'unwavering',
  'multifaceted',
  'leverage', 'leverages', 'leveraging', 'leveraged',
  'utilize', 'utilizes', 'utilizing', 'utilized',
  'facilitate', 'facilitates', 'facilitating',
  'embark', 'embarks', 'embarking',
  'endeavor', 'endeavors',
  'garner', 'garners', 'garnering',
  'bolster', 'bolsters', 'bolstering',
  'elucidate',
  'interplay',
  'vibrant',
  'compelling',
  'surpass',
  'seamless', 'seamlessly',
  'cutting-edge',
  'game-changer',
  'unlock', 'unlocks', 'unlocking', // checked in figurative context vs technical stage unlock
  'empower', 'empowers', 'empowering',
  'journey', // checked in context
  'elevate', 'elevates', 'elevating',
  'harness', 'harnesses', 'harnessing',
  'dive into', "let's dive in",
  "in today's fast-paced world",
  'in the ever-evolving landscape',
  "it's important to note",
  "it's worth noting",
  'happy coding!',
  'keep learning!'
];

// Negative parallelism patterns: "not only... but also", "not just... but", "it's not X, it's Y"
const BANNED_PATTERNS = [
  /\bnot\s+just\b/i,
  /\bnot\s+only\b[\s\S]{1,40}\bbut\s+also\b/i,
  /\bit's\s+not\b[\s\S]{1,30}\bit's\b/i,
  /\bserves\s+as\b/i,
  /\bstands\s+as\b/i,
  /\bfunctions\s+as\b/i,
  /\bacts\s+as\b/i
];

// Emoji regex for body text
const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, lineNum) => {
    // Ignore code blocks or comments if needed, but in content files all text matters
    const lower = line.toLowerCase();
    
    // Check banned phrases
    for (const phrase of BANNED_WORDS) {
      // Word boundary check for single words, direct check for phrases
      const regex = phrase.includes(' ') 
        ? new RegExp(phrase, 'i') 
        : new RegExp(`\\b${phrase}\\b`, 'i');
      
      // Permit specific technical contexts: perk unlocked, stage unlocked, unlock code, robust in stats
      if (regex.test(lower)) {
        if (phrase.startsWith('unlock') && (lower.includes('perk') || lower.includes('stage') || lower.includes('unlockedat') || lower.includes('isunlocked'))) {
          continue;
        }
        if (phrase === 'robust' && (lower.includes('regression') || lower.includes('robust statistics') || lower.includes('robust standard'))) {
          continue;
        }
        violations.push({ line: lineNum + 1, issue: `Banned word/phrase: "${phrase}"`, text: line.trim() });
      }
    }

    // Check banned patterns
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({ line: lineNum + 1, issue: `Banned construction pattern: ${pattern}`, text: line.trim() });
      }
    }

    // Check emojis in lesson text
    if (EMOJI_REGEX.test(line)) {
      violations.push({ line: lineNum + 1, issue: 'Emoji detected in copy (icons must be SVG)', text: line.trim() });
    }
  });

  return violations;
}

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        scanDir(fullPath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.md')) {
      // focus on content, app, and docs
      if (fullPath.includes('/content/') || fullPath.includes('/features/about') || fullPath.includes('CONTENT-GUIDE')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

console.log('--- CadeCodemy Style Checker (Section 9.4 Enforcement) ---');
const contentFiles = scanDir('./src');
let totalViolations = 0;

for (const file of contentFiles) {
  const violations = scanFile(file);
  if (violations.length > 0) {
    console.error(`\n[FAIL] ${file}:`);
    for (const v of violations) {
      console.error(`  Line ${v.line}: ${v.issue}`);
      console.error(`    > ${v.text}`);
      totalViolations++;
    }
  }
}

if (totalViolations > 0) {
  console.error(`\nCheck failed with ${totalViolations} style violations.`);
  process.exit(1);
} else {
  console.log(`\nScan passed! Clean copy across ${contentFiles.length} checked files.`);
  process.exit(0);
}
