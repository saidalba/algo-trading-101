import { useCallback, useRef, useState } from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { PipelineOverview } from './components/PipelineOverview/PipelineOverview';
import { MatchingEngineRace } from './components/MatchingEngineRace/MatchingEngineRace';
import { CodeEditor } from './components/CodeEditor/CodeEditor';
import { InsidePipeline } from './components/InsidePipeline/InsidePipeline';
import { Demo } from './components/Demo/Demo';
import { SimControls } from './components/SimControls/SimControls';
import { useSimulation } from './hooks/useSimulation';
import { DEFAULT_BATCH_SIZE } from './data/constants';
import type { AmbientHandle, BatchSize } from './types';
import editorsGridStyles from './components/CodeEditor/CodeEditor.module.css';
import styles from './App.module.css';

function App() {
  // Group 1: the CPU vs FPGA bitstream pipeline diagrams + matching engine race.
  // Idle at 0 until Start; Stop freezes in place; Reset zeroes everything.
  const [bitstreamRunning, setBitstreamRunning] = useState(false);
  const pipelineRef = useRef<AmbientHandle>(null);
  const matchingRef = useRef<AmbientHandle>(null);

  const handleBitstreamStart = useCallback(() => {
    pipelineRef.current?.start();
    matchingRef.current?.start();
    setBitstreamRunning(true);
  }, []);
  const handleBitstreamStop = useCallback(() => {
    pipelineRef.current?.stop();
    matchingRef.current?.stop();
    setBitstreamRunning(false);
  }, []);
  const handleBitstreamReset = useCallback(() => {
    pipelineRef.current?.reset();
    matchingRef.current?.reset();
    setBitstreamRunning(false);
  }, []);

  // Group 2: the Demo order-placing comparison (grids, stats, terminals).
  const [batchSize, setBatchSize] = useState<BatchSize>(DEFAULT_BATCH_SIZE);
  const { running: demoRunning, fpga, cpu, fpgaLines, cpuLines, run: demoStart, stop: demoStop, reset: demoReset } =
    useSimulation(batchSize);

  const handleSetBatchSize = useCallback(
    (n: BatchSize) => {
      if (demoRunning) return;
      setBatchSize(n);
      demoReset();
    },
    [demoRunning, demoReset],
  );

  return (
    <>
      <Header />
      <main>
        <div className={styles.titleRow}>
          <div>
            <p className={styles.sectionLabel}>Hardware in financial markets</p>
            <h1 className={styles.heading}>
              CPU versus <span className={styles.fpga}>FPGA</span>.
            </h1>
          </div>
          <SimControls
            group="bitstream"
            running={bitstreamRunning}
            onStart={handleBitstreamStart}
            onStop={handleBitstreamStop}
            onReset={handleBitstreamReset}
          />
        </div>

        <PipelineOverview ref={pipelineRef} />
        <MatchingEngineRace ref={matchingRef} />

        <div className={editorsGridStyles.grid}>
          <CodeEditor
            venue="cpu"
            host="cpu-ny07.lse.internal"
            path="~/strategies/polymarket"
            fileName="polymarket_arb.cpp"
            status={cpu.status}
            disabled={demoRunning}
            lines={cpuLines}
            onRun={demoStart}
          />
          <CodeEditor
            venue="fpga"
            host="fpga-ny01.lse.internal"
            path="~/strategies/polymarket"
            fileName="polymarket_arb.cpp"
            status={fpga.status}
            disabled={demoRunning}
            lines={fpgaLines}
            onRun={demoStart}
          />
        </div>

        <InsidePipeline />

        <Demo
          batchSize={batchSize}
          onSetBatchSize={handleSetBatchSize}
          running={demoRunning}
          fpga={fpga}
          cpu={cpu}
          onStart={demoStart}
          onStop={demoStop}
          onReset={demoReset}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
