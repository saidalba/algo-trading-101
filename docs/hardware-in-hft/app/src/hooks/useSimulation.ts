import { useCallback, useRef, useState } from 'react';
import type { BatchSize, TermLine, VenueStats } from '../types';
import { fakeFillLine, metaLine } from '../utils/fakeFill';
import {
  CPU_PER_ORDER_NS,
  DEMO_DISPLAY_MS,
  FPGA_PER_ORDER_NS,
  TERM_LINE_INTERVAL_MS,
  TERM_MAX_LINES,
} from '../data/constants';

const IDLE: VenueStats = { status: 'READY', pct: 0, wallMs: 0, count: 0 };

function capLines(lines: TermLine[]): TermLine[] {
  return lines.length > TERM_MAX_LINES ? lines.slice(lines.length - TERM_MAX_LINES) : lines;
}

export function useSimulation(batchSize: BatchSize) {
  const [running, setRunning] = useState(false);
  const [fpga, setFpga] = useState<VenueStats>(IDLE);
  const [cpu, setCpu] = useState<VenueStats>(IDLE);
  const [fpgaLines, setFpgaLines] = useState<TermLine[]>([]);
  const [cpuLines, setCpuLines] = useState<TermLine[]>([]);
  const tokenRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  const reset = useCallback(() => {
    tokenRef.current += 1;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setRunning(false);
    setFpga(IDLE);
    setCpu(IDLE);
    setFpgaLines([]);
    setCpuLines([]);
  }, []);

  const stop = useCallback(() => {
    tokenRef.current += 1;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setRunning(false);
    setFpga((prev) => (prev.status === 'DONE' ? prev : { ...prev, status: 'STOPPED' }));
    setCpu((prev) => (prev.status === 'DONE' ? prev : { ...prev, status: 'STOPPED' }));
  }, []);

  const run = useCallback(() => {
    if (running) return;
    const myToken = ++tokenRef.current;
    setRunning(true);
    setFpga({ status: 'RUNNING', pct: 0, wallMs: 0, count: 0 });
    setCpu({ status: 'RUNNING', pct: 0, wallMs: 0, count: 0 });
    setFpgaLines([]);
    setCpuLines([]);

    const fpgaTotalMs = batchSize * FPGA_PER_ORDER_NS * 1e-6;
    const cpuTotalMs = batchSize * CPU_PER_ORDER_NS * 1e-6;
    const ratio = fpgaTotalMs / cpuTotalMs; // FPGA finishes first

    let fpgaDone = false;
    let cpuDone = false;
    let lastFpgaLine = 0;
    let lastCpuLine = 0;

    const start = performance.now();

    function tick(now: number) {
      if (tokenRef.current !== myToken) return;
      const t = Math.min((now - start) / DEMO_DISPLAY_MS, 1);

      const fp = Math.min(t / ratio, 1);
      const fpgaSeq = Math.round(fp * batchSize);
      setFpga({ status: fp >= 1 ? 'DONE' : 'RUNNING', pct: fp * 100, wallMs: fp * fpgaTotalMs, count: fpgaSeq });
      if (!fpgaDone && now - lastFpgaLine > TERM_LINE_INTERVAL_MS) {
        setFpgaLines((prev) => capLines([...prev, fakeFillLine(fpgaSeq)]));
        lastFpgaLine = now;
      }
      if (fp >= 1 && !fpgaDone) {
        fpgaDone = true;
        setFpgaLines((prev) =>
          capLines([
            ...prev,
            metaLine(`fills: ${batchSize.toLocaleString()} / ${batchSize.toLocaleString()}  ·  exit code 0`),
            metaLine(`elapsed: ${fpgaTotalMs.toFixed(2)} ms`),
          ]),
        );
      }

      const cp = Math.min(t, 1);
      const cpuSeq = Math.round(cp * batchSize);
      setCpu({ status: cp >= 1 ? 'DONE' : 'RUNNING', pct: cp * 100, wallMs: cp * cpuTotalMs, count: cpuSeq });
      if (!cpuDone && now - lastCpuLine > TERM_LINE_INTERVAL_MS) {
        setCpuLines((prev) => capLines([...prev, fakeFillLine(cpuSeq)]));
        lastCpuLine = now;
      }
      if (cp >= 1 && !cpuDone) {
        cpuDone = true;
        setCpuLines((prev) =>
          capLines([
            ...prev,
            metaLine(`fills: ${batchSize.toLocaleString()} / ${batchSize.toLocaleString()}  ·  exit code 0`),
            metaLine(`elapsed: ${cpuTotalMs.toFixed(2)} ms`),
          ]),
        );
      }

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setRunning(false);
      }
    }
    frameRef.current = requestAnimationFrame(tick);
  }, [running, batchSize]);

  return { running, fpga, cpu, fpgaLines, cpuLines, run, stop, reset };
}
