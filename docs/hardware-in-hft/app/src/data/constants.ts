import type { BatchSize } from '../types';

export const BATCH_SIZES: BatchSize[] = [1000, 10000, 100000];
export const DEFAULT_BATCH_SIZE: BatchSize = 10000;

export const FPGA_PER_ORDER_NS = 400;
export const CPU_PER_ORDER_NS = 4000;

export const DEMO_DISPLAY_MS = 3200;

export const PIPELINE_BASE_TRADES = { cpu: 0, fpga: 0 } as const;
export const PIPELINE_LOOP_MS = { cpu: 2600, fpga: 700 } as const;

export const MATCHING_BASE_FILLS = { fpga: 0, cpu: 0 } as const;
export const MATCHING_TICK_MS = { fpga: 160, cpu: 560 } as const;

export const GRID_COLS = 32;
export const GRID_ROWS = 20;
export const GRID_CELLS = GRID_COLS * GRID_ROWS;

export const TERM_LINE_INTERVAL_MS = 70;
export const TERM_MAX_LINES = 60;
