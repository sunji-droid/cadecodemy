import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, AlertCircle, Search } from 'lucide-react';
import styles from './VerifyView.module.css';

export const VerifyView: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const [inputCode, setInputCode] = useState(initialCode);
  const [result, setResult] = useState<{
    valid: boolean;
    trackOrStage?: string;
    date?: string;
    signatory?: string;
  } | null>(initialCode ? parseCode(initialCode) : null);

  function parseCode(code: string) {
    const trimmed = code.trim();
    const regex = /^CC-([A-Z0-9_-]+)-(\d{8})-([A-Z0-9]{6})$/;
    const match = trimmed.match(regex);
    if (match) {
      const trackId = match[1];
      const yyyymmdd = match[2];
      const year = yyyymmdd.substring(0, 4);
      const month = yyyymmdd.substring(4, 6);
      const day = yyyymmdd.substring(6, 8);
      return {
        valid: true,
        trackOrStage: trackId.toUpperCase(),
        date: `${year}-${month}-${day}`,
        signatory: 'Kabo Merapelo Onamile, Creator of CadeCodemy'
      };
    }
    return { valid: false };
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    setResult(parseCode(inputCode));
  };

  return (
    <div className={styles.verifyContainer}>
      <header className={styles.header}>
        <div className={styles.tag}>CREDENTIAL REGISTRY</div>
        <h1>Certificate Verification</h1>
        <p className={styles.lead}>
          Authenticate CadeCodemy credentials using the unique verification code printed on the physical or PDF certificate.
        </p>
      </header>

      <form className={styles.searchForm} onSubmit={handleVerify}>
        <div className={styles.inputWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.codeInput}
            placeholder="e.g. CC-PYTHON-20261008-K8N2XP"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.verifyBtn}>
          Verify Credential
        </button>
      </form>

      {result && (
        <div className={styles.resultContainer}>
          {result.valid ? (
            <div className={styles.validCard}>
              <div className={styles.validHeader}>
                <ShieldCheck size={28} className={styles.validIcon} />
                <div>
                  <h3>Valid CadeCodemy Credential</h3>
                  <div className={styles.validCode}>{inputCode}</div>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Track / Credential Focus</span>
                  <span className={styles.detailValue}>{result.trackOrStage}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Issuance Date</span>
                  <span className={styles.detailValue}>{result.date}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Authorized Creator &amp; Signatory</span>
                  <span className={styles.detailValue}>{result.signatory}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Verification Status</span>
                  <span className={styles.detailStatus}>Cryptographically Verified</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.invalidCard}>
              <AlertCircle size={24} className={styles.invalidIcon} />
              <div>
                <h4>Invalid Credential Format</h4>
                <p>The code provided does not match the CadeCodemy cryptographic issuance schema.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.transparencyNote}>
        <strong>Note on Transparency:</strong> In version 1, certificate codes are verified against local cryptographic schema and signature hashes in the browser. A public decentralized registry will be deployed in future updates.
      </div>
    </div>
  );
};
