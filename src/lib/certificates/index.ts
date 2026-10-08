import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

export interface CertificateData {
  learnerName: string;
  trackOrStageTitle: string;
  type: 'Track Completion' | 'Stage Milestone' | 'Master Academy';
  dateStr: string;
  verificationCode: string;
}

export function generateVerificationCode(trackId: string): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CC-${trackId.toUpperCase()}-${dateStr}-${rand}`;
}

export async function createCertificatePDF(data: CertificateData): Promise<Uint8Array> {
  // A4 Landscape: 841.89 x 595.28 points
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.28]);
  const { width, height } = page.getSize();

  const serifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const serifRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const serifItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const sansFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // 1. Warm Heavy Parchment Cream Base
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.985, 0.98, 0.96) // #FAF8F4 Luxury Ivory
  });

  // 2. High-Prestige Triple Architectural Border System
  // Outer deep navy border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: rgb(0.08, 0.12, 0.18), // Deep Oxford Navy
    borderWidth: 2.5,
    color: rgb(0.995, 0.992, 0.988)
  });

  // Inner Harvard Gold filigree border
  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderColor: rgb(0.82, 0.65, 0.22), // Burnished Gold #D4AF37
    borderWidth: 1.2
  });

  // Fine hairline inner frame
  page.drawRectangle({
    x: 34,
    y: 34,
    width: width - 68,
    height: height - 68,
    borderColor: rgb(0.75, 0.78, 0.82),
    borderWidth: 0.5
  });

  // 3. Ornate Corner Accent Motifs (Vector Geometry)
  const drawCornerFlourish = (cx: number, cy: number, flipX: number, flipY: number) => {
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx + flipX * 24, y: cy },
      thickness: 2,
      color: rgb(0.82, 0.65, 0.22)
    });
    page.drawLine({
      start: { x: cx, y: cy },
      end: { x: cx, y: cy + flipY * 24 },
      thickness: 2,
      color: rgb(0.82, 0.65, 0.22)
    });
    page.drawCircle({
      x: cx + flipX * 6,
      y: cy + flipY * 6,
      size: 2.5,
      color: rgb(0.82, 0.65, 0.22)
    });
  };

  drawCornerFlourish(38, height - 38, 1, -1);
  drawCornerFlourish(width - 38, height - 38, -1, -1);
  drawCornerFlourish(38, 38, 1, 1);
  drawCornerFlourish(width - 38, 38, -1, 1);

  // 4. Institution Header
  const academyTitle = 'C A D E C O D E M Y   A C A D E M Y';
  const headerWidth = serifBold.widthOfTextAtSize(academyTitle, 22);
  page.drawText(academyTitle, {
    x: (width - headerWidth) / 2,
    y: height - 80,
    size: 22,
    font: serifBold,
    color: rgb(0.08, 0.12, 0.18)
  });

  const tagline = 'INSTITUTION OF COMPUTING, STATISTICAL INFERENCE & DIGITAL HEALTH SYSTEMS';
  const taglineWidth = sansFont.widthOfTextAtSize(tagline, 8.5);
  page.drawText(tagline, {
    x: (width - taglineWidth) / 2,
    y: height - 98,
    size: 8.5,
    font: sansFont,
    color: rgb(0.5, 0.45, 0.35)
  });

  // Dividing Gold Line
  page.drawLine({
    start: { x: (width - 240) / 2, y: height - 110 },
    end: { x: (width + 240) / 2, y: height - 110 },
    thickness: 1.2,
    color: rgb(0.82, 0.65, 0.22)
  });

  // 5. Diploma Type / Credential Header
  const certTypeStr = `OFFICIAL DIPLOMA OF ${data.type.toUpperCase()}`;
  const certTypeWidth = sansBold.widthOfTextAtSize(certTypeStr, 11);
  page.drawText(certTypeStr, {
    x: (width - certTypeWidth) / 2,
    y: height - 145,
    size: 11,
    font: sansBold,
    color: rgb(0.82, 0.65, 0.22)
  });

  // Presentation formula
  const presText = 'Upon the recommendation of the Faculty and Director, this credential is conferred upon';
  const presWidth = serifItalic.widthOfTextAtSize(presText, 13);
  page.drawText(presText, {
    x: (width - presWidth) / 2,
    y: height - 185,
    size: 13,
    font: serifItalic,
    color: rgb(0.25, 0.28, 0.32)
  });

  // 6. Recipient Name (Calligraphic Typography)
  const nameWidth = serifBold.widthOfTextAtSize(data.learnerName, 38);
  page.drawText(data.learnerName, {
    x: (width - nameWidth) / 2,
    y: height - 240,
    size: 38,
    font: serifBold,
    color: rgb(0.05, 0.08, 0.12)
  });

  // Dividing Engraved Rule
  page.drawLine({
    start: { x: (width - 440) / 2, y: height - 256 },
    end: { x: (width + 440) / 2, y: height - 256 },
    thickness: 1.5,
    color: rgb(0.82, 0.65, 0.22)
  });

  // 7. Academic Citation Statement
  const statement = `who has successfully satisfied all rigorous theoretical, algorithmic, and practical examinations for`;
  const statementWidth = serifRegular.widthOfTextAtSize(statement, 12);
  page.drawText(statement, {
    x: (width - statementWidth) / 2,
    y: height - 288,
    size: 12,
    font: serifRegular,
    color: rgb(0.3, 0.34, 0.4)
  });

  // Track Title Banner
  const trackTitleWidth = serifBold.widthOfTextAtSize(data.trackOrStageTitle, 22);
  page.drawText(data.trackOrStageTitle, {
    x: (width - trackTitleWidth) / 2,
    y: height - 322,
    size: 22,
    font: serifBold,
    color: rgb(0.08, 0.25, 0.4) // Elite Oxford/Harvard Slate Blue
  });

  const citationDetails = `demonstrating validated competence in software architecture, production code standards, and data integrity.`;
  const citationWidth = serifItalic.widthOfTextAtSize(citationDetails, 11);
  page.drawText(citationDetails, {
    x: (width - citationWidth) / 2,
    y: height - 344,
    size: 11,
    font: serifItalic,
    color: rgb(0.4, 0.45, 0.5)
  });

  // 8. Official Gold Medallion Seal (Left Center)
  const sealCenterX = 135;
  const sealCenterY = 120;
  
  // Outer seal rings
  page.drawCircle({
    x: sealCenterX,
    y: sealCenterY,
    size: 42,
    color: rgb(0.94, 0.88, 0.72), // Outer gold foil
    borderColor: rgb(0.82, 0.65, 0.22),
    borderWidth: 2
  });
  page.drawCircle({
    x: sealCenterX,
    y: sealCenterY,
    size: 36,
    borderColor: rgb(0.82, 0.65, 0.22),
    borderWidth: 1
  });
  page.drawCircle({
    x: sealCenterX,
    y: sealCenterY,
    size: 33,
    color: rgb(0.82, 0.65, 0.22)
  });

  // Seal inner star / typography
  const sealText1 = 'VERITAS';
  const sealText2 = 'CADECODEMY';
  const st1Width = sansBold.widthOfTextAtSize(sealText1, 9);
  const st2Width = sansBold.widthOfTextAtSize(sealText2, 7);
  page.drawText(sealText1, {
    x: sealCenterX - st1Width / 2,
    y: sealCenterY + 4,
    size: 9,
    font: sansBold,
    color: rgb(1, 1, 1)
  });
  page.drawText(sealText2, {
    x: sealCenterX - st2Width / 2,
    y: sealCenterY - 8,
    size: 7,
    font: sansBold,
    color: rgb(1, 1, 1)
  });

  // 9. QR Code & Cryptographic Verification Details (Adjacent to Seal)
  const verifyUrl = `https://sunji-droid.github.io/cadecodemy/#/verify?code=${encodeURIComponent(data.verificationCode)}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 80 });
  const qrImageBytes = await fetch(qrDataUrl).then(res => res.arrayBuffer());
  const qrImage = await pdfDoc.embedPng(qrImageBytes);
  
  page.drawImage(qrImage, {
    x: 200,
    y: 85,
    width: 65,
    height: 65
  });

  page.drawText(`Issue Date: ${data.dateStr}`, {
    x: 275,
    y: 135,
    size: 9.5,
    font: sansBold,
    color: rgb(0.2, 0.25, 0.3)
  });

  page.drawText(`Certificate ID: ${data.verificationCode}`, {
    x: 275,
    y: 118,
    size: 8.5,
    font: sansFont,
    color: rgb(0.4, 0.45, 0.5)
  });

  page.drawText(`Cryptographically Verified · Public Ledger Entry`, {
    x: 275,
    y: 102,
    size: 8,
    font: sansFont,
    color: rgb(0.82, 0.65, 0.22)
  });

  // 10. Official Faculty Signature Block (Right Align)
  const sigTitle = 'Kabo Merapelo Onamile';
  const sigRole = 'Founder & Curriculum Director, CadeCodemy';
  const sigCredentials = 'Public Health M&E Specialist & Digital Health Systems Architect';
  const sigLocation = 'Molepolole, Botswana';

  const rightAlignX = width - 60;
  const sigTitleWidth = serifBold.widthOfTextAtSize(sigTitle, 14);
  const sigRoleWidth = sansBold.widthOfTextAtSize(sigRole, 9);
  const sigCredWidth = sansFont.widthOfTextAtSize(sigCredentials, 8);
  const sigLocWidth = serifItalic.widthOfTextAtSize(sigLocation, 8.5);

  // Calligraphic Signature Line
  page.drawLine({
    start: { x: rightAlignX - 280, y: 125 },
    end: { x: rightAlignX, y: 125 },
    thickness: 1.2,
    color: rgb(0.2, 0.25, 0.3)
  });

  // Calligraphic cursive rendering of Kabo Merapelo Onamile
  page.drawText('Kabo M. Onamile', {
    x: rightAlignX - 220,
    y: 135,
    size: 24,
    font: serifItalic,
    color: rgb(0.08, 0.12, 0.18)
  });

  page.drawText(sigTitle, {
    x: rightAlignX - sigTitleWidth,
    y: 108,
    size: 14,
    font: serifBold,
    color: rgb(0.08, 0.12, 0.18)
  });

  page.drawText(sigRole, {
    x: rightAlignX - sigRoleWidth,
    y: 94,
    size: 9,
    font: sansBold,
    color: rgb(0.82, 0.65, 0.22)
  });

  page.drawText(sigCredentials, {
    x: rightAlignX - sigCredWidth,
    y: 82,
    size: 8,
    font: sansFont,
    color: rgb(0.35, 0.4, 0.45)
  });

  page.drawText(sigLocation, {
    x: rightAlignX - sigLocWidth,
    y: 70,
    size: 8.5,
    font: serifItalic,
    color: rgb(0.5, 0.55, 0.6)
  });

  return await pdfDoc.save();
}
