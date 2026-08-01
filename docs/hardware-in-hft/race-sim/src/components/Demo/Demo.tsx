import { DemoControls } from './DemoControls';
import { DemoPanel } from './DemoPanel';
import { SimControls } from '../SimControls/SimControls';
import type { BatchSize, VenueStats } from '../../types';
import { CPU_PER_ORDER_NS, FPGA_PER_ORDER_NS } from '../../data/constants';
import styles from './Demo.module.css';

interface DemoProps {
  batchSize: BatchSize;
  onSetBatchSize: (n: BatchSize) => void;
  running: boolean;
  fpga: VenueStats;
  cpu: VenueStats;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function Demo({ batchSize, onSetBatchSize, running, fpga, cpu, onStart, onStop, onReset }: DemoProps) {
  const fpgaBatchMs = ((batchSize * FPGA_PER_ORDER_NS) / 1e6).toFixed(2);
  const cpuBatchMs = ((batchSize * CPU_PER_ORDER_NS) / 1e6).toFixed(2);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Demo</p>
          <h3 className={styles.title}>Place orders, watch the magnitude.</h3>
        </div>
        <div className={styles.controlsRow}>
          <DemoControls batchSize={batchSize} running={running} onSetBatchSize={onSetBatchSize} />
          <SimControls group="demo" running={running} onStart={onStart} onStop={onStop} onReset={onReset} />
        </div>
      </div>
      <div className={styles.panels}>
        <DemoPanel
          venueLabel="CPU"
          colorClass="c"
          batchSize={batchSize}
          stats={cpu}
          perOrderLatency="4.00 us"
          batchLatency={`${cpuBatchMs} ms`}
          throughput="250 kops/s"
          footnote="assumes kernel bypass userspace (Solarflare / DPDK class)"
        />
        <DemoPanel
          venueLabel="FPGA"
          colorClass="f"
          batchSize={batchSize}
          stats={fpga}
          perOrderLatency="400 ns"
          batchLatency={`${fpgaBatchMs} ms`}
          throughput="2.50 Mops/s"
        />
      </div>
    </div>
  );
}
