import { useCallback, useRef, useState } from 'react';

/**
 * A pausable/resumable rAF loop for perpetual (non-completing) ambient animations.
 * Unlike useSimulation (a fixed-duration batch that finishes), this loop just keeps
 * calling onTick(elapsedMs) forever until stopped, tracking "active" elapsed time so
 * stop -> start resumes exactly where it left off instead of jumping.
 */
export function useAmbientLoop(onTick: (elapsedMs: number) => void) {
  const [running, setRunning] = useState(false);
  const tokenRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  const pausedElapsedRef = useRef(0);
  const startTimeRef = useRef(0);
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  const stop = useCallback(() => {
    tokenRef.current += 1;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (startTimeRef.current) {
      pausedElapsedRef.current += performance.now() - startTimeRef.current;
      startTimeRef.current = 0;
    }
    setRunning(false);
  }, []);

  const start = useCallback(() => {
    setRunning((prevRunning) => {
      if (prevRunning) return prevRunning;
      const myToken = ++tokenRef.current;
      startTimeRef.current = performance.now();

      function tick(now: number) {
        if (tokenRef.current !== myToken) return;
        const elapsed = pausedElapsedRef.current + (now - startTimeRef.current);
        onTickRef.current(elapsed);
        frameRef.current = requestAnimationFrame(tick);
      }
      frameRef.current = requestAnimationFrame(tick);
      return true;
    });
  }, []);

  const reset = useCallback(() => {
    tokenRef.current += 1;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    pausedElapsedRef.current = 0;
    startTimeRef.current = 0;
    setRunning(false);
    onTickRef.current(0);
  }, []);

  return { running, start, stop, reset };
}
