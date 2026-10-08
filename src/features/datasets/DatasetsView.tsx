import React, { useState } from 'react';
import { SYNTHETIC_DATASETS, SyntheticDataset } from '../../content/datasets';
import { useStore, getCurrentStage, getTotalXP } from '../../lib/store';
import { Database, Download, Lock, FileSpreadsheet, Eye } from 'lucide-react';
import styles from './DatasetsView.module.css';

export const DatasetsView: React.FC = () => {
  const { xpEvents } = useStore();
  const xp = getTotalXP(xpEvents);
  const stage = getCurrentStage(xp);
  const isUnlocked = stage.id >= 4; // Unlocked at Stage 4 (Analyst, 4000 XP)

  const [selectedDataset, setSelectedDataset] = useState<SyntheticDataset>(SYNTHETIC_DATASETS[0]);

  const handleDownloadCSV = (dataset: SyntheticDataset) => {
    const headers = dataset.columns.map(c => c.name).join(',');
    const rows = dataset.previewRows.map(row => 
      dataset.columns.map(c => JSON.stringify(row[c.name] ?? '')).join(',')
    ).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${dataset.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isUnlocked) {
    return (
      <div className={styles.lockedContainer}>
        <div className={styles.lockIconBox}>
          <Lock size={36} />
        </div>
        <h2>Synthetic Dataset Explorer Locked</h2>
        <p>
          The Synthetic Dataset Explorer is a professional tool unlocked at <strong>Stage 4: Analyst (4,000 XP)</strong>.
        </p>
        <p className={styles.lockedSub}>
          Continue completing track lessons and exercises to access realistic data tables with export capabilities.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.datasetsContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>STAGE 4 PERK UNLOCKED</div>
        <h1>Synthetic Dataset Explorer</h1>
        <p className={styles.lead}>
          Inspect reproducible synthetic datasets complete with schema dictionaries, realistic edge cases, and CSV export.
        </p>
      </header>

      {/* Dataset Picker Tabs */}
      <div className={styles.datasetTabs}>
        {SYNTHETIC_DATASETS.map((ds) => (
          <button
            key={ds.id}
            className={`${styles.tabBtn} ${selectedDataset.id === ds.id ? styles.activeTab : ''}`}
            onClick={() => setSelectedDataset(ds)}
          >
            <Database size={16} />
            <span>{ds.name}</span>
          </button>
        ))}
      </div>

      {/* Dataset Overview Panel */}
      <section className={styles.infoCard}>
        <div className={styles.cardHeader}>
          <div>
            <h2>{selectedDataset.name}</h2>
            <p className={styles.dsDescription}>{selectedDataset.description}</p>
          </div>
          <button className={styles.downloadBtn} onClick={() => handleDownloadCSV(selectedDataset)}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Data Dictionary */}
        <div className={styles.dictionarySection}>
          <h3>Data Dictionary</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.schemaTable}>
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedDataset.columns.map((col) => (
                  <tr key={col.name}>
                    <td><code>{col.name}</code></td>
                    <td><span className={styles.typeBadge}>{col.type}</span></td>
                    <td>{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Preview */}
        <div className={styles.previewSection}>
          <div className={styles.previewHeader}>
            <Eye size={16} />
            <h3>Sample Records ({selectedDataset.previewRows.length} rows previewed)</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.previewTable}>
              <thead>
                <tr>
                  {selectedDataset.columns.map((col) => (
                    <th key={col.name}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedDataset.previewRows.map((row, idx) => (
                  <tr key={idx}>
                    {selectedDataset.columns.map((col) => (
                      <td key={col.name}>{String(row[col.name] ?? '')}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
