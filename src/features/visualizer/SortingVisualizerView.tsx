import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Pause, 
  BarChart3, 
  Sparkles, 
  Layers, 
  Clock, 
  Sliders, 
  Zap,
  Info
} from 'lucide-react';
import styles from './SortingVisualizerView.module.css';

type AlgorithmType = 'bubble' | 'selection' | 'insertion' | 'quick';

interface StepState {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  comparisonsCount: number;
  swapsCount: number;
}

export const SortingVisualizerView: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(24);
  const [speedMs, setSpeedMs] = useState<number>(40);
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmType>('bubble');
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const stopSignalRef = useRef<boolean>(false);

  // Generate randomized array
  const generateNewArray = (size = arraySize) => {
    stopSignalRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);

    const newArr: number[] = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArr);
  };

  useEffect(() => {
    generateNewArray(arraySize);
  }, [arraySize]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. Bubble Sort
  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comp = 0;
    let swp = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopSignalRef.current) return;
        comp++;
        setComparisons(comp);
        setActiveIndices([j, j + 1]);
        await sleep(speedMs);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swp++;
          setSwaps(swp);
          setArray([...arr]);
          await sleep(speedMs);
        }
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    sorted.push(0);
    setSortedIndices([...sorted]);
    setActiveIndices([]);
  };

  // 2. Selection Sort
  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comp = 0;
    let swp = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (stopSignalRef.current) return;
        comp++;
        setComparisons(comp);
        setActiveIndices([i, j, minIdx]);
        await sleep(speedMs);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swp++;
        setSwaps(swp);
        setArray([...arr]);
        await sleep(speedMs);
      }
      sorted.push(i);
      setSortedIndices([...sorted]);
    }
    setActiveIndices([]);
  };

  // 3. Insertion Sort
  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comp = 0;
    let swp = 0;
    const sorted: number[] = [0];

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        if (stopSignalRef.current) return;
        comp++;
        setComparisons(comp);
        setActiveIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        swp++;
        setSwaps(swp);
        setArray([...arr]);
        await sleep(speedMs);
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      sorted.push(i);
      setSortedIndices([...sorted]);
    }
    setActiveIndices([]);
  };

  const handleStartSort = async () => {
    stopSignalRef.current = false;
    setIsSorting(true);

    if (selectedAlgo === 'bubble') {
      await runBubbleSort();
    } else if (selectedAlgo === 'selection') {
      await runSelectionSort();
    } else if (selectedAlgo === 'insertion') {
      await runInsertionSort();
    }

    setIsSorting(false);
  };

  const handleStop = () => {
    stopSignalRef.current = true;
    setIsSorting(false);
    setActiveIndices([]);
  };

  const algoMeta = {
    bubble: {
      name: 'Bubble Sort',
      time: 'O(n²)',
      space: 'O(1)',
      desc: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    selection: {
      name: 'Selection Sort',
      time: 'O(n²)',
      space: 'O(1)',
      desc: 'Divides the array into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.'
    },
    insertion: {
      name: 'Insertion Sort',
      time: 'O(n²)',
      space: 'O(1)',
      desc: 'Builds the final sorted array one item at a time by repeatedly taking the next item and inserting it into the sorted section.'
    },
    quick: {
      name: 'Quick Sort',
      time: 'O(n log n)',
      space: 'O(log n)',
      desc: 'Selects a pivot element and partitions the array into sub-arrays according to whether they are less than or greater than the pivot.'
    }
  }[selectedAlgo];

  return (
    <div className={styles.visualizerContainer}>
      <header className={styles.header}>
        <div className={styles.badge}>HARVARD CS50 COMPUTER SCIENCE VISUALIZER</div>
        <h1>Interactive Sorting Algorithms Visualizer</h1>
        <p className={styles.lead}>
          Observe computational sorting mechanics in real time. Watch how comparative passes, adjacent swaps, and array partitioning transform unsorted sequences into strict order.
        </p>
      </header>

      {/* Control Dashboard */}
      <div className={styles.controlCard}>
        <div className={styles.algoSelector}>
          {(['bubble', 'selection', 'insertion'] as AlgorithmType[]).map((algo) => (
            <button
              key={algo}
              className={`${styles.algoBtn} ${selectedAlgo === algo ? styles.activeAlgo : ''}`}
              onClick={() => { setSelectedAlgo(algo); generateNewArray(); }}
              disabled={isSorting}
            >
              {algo.toUpperCase()} SORT
            </button>
          ))}
        </div>

        <div className={styles.slidersRow}>
          <div className={styles.sliderGroup}>
            <label>Array Size: {arraySize}</label>
            <input 
              type="range" 
              min={12} 
              max={40} 
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
          </div>

          <div className={styles.sliderGroup}>
            <label>Speed: {speedMs}ms</label>
            <input 
              type="range" 
              min={10} 
              max={150} 
              step={10}
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
            />
          </div>

          <div className={styles.actionButtons}>
            <button 
              className={styles.resetBtn} 
              onClick={() => generateNewArray()}
              disabled={isSorting}
            >
              <RotateCcw size={15} />
              <span>Reset Array</span>
            </button>

            {!isSorting ? (
              <button className={styles.playBtn} onClick={handleStartSort}>
                <Play size={15} />
                <span>Launch Sort</span>
              </button>
            ) : (
              <button className={styles.stopBtn} onClick={handleStop}>
                <Pause size={15} />
                <span>Halt</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className={styles.canvasArea}>
        <div className={styles.metricsBar}>
          <div className={styles.metricItem}>
            <span>Comparisons:</span>
            <strong>{comparisons}</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Swaps / Writes:</span>
            <strong>{swaps}</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Time Complexity:</span>
            <strong className={styles.monoTag}>{algoMeta.time}</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Space Complexity:</span>
            <strong className={styles.monoTag}>{algoMeta.space}</strong>
          </div>
        </div>

        {/* Graphical Bars */}
        <div className={styles.barsContainer}>
          {array.map((val, idx) => {
            const isComparing = activeIndices.includes(idx);
            const isSorted = sortedIndices.includes(idx);
            let barClass = styles.barNormal;
            if (isComparing) barClass = styles.barComparing;
            else if (isSorted) barClass = styles.barSorted;

            return (
              <div 
                key={idx} 
                className={`${styles.bar} ${barClass}`}
                style={{ height: `${val}%` }}
                title={`Value: ${val}`}
              >
                {arraySize <= 24 && <span className={styles.barLabel}>{val}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithm Pedagogical Spec */}
      <div className={styles.specCard}>
        <h3>
          <Info size={16} />
          <span>{algoMeta.name} — Algorithmic Anatomy</span>
        </h3>
        <p>{algoMeta.desc}</p>
      </div>
    </div>
  );
};
