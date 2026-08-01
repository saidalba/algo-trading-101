import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { CpuDiagram } from './CpuDiagram';
import { FpgaDiagram } from './FpgaDiagram';
import type { PipelineDiagramHandle } from './PipelineDiagramHandle';
import { useAmbientLoop } from '../../hooks/useAmbientLoop';
import { PIPELINE_BASE_TRADES, PIPELINE_LOOP_MS } from '../../data/constants';
import type { AmbientHandle } from '../../types';
import styles from './PipelineOverview.module.css';

const X0 = 26;
const X1 = 1054;

export const PipelineOverview = forwardRef<AmbientHandle>(function PipelineOverview(_props, ref) {
  const cpuRef = useRef<PipelineDiagramHandle>(null);
  const fpgaRef = useRef<PipelineDiagramHandle>(null);

  const onTick = useCallback((elapsedMs: number) => {
    const specs = [
      { handle: cpuRef, base: PIPELINE_BASE_TRADES.cpu, period: PIPELINE_LOOP_MS.cpu },
      { handle: fpgaRef, base: PIPELINE_BASE_TRADES.fpga, period: PIPELINE_LOOP_MS.fpga },
    ];
    for (const spec of specs) {
      const cyclePos = (elapsedMs % spec.period) / spec.period;
      const x = X0 + cyclePos * (X1 - X0);
      const loops = Math.floor(elapsedMs / spec.period);
      spec.handle.current?.setDotX(x);
      spec.handle.current?.setTrades(spec.base + loops);
    }
  }, []);

  const { start, stop, reset } = useAmbientLoop(onTick);
  useImperativeHandle(ref, () => ({ start, stop, reset }), [start, stop, reset]);

  return (
    <div className={styles.grid}>
      <div className={styles.wrap}>
        <CpuDiagram ref={cpuRef} />
      </div>
      <div className={styles.wrap}>
        <FpgaDiagram ref={fpgaRef} />
      </div>
    </div>
  );
});
