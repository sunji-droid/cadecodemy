import React, { useState } from 'react';
import { 
  Binary, 
  RotateCcw, 
  Zap, 
  Layers, 
  HelpCircle, 
  Sparkles,
  Info
} from 'lucide-react';
import styles from './BitwiseLabView.module.css';

type BitOp = 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR';

export const BitwiseLabView: React.FC = () => {
  const [numA, setNumA] = useState<number>(42);
  const [numB, setNumB] = useState<number>(25);
  const [operation, setOperation] = useState<BitOp>('AND');

  const to8Bit = (val: number) => {
    const clamped = (val & 0xff);
    return clamped.toString(2).padStart(8, '0');
  };

  const computeResult = (): number => {
    const a = numA & 0xff;
    const b = numB & 0xff;
    switch (operation) {
      case 'AND': return (a & b) & 0xff;
      case 'OR': return (a | b) & 0xff;
      case 'XOR': return (a ^ b) & 0xff;
      case 'NOT': return (~a) & 0xff;
      case 'SHL': return (a << 1) & 0xff;
      case 'SHR': return (a >> 1) & 0xff;
    }
  };

  const resultVal = computeResult();
  const binA = to8Bit(numA);
  const binB = to8Bit(numB);
  const binRes = to8Bit(resultVal);

  const toggleBitA = (index: number) => {
    const mask = 1 << (7 - index);
    setNumA(prev => (prev ^ mask) & 0xff);
  };

  const toggleBitB = (index: number) => {
    const mask = 1 << (7 - index);
    setNumB(prev => (prev ^ mask) & 0xff);
  };

  const opInfo: Record<BitOp, { name: string; symbol: string; desc: string }> = {
    AND: { name: 'Bitwise AND', symbol: '&', desc: 'Outputs 1 if and only if both corresponding bits are 1.' },
    OR: { name: 'Bitwise OR', symbol: '|', desc: 'Outputs 1 if at least one corresponding bit is 1.' },
    XOR: { name: 'Bitwise XOR', symbol: '^', desc: 'Outputs 1 if the corresponding bits are distinct (different).' },
    NOT: { name: 'Bitwise NOT', symbol: '~', desc: 'Inverts every single bit (1 becomes 0, 0 becomes 1).' },
    SHL: { name: 'Shift Left', symbol: '<< 1', desc: 'Shifts all bits left by 1 position (arithmetic multiplication by 2).' },
    SHR: { name: 'Shift Right', symbol: '>> 1', desc: 'Shifts all bits right by 1 position (integer division by 2).' }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.badge}>LOW-LEVEL HARDWARE &amp; BINARY ARCHITECTURE · CS50 WEEK 0 &amp; 1</div>
        <h1>Interactive Bitwise &amp; Binary Architecture Lab</h1>
        <p className={styles.lead}>
          Toggle individual memory bits, observe binary logic gate operations, and inspect hexadecimal memory representations in real time.
        </p>
      </header>

      {/* Operator Ribbon */}
      <div className={styles.operatorRibbon}>
        {(['AND', 'OR', 'XOR', 'NOT', 'SHL', 'SHR'] as BitOp[]).map((op) => (
          <button
            key={op}
            className={`${styles.opBtn} ${operation === op ? styles.activeOp : ''}`}
            onClick={() => setOperation(op)}
          >
            {op} ({opInfo[op].symbol})
          </button>
        ))}
      </div>

      <div className={styles.mainCanvas}>
        {/* Operand A Card */}
        <div className={styles.operandCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Operand A</div>
            <div className={styles.formats}>
              <span>Dec: <strong>{numA & 0xff}</strong></span>
              <span>Hex: <strong>0x{(numA & 0xff).toString(16).toUpperCase().padStart(2, '0')}</strong></span>
            </div>
          </div>

          <div className={styles.bitRow}>
            {binA.split('').map((bit, idx) => (
              <button
                key={idx}
                className={`${styles.bitBox} ${bit === '1' ? styles.bitOn : styles.bitOff}`}
                onClick={() => toggleBitA(idx)}
                title={`Bit ${7 - idx} (Value: ${1 << (7 - idx)}) - Click to toggle`}
              >
                <span className={styles.bitVal}>{bit}</span>
                <span className={styles.bitPos}>2^{7 - idx}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Operation Sign */}
        <div className={styles.opDivider}>
          <span className={styles.opSymbolBadge}>{opInfo[operation].symbol}</span>
          <span className={styles.opNameText}>{opInfo[operation].name}</span>
        </div>

        {/* Operand B Card (hidden for unary NOT, SHL, SHR) */}
        {operation !== 'NOT' && operation !== 'SHL' && operation !== 'SHR' && (
          <div className={styles.operandCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Operand B</div>
              <div className={styles.formats}>
                <span>Dec: <strong>{numB & 0xff}</strong></span>
                <span>Hex: <strong>0x{(numB & 0xff).toString(16).toUpperCase().padStart(2, '0')}</strong></span>
              </div>
            </div>

            <div className={styles.bitRow}>
              {binB.split('').map((bit, idx) => (
                <button
                  key={idx}
                  className={`${styles.bitBox} ${bit === '1' ? styles.bitOn : styles.bitOff}`}
                  onClick={() => toggleBitB(idx)}
                  title={`Bit ${7 - idx} (Value: ${1 << (7 - idx)}) - Click to toggle`}
                >
                  <span className={styles.bitVal}>{bit}</span>
                  <span className={styles.bitPos}>2^{7 - idx}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Computed Result Card */}
        <div className={`${styles.operandCard} ${styles.resultCard}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleResult}>
              <Sparkles size={16} />
              <span>Calculated Logic Output</span>
            </div>
            <div className={styles.formats}>
              <span>Dec: <strong>{resultVal}</strong></span>
              <span>Hex: <strong>0x{resultVal.toString(16).toUpperCase().padStart(2, '0')}</strong></span>
            </div>
          </div>

          <div className={styles.bitRow}>
            {binRes.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`${styles.bitBox} ${styles.resultBitBox} ${bit === '1' ? styles.bitResultOn : styles.bitOff}`}
              >
                <span className={styles.bitVal}>{bit}</span>
                <span className={styles.bitPos}>2^{7 - idx}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hardware Theory Explanation */}
      <div className={styles.theoryBox}>
        <h3>
          <Info size={16} />
          <span>ALU (Arithmetic Logic Unit) Mechanics: {opInfo[operation].name}</span>
        </h3>
        <p>{opInfo[operation].desc}</p>
        <p className={styles.subTheory}>
          In computer architecture, bitwise operations execute within a single clock cycle at the transistor level without needing branch prediction.
        </p>
      </div>
    </div>
  );
};
