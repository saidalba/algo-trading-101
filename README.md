# algo-trading-101

A beginner-friendly micro guide to algorithmic trading and HFT — taught through small, interactive, in-browser diagrams instead of walls of text.

The idea: some concepts in trading infrastructure (latency, hardware tradeoffs, order flow) click a lot faster when you can press play and watch them happen than when you read a paragraph about them. Each lesson in this repo is a self-contained interactive diagram you can run locally and click through.

## What's here

```
algo-trading-101/
├── docs/                              Written lessons, organized by subject (see CURRICULUM.md)
│   └── hardware-in-hft/
│       └── app/                       Interactive lesson — a Vite + React + TypeScript single-page app
├── CURRICULUM.md                      Index of every subject/topic covered, with links
├── LICENSE                            MIT
└── README.md                          This file
```

See [CURRICULUM.md](CURRICULUM.md) for the full list of subjects and topics.

### `docs/hardware-in-hft/app/`

The actual guide. A React app where each lesson is a set of composed components — SVG diagrams, live counters, and small simulations — rather than static images. No routing/backend; it's meant to stay simple enough to clone and run.

Current lesson:

- **CPU versus FPGA** — why HFT firms build order-matching logic directly into FPGA silicon instead of running it on a general-purpose CPU. It has two independently controllable simulations:
  - A live pipeline/matching-engine view comparing how a trade travels through a CPU's shared instruction pipeline vs. an FPGA's dedicated per-stage circuitry, plus a "matching engine race" showing which venue's orders get filled first.
  - An order-placing demo (1,000 / 10,000 / 100,000 orders) that visualizes the throughput gap as a filling grid, with live terminal output streaming simulated fills for each side.

More lessons will be added as additional components/routes inside `docs/hardware-in-hft/app/` over time.

## Running locally

```bash
cd docs/hardware-in-hft/app
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a static production build in `docs/hardware-in-hft/app/dist/`.

## License

MIT — see [LICENSE](LICENSE).
