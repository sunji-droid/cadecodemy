import { describe, it, expect } from 'vitest';
import { ALL_TRACKS } from '../../src/content';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../src/engines';

describe('Curriculum Content Verification', () => {
  const pyEngine = new PythonEngine();
  const sqlEngine = new SQLEngine();
  const jsEngine = new JavaScriptEngine();
  const bashEngine = new BashEngine();
  const rEngine = new REngine();

  it('contains all 5 core tracks', () => {
    const ids = ALL_TRACKS.map(t => t.id);
    expect(ids).toContain('python');
    expect(ids).toContain('sql');
    expect(ids).toContain('javascript');
    expect(ids).toContain('bash');
    expect(ids).toContain('r');
  });

  it('runs all Python lesson starter snippets without throwing errors', async () => {
    const pyTrack = ALL_TRACKS.find(t => t.id === 'python')!;
    for (const lesson of pyTrack.lessons) {
      const res = await pyEngine.run(lesson.codeSnippet);
      expect(res.stderr).toBe('');
      expect(res.stdout.length).toBeGreaterThan(0);
    }
  });

  it('runs all SQL lesson starter snippets successfully', async () => {
    const sqlTrack = ALL_TRACKS.find(t => t.id === 'sql')!;
    for (const lesson of sqlTrack.lessons) {
      const res = await sqlEngine.run(lesson.codeSnippet);
      expect(res.stderr).toBe('');
    }
  });

  it('runs all JavaScript lesson starter snippets without errors', async () => {
    const jsTrack = ALL_TRACKS.find(t => t.id === 'javascript')!;
    for (const lesson of jsTrack.lessons) {
      const res = await jsEngine.run(lesson.codeSnippet);
      expect(res.error).toBeUndefined();
    }
  });

  it('runs all Bash commands without syntax failure', async () => {
    const bashTrack = ALL_TRACKS.find(t => t.id === 'bash')!;
    for (const lesson of bashTrack.lessons) {
      const res = await bashEngine.run(lesson.codeSnippet);
      expect(res.error).toBeUndefined();
    }
  });

  it('runs all R starter snippets successfully', async () => {
    const rTrack = ALL_TRACKS.find(t => t.id === 'r')!;
    for (const lesson of rTrack.lessons) {
      const res = await rEngine.run(lesson.codeSnippet);
      expect(res.stdout.length).toBeGreaterThan(0);
    }
  });
});
