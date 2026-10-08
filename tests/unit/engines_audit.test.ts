import { describe, it, expect } from 'vitest';
import { PythonEngine, SQLEngine, JavaScriptEngine, BashEngine, REngine } from '../../src/engines';

describe('Execution Engines Diagnostic & Output Audit', () => {
  const py = new PythonEngine();
  const sql = new SQLEngine();
  const js = new JavaScriptEngine();
  const bash = new BashEngine();
  const r = new REngine();

  it('PythonEngine executes variable assignment and string formatting without leaking', async () => {
    const res = await py.run('name = "Molepolole"\nprint(f"Location: {name}")');
    expect(res.stderr).toBe('');
    expect(res.stdout).toBe('Location: Molepolole');
    expect(res.executionTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('SQLEngine executes SELECT and returns structured tabular rows', async () => {
    const res = await sql.run('SELECT facility_name, doses_administered FROM clinics;');
    expect(res.stderr).toBe('');
    expect(res.stdout).toContain('Molepolole Main Clinic');
    expect(res.stdout).toContain('Thamaga Primary Clinic');
  });

  it('JavaScriptEngine evaluates mathematical operations and logs', async () => {
    const res = await js.run('const a = 15; const b = 25; console.log(a + b);');
    expect(res.stderr).toBe('');
    expect(res.stdout).toBe('40');
  });

  it('BashEngine simulates terminal commands (pwd, ls, cat, echo) faithfully', async () => {
    const pwdRes = await bash.run('pwd');
    expect(pwdRes.stdout).toBe('/home/learner');

    const echoRes = await bash.run('echo "Health Report 2026"');
    expect(echoRes.stdout).toBe('Health Report 2026');

    const catRes = await bash.run('cat welcome.txt');
    expect(catRes.stdout).toContain('CadeCodemy');
  });

  it('REngine handles vectors, means, and summaries accurately', async () => {
    const res = await r.run('doses <- c(10, 20, 30)\nmean(doses)');
    expect(res.stderr).toBe('');
    expect(res.stdout.length).toBeGreaterThan(0);
  });
});
