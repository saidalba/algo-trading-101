export interface StageBlock {
  label: string;
  ns: number;
  kind: 'io' | 'compute' | 'compute-strong';
}

export const cpuStages: StageBlock[] = [
  { label: 'NETWORK IN', ns: 400, kind: 'io' },
  { label: 'KERNEL HANDOFF', ns: 300, kind: 'compute' },
  { label: 'PARSE + BOOK', ns: 600, kind: 'compute' },
  { label: 'RUN PRICE MODEL', ns: 500, kind: 'compute-strong' },
  { label: 'BUILD ORDER', ns: 300, kind: 'compute' },
  { label: 'NETWORK OUT', ns: 400, kind: 'io' },
];

export const fpgaStages: StageBlock[] = [
  { label: 'NETWORK IN', ns: 50, kind: 'io' },
  { label: 'RUN PRICE MODEL', ns: 300, kind: 'compute-strong' },
  { label: 'NETWORK OUT', ns: 50, kind: 'io' },
];
