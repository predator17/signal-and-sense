# Signal & Sense

![Signal & Sense desktop preview showing bilingual stock-filter explanations and an illustrative chart](docs/screenshot.png)

A beginner-friendly, bilingual English and Cantonese field guide to **142 stock filters**. It includes interactive visualizations, rendered KaTeX formulas, practical scenarios, best practices, common misreads, saved filters, learning progress, and screening playbooks.

The interface uses a dark-and-gold theme and is built with React, TypeScript, Vite, Recharts, KaTeX, and Lucide icons. All chart values are illustrative; no live-market API or backend is required.

## Before you start

Install these tools on the computer that will run the app:

1. [Git](https://git-scm.com/downloads)
2. [A current Node.js LTS release](https://nodejs.org/), which includes npm

Because this is a **private GitHub repository**, your GitHub account must have access to `predator17/signal-and-sense`. When Git asks you to sign in, use Git Credential Manager or your normal GitHub authentication flow. Do not paste access tokens into the project or commit them to Git.

## Clone and run on another computer

### 1. Open a terminal

Use **PowerShell** or **Windows Terminal** on Windows, or **Terminal** on macOS or Linux.

Move to the folder where you want to keep the project. For example, on Windows:

```powershell
cd "$HOME\Documents"
```

### 2. Clone the private repository

```bash
git clone https://github.com/predator17/signal-and-sense.git
cd signal-and-sense
```

If prompted, complete the GitHub sign-in. The remaining commands in this guide should be run from inside the `signal-and-sense` folder.

### 3. Install the exact dependency versions

```bash
npm ci
```

This uses `package-lock.json`. You only need to repeat it when dependencies change, when `node_modules` is missing, or after dependency-related problems.

### 4. Start the local preview server

```bash
npm run dev -- --host 127.0.0.1 --port 7100
```

Wait for Vite to display the local address, then open:

**http://localhost:7100/**

Keep the terminal window open while using the app.

### 5. Stop the server

Return to the terminal and press **Ctrl + C**. Closing the browser tab alone does not stop the server.

## Launch again after a computer restart

You do not need to clone the repository or run `npm ci` again after an ordinary restart. Open a terminal, move into the project folder, and start the server:

```bash
cd path/to/signal-and-sense
npm run dev -- --host 127.0.0.1 --port 7100
```

Replace `path/to/signal-and-sense` with the actual folder path, then open **http://localhost:7100/** again.

## Useful commands

| Task | Command |
| --- | --- |
| Start the development server | `npm run dev -- --host 127.0.0.1 --port 7100` |
| Create a production build | `npm run build` |
| Preview the production build | `npm run preview -- --host 127.0.0.1 --port 7100` |
| Run the linter | `npm run lint` |

The production build is written to `dist/`. Both `dist/` and `node_modules/` are intentionally excluded from Git.

## Pull updates from GitHub

To download the latest committed version on another computer:

```bash
git pull
npm ci
```

Running `npm ci` after pulling is safe and ensures the installed dependencies match the lockfile.

## Save and push your own changes

After editing the app:

```bash
git add .
git commit -m "Describe your change"
git push
```

Run `git status` before committing if you want to review which files changed. Never commit `.env` files, credentials, access tokens, or other secrets.

## Troubleshooting

### `npm` is not recognized

Install Node.js, close and reopen the terminal, then try again. Confirm the installation with:

```bash
node --version
npm --version
```

### Git says authentication failed or repository not found

Confirm that you signed in to the correct GitHub account and that the account has access to the private repository. If you are not the repository owner, ask the owner to grant access.

### Port 7100 is already in use

Another app may already be using that port. Either stop the other server or start this app on a different port:

```bash
npm run dev -- --host 127.0.0.1 --port 7101
```

Then open **http://localhost:7101/** instead.

### Dependencies appear broken after an update

Stop the development server and reinstall the lockfile versions:

```bash
npm ci
```

Then start the server again.

### Saved filters or learning progress are missing

Saved filters and learning progress use browser `localStorage`. They are specific to that browser and device, are not synchronized through GitHub, and can be lost if browser site data is cleared.

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

## Content and data note

This project is for educational purposes only and is not investment advice. Charts and values are illustrative rather than live market data. Vendor-defined signals are identified where no universal calculation exists.
