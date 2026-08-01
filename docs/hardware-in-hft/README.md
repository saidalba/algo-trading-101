# Hardware in HFT

In high-frequency trading, the software algorithm is only half the story. The hardware it runs on decides who actually wins the trade. A strategy that reacts a microsecond slower than a competitor's, because it's stuck on a general-purpose CPU instead of dedicated silicon, loses the fill every time regardless of how "smart" its logic is. This category covers that hardware layer: why firms build order-matching logic directly into FPGAs, how that compares to a CPU's shared instruction pipeline, and what the resulting latency gap actually looks like in practice.

## Lessons

- [`race-sim`](race-sim) — an interactive lesson comparing a CPU vs. an FPGA processing the same order flow, with a live "matching engine race" and a throughput demo across batches of 1,000 / 10,000 / 100,000 orders.

## Running `race-sim` locally

Requires Node `^20.19.0` or `>=22.12.0` (Vite 8's minimum).

```bash
cd docs/hardware-in-hft/race-sim
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to `http://localhost:5173`).

Other useful commands, run from the same `race-sim` folder:

```bash
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve that production build locally
npm run lint      # run Oxlint
```
