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
  Lock,
  ChevronRight
} from 'lucide-react';
import styles from './CertificatesView.module.css';

interface MasterTrackOption {
  id: string;
  title: string;
  type: 'Track Completion' | 'Stage Milestone' | 'Master Academy';
  description: string;
  badgeLabel: string;
  minStageId: number; // 1 = Seedling, 2 = Sprout, 3 = Builder, 4 = Analyst, 5 = Architect, 6 = Master
  requiredXp: number;
}

const CERTIFICATE_CATALOG: MasterTrackOption[] = [
  {
    id: 'stage_1',
    title: 'Stage 1: Seedling of Code Milestone',
    type: 'Stage Milestone',
    description: 'Conferred upon mastering fundamental computational syntax, variable memory bindings, and first-line program execution.',
    badgeLabel: 'STAGE 1 FOUNDATION CREDENTIAL',
    minStageId: 1,
    requiredXp: 0
  },
  {
    id: 'python_track',
    title: 'Professional Python Software Architecture & Data Science',
    type: 'Track Completion',
    description: 'Requires completion of the Python Track and defense of the epidemiological denominator capstone pipeline.',
    badgeLabel: 'TRACK MASTERY DIPLOMA',
    minStageId: 3,
    requiredXp: 2500
  },
  {
    id: 'sql_track',
    title: 'Relational Database Engineering & Analytical Forensics',
    type: 'Track Completion',
    description: 'Requires completion of the Relational SQL Track and cracking The Great Molepolole Cold-Chain Mystery.',
    badgeLabel: 'TRACK MASTERY DIPLOMA',
    minStageId: 4,
    requiredXp: 5000
  },
  {
    id: 'stage_6',
    title: 'Stage 6: Master of the Systems Architecture Milestone',
    type: 'Stage Milestone',
    description: 'Requires attaining Stage 6 through verified XP and passing senior architectural pull request audits.',
    badgeLabel: 'STAGE 6 HONORS MILESTONE',
    minStageId: 6,
    requiredXp: 15000
  },
  {
    id: 'master_grand',
    title: 'Master of Full-Stack Software Engineering & Health Informatics',
    type: 'Master Academy',
    description: 'The supreme institutional credential of CadeCodemy. Unlocked exclusively upon reaching Stage 6 Master tier (15,000 XP) and completing all capstone defenses.',
    badgeLabel: 'HIGHEST INSTITUTIONAL ACADEMIC DIPLOMA',
    minStageId: 6,
    requiredXp: 15000
  }
];

export const CertificatesView: React.FC = () => {
  const { xpEvents, profile } = useStore();
  const xp = getTotalXP(xpEvents);
  const currentStage = getCurrentStage(xp);

  const [recipientName, setRecipientName] = useState(profile.name || 'Kabo Merapelo Onamile');
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [issuedCode, setIssuedCode] = useState<string | null>(null);

  const handleDownloadDiploma = async (cert: MasterTrackOption) => {
    // Progression check: Cannot generate if current stage is below required tier
    if (currentStage.id < cert.minStageId) return;

    setGeneratingId(cert.id);
    const code = generateVerificationCode(cert.id);
    setIssuedCode(code);

    const pdfBytes = await createCertificatePDF({
      learnerName: recipientName.trim() || profile.name || 'Kabo Merapelo Onamile',
      trackOrStageTitle: cert.title,
      type: cert.type,
      dateStr: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verificationCode: code
    });

    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CadeCodemy-${cert.type.replace(/\s+/g, '_')}-${recipientName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setGeneratingId(null);
  };

  return (
    <div className={styles.certContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>INSTITUTIONAL CREDENTIALING PORTAL</div>
        <h1>Official Diplomas &amp; Degrees of Mastery</h1>
        <p className={styles.lead}>
          Credentials reflect earned institutional progression. Higher diplomas unlock automatically as you complete tracks, defend master capstones, and advance through the Six Stages.
        </p>
      </header>

      {/* Recipient Customization Bar */}
      <div className={styles.nameCustomCard}>
        <div className={styles.userStatusRow}>
          <div>
            <label>Candidate Full Name on Diploma:</label>
            <div className={styles.nameInputRow}>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Kabo Merapelo Onamile"
              />
              <span className={styles.nameHint}>Engraved directly onto earned PDF diplomas.</span>
            </div>
          </div>
          <div className={styles.currentTierStatus}>
            <span className={styles.tierLabel}>YOUR CURRENT STATUS</span>
            <strong style={{ color: currentStage.themeColor }}>
              Stage {currentStage.id}: {currentStage.name} ({xp.toLocaleString()} XP)
            </strong>
          </div>
        </div>
      </div>

      {/* Diploma Catalog Grid with Strict Lock Guards */}
      <div className={styles.catalogGrid}>
        {CERTIFICATE_CATALOG.map((cert) => {
          const isUnlocked = currentStage.id >= cert.minStageId;
          const isGenerating = generatingId === cert.id;

          return (
            <div 
              key={cert.id} 
              className={`${styles.diplomaCard} ${!isUnlocked ? styles.lockedCard : ''} ${isUnlocked && cert.id === 'master_grand' ? styles.highestCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.badgeLabel} ${!isUnlocked ? styles.lockedBadgeLabel : ''}`}>
                  {cert.badgeLabel}
                </span>
                <span className={styles.certTypeSmall}>{cert.type}</span>
              </div>

              <h2>{cert.title}</h2>
              <p className={styles.certDesc}>{cert.description}</p>

              <div className={styles.diplomaDetails}>
                <div className={styles.detailRow}>
                  <span>Required Tier:</span>
                  <strong>Stage {cert.minStageId}+ ({cert.requiredXp.toLocaleString()} XP)</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Signatory:</span>
                  <strong>Kabo Merapelo Onamile (Director)</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Verification:</span>
                  <strong>QR Cryptographic Ledger (/verify)</strong>
                </div>
              </div>

              <div className={styles.cardActions}>
                {isUnlocked ? (
                  <button
                    className={`${styles.downloadBtn} ${cert.id === 'master_grand' ? styles.highestBtn : ''}`}
                    onClick={() => handleDownloadDiploma(cert)}
                    disabled={isGenerating}
                  >
                    <Download size={16} />
                    <span>{isGenerating ? 'Compiling PDF...' : 'Download Official Diploma (PDF)'}</span>
                  </button>
                ) : (
                  <button className={styles.lockedBtn} disabled>
                    <Lock size={15} />
                    <span>Locked · Requires Stage {cert.minStageId} ({cert.requiredXp.toLocaleString()} XP)</span>
                  </button>
                )}
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
            <div>Verification Code: <code>{issuedCode}</code>. Verify anytime on the <a href="#/verify">Verification Ledger</a>.</div>
          </div>
        </div>
      )}

      {/* Verification Explanation */}
      <section className={styles.verifyInfoBox}>
        <h3>Cryptographic Verification Notice</h3>
        <p>
          Every credential generated by CadeCodemy carries an immutable hash and QR code that scans directly to our public ledger. You can inspect any verification code on the{' '}
          <a href="#/verify" className={styles.inlineLink}>
            Verification Portal <ExternalLink size={12} />
          </a>.
        </p>
      </section>
    </div>
  );
};
