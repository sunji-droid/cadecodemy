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

  const serifFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const sansFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // Background warm paper tone
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.97, 0.96, 0.94) // #F7F5F0
  });

  // Dual outer/inner borders
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: rgb(0.1, 0.12, 0.16),
    borderWidth: 2,
    color: rgb(0.99, 0.98, 0.97)
  });

  page.drawRectangle({
    x: 32,
    y: 32,
    width: width - 64,
    height: height - 64,
    borderColor: rgb(0.85, 0.45, 0.1), // Ember accent
    borderWidth: 1
  });

  // Header Title
  const academyTitle = 'C A D E C O D E M Y';
  const headerWidth = sansBold.widthOfTextAtSize(academyTitle, 22);
  page.drawText(academyTitle, {
    x: (width - headerWidth) / 2,
    y: height - 85,
    size: 22,
    font: sansBold,
    color: rgb(0.1, 0.12, 0.16)
  });

  const tagline = 'From first line to full mastery';
  const taglineWidth = italicFont.widthOfTextAtSize(tagline, 13);
  page.drawText(tagline, {
    x: (width - taglineWidth) / 2,
    y: height - 105,
    size: 13,
    font: italicFont,
    color: rgb(0.4, 0.45, 0.5)
  });

  // Certificate Type
  const certTypeStr = `CERTIFICATE OF ${data.type.toUpperCase()}`;
  const certTypeWidth = sansFont.widthOfTextAtSize(certTypeStr, 12);
  page.drawText(certTypeStr, {
    x: (width - certTypeWidth) / 2,
    y: height - 150,
    size: 12,
    font: sansFont,
    color: rgb(0.85, 0.45, 0.1)
  });

  // Presentation text
  const presText = 'This is proudly presented to';
  const presWidth = italicFont.widthOfTextAtSize(presText, 14);
  page.drawText(presText, {
    x: (width - presWidth) / 2,
    y: height - 190,
    size: 14,
    font: italicFont,
    color: rgb(0.3, 0.35, 0.4)
  });

  // Recipient Name
  const nameWidth = serifFont.widthOfTextAtSize(data.learnerName, 36);
  page.drawText(data.learnerName, {
    x: (width - nameWidth) / 2,
    y: height - 245,
    size: 36,
    font: serifFont,
    color: rgb(0.08, 0.1, 0.14)
  });

  // Dividing rule under name
  page.drawLine({
    start: { x: (width - 400) / 2, y: height - 260 },
    end: { x: (width + 400) / 2, y: height - 260 },
    thickness: 1,
    color: rgb(0.7, 0.72, 0.75)
  });

  // Accomplishment text
  const statement = `for successfully demonstrating verified mastery in`;
  const statementWidth = sansFont.widthOfTextAtSize(statement, 13);
  page.drawText(statement, {
    x: (width - statementWidth) / 2,
    y: height - 295,
    size: 13,
    font: sansFont,
    color: rgb(0.3, 0.35, 0.4)
  });

  const trackTitleWidth = sansBold.widthOfTextAtSize(data.trackOrStageTitle, 20);
  page.drawText(data.trackOrStageTitle, {
    x: (width - trackTitleWidth) / 2,
    y: height - 325,
    size: 20,
    font: sansBold,
    color: rgb(0.15, 0.4, 0.55) // Ocean tone
  });

  // Date and details
  const issueDateStr = `Issued on ${data.dateStr}`;
  page.drawText(issueDateStr, {
    x: 70,
    y: 110,
    size: 11,
    font: sansFont,
    color: rgb(0.35, 0.4, 0.45)
  });

  const codeLabel = `Verification Code: ${data.verificationCode}`;
  page.drawText(codeLabel, {
    x: 70,
    y: 92,
    size: 10,
    font: sansFont,
    color: rgb(0.5, 0.55, 0.6)
  });

  // QR Code generation
  const verifyUrl = `https://cadecodemy.org/verify?code=${encodeURIComponent(data.verificationCode)}`;
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 80 });
  const qrImageBytes = await fetch(qrDataUrl).then(res => res.arrayBuffer());
  const qrImage = await pdfDoc.embedPng(qrImageBytes);
  page.drawImage(qrImage, {
    x: 70,
    y: 125,
    width: 65,
    height: 65
  });

  // Mandatory Creator Signature Block (Section 3 & 7)
  const sigTitle = 'Kabo Merapelo Onamile, Creator of CadeCodemy';
  const sigSub = 'Public Health M&E Specialist & Digital Health Systems Developer';
  const sigLoc = 'Molepolole, Botswana';

  const sigTitleWidth = sansBold.widthOfTextAtSize(sigTitle, 12);
  const sigSubWidth = sansFont.widthOfTextAtSize(sigSub, 9.5);
  const sigLocWidth = italicFont.widthOfTextAtSize(sigLoc, 9.5);

  const rightAlignX = width - 70;

  // Signature line
  page.drawLine({
    start: { x: rightAlignX - 320, y: 130 },
    end: { x: rightAlignX, y: 130 },
    thickness: 1,
    color: rgb(0.2, 0.25, 0.3)
  });

  // Stylized calligraphic representation of Kabo Merapelo Onamile
  page.drawText('Kabo M. Onamile', {
    x: rightAlignX - 220,
    y: 140,
    size: 20,
    font: italicFont,
    color: rgb(0.12, 0.16, 0.24)
  });

  page.drawText(sigTitle, {
    x: rightAlignX - sigTitleWidth,
    y: 110,
    size: 12,
    font: sansBold,
    color: rgb(0.1, 0.12, 0.16)
  });

  page.drawText(sigSub, {
    x: rightAlignX - sigSubWidth,
    y: 95,
    size: 9.5,
    font: sansFont,
    color: rgb(0.35, 0.4, 0.45)
  });

  page.drawText(sigLoc, {
    x: rightAlignX - sigLocLoc(sigLocWidth, rightAlignX),
    y: 80,
    size: 9.5,
    font: italicFont,
    color: rgb(0.45, 0.5, 0.55)
  });

  return await pdfDoc.save();
}

function sigLocLoc(width: number, right: number) {
  return width;
}
