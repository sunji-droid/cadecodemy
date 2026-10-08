import { describe, it, expect } from 'vitest';
import { ALL_TRACKS } from '../../src/content';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../src/engines';

describe('Every Track Exercise & Solution Verification', () => {
  const py = new PythonEngine();
  const sql = new SQLEngine();
  const js = new JavaScriptEngine();
  const bash = new BashEngine();
  const r = new REngine();

  const getEngine = (trackId: string) => {
    switch (trackId) {
      case 'python': return py;
      case 'sql': return sql;
      case 'javascript': return js;
      case 'bash': return bash;
      case 'r': return r;
      default: return js;
    }
  };

  for (const track of ALL_TRACKS) {
    describe(`Track: ${track.badge}`, () => {
      for (const lesson of track.lessons) {
        it(`Lesson ${lesson.order} (${lesson.title}) exercise solution executes cleanly`, async () => {
          const engine = getEngine(track.id);
          for (const ex of lesson.exercises) {
            const res = await engine.run(ex.solutionCode);
            expect(res.error).toBeUndefined();
            const out = (res.stdout || '').trim();
            expect(out.length).toBeGreaterThan(0);
          }
        });
      }
    });
  }
});
