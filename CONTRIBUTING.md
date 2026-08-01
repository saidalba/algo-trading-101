# Contributing

Thanks for considering a contribution to algo-trading-101.

## Adding a written lesson

Written subjects live under `docs/<category>/<topic>/`, indexed by [CURRICULUM.md](CURRICULUM.md).

1. Create the folder: `docs/<category>/<topic>/`
2. Add a `README.md` inside it with the lesson content.
3. Link it from `CURRICULUM.md` under the right category (create the category section if it doesn't exist yet).
4. Add whatever you drew from (papers, books, docs, articles) to [REFERENCES.md](REFERENCES.md) under the same category.

## Adding an interactive lesson

Interactive lessons are self-contained apps, like [`docs/hardware-in-hft/race-sim/`](docs/hardware-in-hft/race-sim). Follow the same pattern: a `docs/<category>/` folder with its own app and a `README.md` describing it, linked from `CURRICULUM.md`.

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, written in the imperative mood.

Common types: `feat`, `fix`, `docs`, `refactor`, `chore`.

```
docs(curriculum): add Options Pricing topic folder
feat(app): add order book depth visualization
```

## Pull requests

Keep PRs focused on one topic or change. Explain the *why* in the description, not just the *what*.
