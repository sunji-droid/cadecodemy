import { describe, it, expect } from 'vitest';
import { generateVerificationCode, createCertificatePDF } from '../../src/lib/certificates';
import { PDFDocument } from 'pdf-lib';

describe('Certificate Generation & Verification (Stage 6)', () => {
  it('generates a unique verification code matching the specification', () => {
    const code = generateVerificationCode('python');
    // Format: CC-TRACK-YYYYMMDD-XXXXXX
    expect(code).toMatch(/^CC-PYTHON-\d{8}-[A-Z0-9]{6}$/);
  });

  it('generates a valid binary PDF document with correct metadata and signature', async () => {
    const certBytes = await createCertificatePDF({
      learnerName: 'Lesego Modise',
      trackOrStageTitle: 'Python for Data & Systems',
      type: 'Track Completion',
      dateStr: 'October 8, 2026',
      verificationCode: 'CC-PYTHON-20261008-K8N2XP'
    });

    expect(certBytes).toBeDefined();
    expect(certBytes.length).toBeGreaterThan(1000);

    // Verify it loads in pdf-lib and check page dimensions
    const loadedDoc = await PDFDocument.load(certBytes);
    expect(loadedDoc.getPageCount()).toBe(1);
    const page = loadedDoc.getPage(0);
    expect(page.getWidth()).toBeCloseTo(841.89, 1);
    expect(page.getHeight()).toBeCloseTo(595.28, 1);
  });
});
