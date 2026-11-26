# Signal & Sense

![Signal & Sense desktop preview showing bilingual stock-filter explanations and an illustrative chart](docs/screenshot.png)

A beginner-friendly, bilingual English and Cantonese field guide to **142 stock filters**. It turns dense financial terminology into practical explanations, visual examples, common misreads, and screening playbooks.

Built with React, TypeScript, Vite, Recharts, KaTeX, and Lucide icons. No live-market API or backend is required, and all chart values are illustrative.

## What is inside

- 142 bilingual filter explanations
- Interactive visualizations and rendered formulas
- Practical scenarios, best practices, and common misreads
- Saved filters and learning progress stored locally in the browser
- Screening playbooks for applying filters together
- A dark-and-gold, responsive interface

## Run locally

### Requirements

- [Git](https://git-scm.com/downloads)
- A current [Node.js LTS release](https://nodejs.org/), including npm

### Clone and install

```bash
git clone https://github.com/predator17/signal-and-sense.git
cd signal-and-sense
npm ci
```

### Start the development server

```bash
npm run dev -- --host 127.0.0.1 --port 7100
```

Open **http://localhost:7100/**. Stop the server with `Ctrl+C` in the terminal.

### Other useful commands

```bash
# Production build, written to dist/
npm run build

# Preview the production build
npm run preview -- --host 127.0.0.1 --port 7100

# Lint
npm run lint

# Install updates after pulling
npm ci
```

`dist/` and `node_modules/` are excluded from Git.

## Content and browser storage

- This is an educational guide, not investment advice.
- Charts and values are illustrative rather than live market data.
- Vendor-defined signals are identified where no universal calculation exists.
- Saved filters and learning progress use browser `localStorage`. They are specific to the current browser and device, do not synchronize through GitHub, and may be lost when site data is cleared.

## Project structure

```text
src/
├── components/    Interface, formulas, and visualizations
├── data/          Bilingual content for all 142 filters
├── App.tsx        Page layout and screening playbooks
├── index.css      Dark-and-gold visual system and responsive styles
└── main.tsx       Application entry point
public/            Static assets
```

## Contributing

Issue reports, corrections, better examples, and focused pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for content and development guidelines.

When reporting a possible content error, include the filter name, the relevant explanation, and a reliable source where available. Please do not present illustrative values as real market results.

## License

Released under the [MIT License](LICENSE).
