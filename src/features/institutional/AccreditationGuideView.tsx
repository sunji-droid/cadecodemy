import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Landmark, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Compass,
  ArrowRight,
  Download
} from 'lucide-react';
import styles from './AccreditationGuideView.module.css';

export const AccreditationGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bqa' | 'bdih' | 'smartbots' | 'unis'>('bqa');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>INSTITUTIONAL STRATEGY · BOTSWANA ACCREDITATION &amp; GRANTS</div>
        <h1>Accreditation, National Grants &amp; Institutional Backing</h1>
        <p className={styles.lead}>
          A strategic execution blueprint for Kabo Merapelo Onamile to register CadeCodemy with the <strong>Botswana Qualifications Authority (BQA)</strong>, access seed grant funding from <strong>BDIH (Botswana Innovation Fund)</strong>, and integrate with <strong>SmartBots</strong> and national universities.
        </p>

        {/* Tab Selector */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'bqa' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('bqa')}
          >
            <Landmark size={16} />
            <span>1. BQA Accreditation Roadmap</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'bdih' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('bdih')}
          >
            <Award size={16} />
            <span>2. BDIH Innovation Fund (P20M Pool)</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'smartbots' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('smartbots')}
          >
            <Sparkles size={16} />
            <span>3. SmartBots &amp; Ministry Alignment</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'unis' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('unis')}
          >
            <Building2 size={16} />
            <span>4. Academic Partnerships (UB, BIUST, BAC)</span>
          </button>
        </div>
      </header>

      {/* TAB 1: BQA ROADMAP */}
      {activeTab === 'bqa' && (
        <div className={styles.contentCard}>
          <div className={styles.stepTitle}>
            <ShieldCheck size={20} className={styles.iconAccent} />
            <h2>BQA (Botswana Qualifications Authority) Registration Steps</h2>
          </div>
          <p className={styles.cardLead}>
            Under the Botswana National Credit and Qualifications Framework (BNCQF), CadeCodemy must pursue registration as an <strong>Education and Training Provider (ETP)</strong> in the Short Courses / Non-formal Vocational stream.
          </p>

          <div className={styles.milestoneGrid}>
            <div className={styles.milestone}>
              <div className={styles.stepNumber}>Step 1</div>
              <h4>Register as an Assessor / Trainer</h4>
              <p>
                Submit your personal qualifications (BSc / M&amp;E credentials) to BQA for evaluation and register as an approved Trainer &amp; Assessor in Information &amp; Communications Technology.
              </p>
              <div className={styles.reqTag}>Document: BQA Form for Evaluation &amp; Trainer Registration</div>
            </div>

            <div className={styles.milestone}>
              <div className={styles.stepNumber}>Step 2</div>
              <h4>Register ETP (Education &amp; Training Provider)</h4>
              <p>
                Register CadeCodemy (as a legal entity or consultancy in Botswana) through CIPA, submit Quality Management System (QMS) policies, data privacy guidelines, and assessment standards.
              </p>
              <div className={styles.reqTag}>Standard: QAS 1(4) Criteria &amp; Guidelines</div>
            </div>

            <div className={styles.milestone}>
              <div className={styles.stepNumber}>Step 3</div>
              <h4>Learning Programme Accreditation (LPA)</h4>
              <p>
                Unpack CadeCodemy’s 5 tracks into the <em>BQA Learning Programme Development Guide &amp; Template</em>. Map learning outcomes to NCQF Level 4 and Level 5 descriptors (Foundations to Architect).
              </p>
              <div className={styles.reqTag}>Template: BQA Form A &amp; Credit Mapping</div>
            </div>

            <div className={styles.milestone}>
              <div className={styles.stepNumber}>Step 4</div>
              <h4>Automated Verification Audit</h4>
              <p>
                Present CadeCodemy's live cryptographic verification ledger (<code>/verify?code=...</code>) and automated in-browser unit test harness as proof of tamper-proof assessment integrity.
              </p>
              <div className={styles.reqTag}>Unique Advantage: Zero Paper Fraud Risk</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BDIH FUNDING */}
      {activeTab === 'bdih' && (
        <div className={styles.contentCard}>
          <div className={styles.stepTitle}>
            <Award size={20} className={styles.iconAccent} />
            <h2>Botswana Digital &amp; Innovation Hub (BDIH) &amp; BIF Grants</h2>
          </div>
          <p className={styles.cardLead}>
            The <strong>Botswana Innovation Fund (BIF)</strong> provides non-equity cash grants of up to <strong>P500,000 – P1,500,000</strong> to technology initiatives addressing high-priority national social needs and knowledge-economy transformation.
          </p>

          <div className={styles.grantSection}>
            <div className={styles.grantCard}>
              <h3>Why CadeCodemy Wins BIF Grant Funding:</h3>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Direct Solution to Youth Unemployment:</strong> Provides free, zero-paywall software engineering and data analytics skills to Batswana youth across urban and rural villages.
                </li>
                <li>
                  <strong>Working Product at TRL 7/8 (Technology Readiness Level):</strong> Unlike applicants who only have slide decks, CadeCodemy is fully built, live, offline-capable (PWA), and already incorporates genuine local healthcare datasets from Kweneng District.
                </li>
                <li>
                  <strong>Alignment with Reset Agenda &amp; Vision 2036:</strong> Directly accelerates Botswana’s transition from a resource-based economy to a knowledge-based digital economy.
                </li>
              </ul>
            </div>

            <div className={styles.submissionChecklist}>
              <h4>BDIH Application Preparation Package:</h4>
              <div className={styles.checkItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Executive Summary &amp; Founder Profile (Kabo Merapelo Onamile)</span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Live Repository &amp; Architecture Audit URL (GitHub Pages)</span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Impact Metric: 0-cost, in-browser compilation with zero server bills</span>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>Budget Plan: P350k for national secondary school outreach and Dikgotla workshops</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMARTBOTS */}
      {activeTab === 'smartbots' && (
        <div className={styles.contentCard}>
          <div className={styles.stepTitle}>
            <Sparkles size={20} className={styles.iconAccent} />
            <h2>SmartBots &amp; Ministry of Communications Alignment</h2>
          </div>
          <p className={styles.cardLead}>
            The Government of Botswana, through the <strong>SmartBots</strong> initiative and the <strong>Ministry of Communications, Knowledge and Technology</strong>, has installed free high-speed public Wi-Fi across schools, health clinics, and dikgotla across Botswana.
          </p>

          <div className={styles.synergyCard}>
            <h3>The CadeCodemy + SmartBots Synergy:</h3>
            <p>
              SmartBots provides the connectivity infrastructure; CadeCodemy provides the <strong>digital skills engine</strong> that runs on that infrastructure without consuming user mobile data bundles.
            </p>
            <div className={styles.highlightMetrics}>
              <div className={styles.metric}>
                <strong>Zero Bandwidth</strong>
                <span>Runs 100% in-browser WebAssembly</span>
              </div>
              <div className={styles.metric}>
                <strong>PWA Offline</strong>
                <span>Installable on any mobile phone or Chromebook</span>
              </div>
              <div className={styles.metric}>
                <strong>Dikgotla Ready</strong>
                <span>Ideal for village community ICT workshops</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: UNIVERSITIES */}
      {activeTab === 'unis' && (
        <div className={styles.contentCard}>
          <div className={styles.stepTitle}>
            <Building2 size={20} className={styles.iconAccent} />
            <h2>Tertiary Academic Partnerships (UB, BIUST, BAC, Botho)</h2>
          </div>
          <p className={styles.cardLead}>
            Position CadeCodemy as the official introductory preparatory platform for university computing and data science departments.
          </p>

          <div className={styles.uniGrid}>
            <div className={styles.uniCard}>
              <h4>University of Botswana (UB)</h4>
              <p>
                Partner with the Department of Computer Science and School of Public Health for joint epidemiological computing research and student transition clinics.
              </p>
            </div>
            <div className={styles.uniCard}>
              <h4>BIUST (Palapye)</h4>
              <p>
                Offer the <strong>Algorithms Lab</strong> and <strong>Graph Theory Visualizers</strong> as supplementary lab tutorials for first and second-year engineering undergraduates.
              </p>
            </div>
            <div className={styles.uniCard}>
              <h4>Botswana Accountancy College (BAC)</h4>
              <p>
                Incorporate the <strong>Relational SQL Pipeline</strong> and <strong>Fiftyville Mystery Case Study</strong> into their business analytics and fintech diploma programmes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
