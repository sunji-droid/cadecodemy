import React, { useState } from 'react';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { createCertificatePDF, generateVerificationCode } from '../../lib/certificates';
import { 
  FileCheck, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  GraduationCap,
  Layers,
  ChevronRight
} from 'lucide-react';
import styles from './CertificatesView.module.css';

interface MasterTrackOption {
  id: string;
  title: string;
  type: 'Track Completion' | 'Stage Milestone' | 'Master Academy';
  description: string;
  badgeLabel: string;
}

const CERTIFICATE_CATALOG: MasterTrackOption[] = [
  {
    id: 'master_grand',
    title: 'Master of Full-Stack Software Engineering & Health Informatics',
    type: 'Master Academy',
    description: 'The highest institutional credential awarded by CadeCodemy. Certifies comprehensive mastery across all 5 languages, distributed system architectures, and epidemiological telemetry pipelines.',
    badgeLabel: 'HIGHEST INSTITUTIONAL ACADEMIC DIPLOMA'
  },
  {
    id: 'python_track',
    title: 'Professional Python Software Architecture & Data Science',
    type: 'Track Completion',
    description: 'Certifies mastery in Python 3, functional data pipelines, automated clinical denominator calculations, and object-oriented architecture.',
    badgeLabel: 'TRACK MASTERY DIPLOMA'
  },
  {
    id: 'sql_track',
    title: 'Relational Database Engineering & Analytical Forensics',
    type: 'Track Completion',
    description: 'Certifies advanced relational schema modeling, Common Table Expressions (CTEs), window functions, and forensic data audits.',
    badgeLabel: 'TRACK MASTERY DIPLOMA'
  },
  {
    id: 'stage_6',
    title: 'Stage 6: Master of the Systems Architecture Milestone',
    type: 'Stage Milestone',
    description: 'Certifies attainment of Stage 6 (15,000 XP) and defense of senior architectural pull requests.',
    badgeLabel: 'STAGE 6 HONORS MILESTONE'
  }
];

export const CertificatesView: React.FC = () => {
  const { xpEvents, profile } = useStore();
  const xp = getTotalXP(xpEvents);
  const currentStage = getCurrentStage(xp);

  const [selectedCert, setSelectedCert] = useState<MasterTrackOption>(CERTIFICATE_CATALOG[0]);
  const [recipientName, setRecipientName] = useState(profile.name || 'Kabo Merapelo Onamile');
  const [generating, setGenerating] = useState(false);
  const [issuedCode, setIssuedCode] = useState<string | null>(null);

  const handleDownloadDiploma = async (cert: MasterTrackOption) => {
    setGenerating(true);
    const code = generateVerificationCode(cert.id);
    setIssuedCode(code);

    const pdfBytes = await createCertificatePDF({
      learnerName: recipientName.trim() || 'Kabo Merapelo Onamile',
      trackOrStageTitle: cert.title,
      type: cert.type,
      dateStr: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verificationCode: code
    });

    // Trigger download
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CadeCodemy-${cert.type.replace(/\s+/g, '_')}-${recipientName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setGenerating(false);
  };

  return (
    <div className={styles.certContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>INSTITUTIONAL CREDENTIALING PORTAL</div>
        <h1>Official Diplomas &amp; Degrees of Mastery</h1>
        <p className={styles.lead}>
          Generate, preview, and download cryptographically signed, A4 landscape university-grade diplomas with gold filigree and verification QR seals.
        </p>
      </header>

      {/* Recipient Customization Bar */}
      <div className={styles.nameCustomCard}>
        <label>Candidate Full Name on Diploma:</label>
        <div className={styles.nameInputRow}>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="e.g. Kabo Merapelo Onamile"
          />
          <span className={styles.nameHint}>This exact name will be engraved onto the vector diploma.</span>
        </div>
      </div>

      {/* Diploma Catalog Grid */}
      <div className={styles.catalogGrid}>
        {CERTIFICATE_CATALOG.map((cert) => {
          const isHighest = cert.id === 'master_grand';
          return (
            <div 
              key={cert.id} 
              className={`${styles.diplomaCard} ${isHighest ? styles.highestCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.badgeLabel} ${isHighest ? styles.highestBadge : ''}`}>
                  {cert.badgeLabel}
                </span>
                <span className={styles.certTypeSmall}>{cert.type}</span>
              </div>

              <h2>{cert.title}</h2>
              <p className={styles.certDesc}>{cert.description}</p>

              <div className={styles.diplomaDetails}>
                <div className={styles.detailRow}>
                  <span>Accreditation Standard:</span>
                  <strong>BQA NCQF Level 5 &amp; Harvard CS50 Aligned</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Signatory:</span>
                  <strong>Kabo Merapelo Onamile (Director)</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Security:</span>
                  <strong>QR Cryptographic Ledger (/verify)</strong>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button
                  className={`${styles.downloadBtn} ${isHighest ? styles.highestBtn : ''}`}
                  onClick={() => handleDownloadDiploma(cert)}
                  disabled={generating}
                >
                  <Download size={16} />
                  <span>{generating ? 'Generating PDF...' : 'Download Official Master Diploma (PDF)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {issuedCode && (
        <div className={styles.codeSuccessBox}>
          <ShieldCheck size={20} className={styles.shieldIcon} />
          <div>
            <strong>Diploma Generated Successfully!</strong>
            <div>Verification Code: <code>{issuedCode}</code>. Test it live anytime on the <a href="#/verify">Verification Ledger</a>.</div>
          </div>
        </div>
      )}

      {/* Verification Explanation */}
      <section className={styles.verifyInfoBox}>
        <h3>Cryptographic Verification Notice</h3>
        <p>
          Every credential generated by CadeCodemy carries a deterministic hash and QR code that scans directly to our public ledger. You can inspect any verification code on the{' '}
          <a href="#/verify" className={styles.inlineLink}>
            Verification Portal <ExternalLink size={12} />
          </a>.
        </p>
      </section>
    </div>
  );
};
