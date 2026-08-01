export type Venue = 'fpga' | 'cpu';

export type VenueStatus = 'READY' | 'RUNNING' | 'DONE' | 'STOPPED';

export interface VenueStats {
  status: VenueStatus;
  pct: number;
  wallMs: number;
  count: number;
}

export interface TermLine {
  id: number;
  text: string;
  cls: 'buy' | 'sell' | 'meta';
}

export type BatchSize = 1000 | 10000 | 100000;

export interface AmbientHandle {
  start: () => void;
  stop: () => void;
  reset: () => void;
}
