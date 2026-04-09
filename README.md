# Rialo Jackpot — Game Frontend

A real-time, on-chain jackpot game suite built with Next.js, featuring three game modes: **The Tower**, **Operators Hub**, and **Infinite Rug**. The UI connects to a backend over WebSockets and renders live game state for all players.

> Wallet connectivity uses a simulated (fake) connection for demo purposes — no real wallet extension is required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 13](https://nextjs.org/) (Pages Router) + React + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + Sass (SCSS) |
| Real-time | [socket.io-client](https://socket.io/) |
| Data fetching | [@tanstack/react-query](https://tanstack.com/query) + [axios](https://axios-http.com/) |
| On-chain | [@project-serum/anchor](https://www.anchor-lang.com/), [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) |
| Wallet | Custom `FakeWalletContext` (simulated — no extension needed) |
| Notifications | Custom toast group |
| Audio | [react-sound](https://github.com/leoasis/react-sound) |

---

## Prerequisites

- **Node.js** 20 or later
- **npm** 8 or later

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
# → http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Start the production server on port **4578** |
| `npm run lint` | Run ESLint across the project |

---

## Configuration

All runtime endpoints are centralised in **`src/config.tsx`**:

```ts
// Game backend REST + WebSocket URLs
API_URL           // The Tower backend
GRAVE_API_URL     // Operators Hub backend
INFINITE_API_URL  // Infinite Rug backend

SOCKET_URL        // The Tower socket
GRAVE_SOCKET_URL  // Operators Hub socket
INFINITE_SOCKET_URL // Infinite Rug socket

RPC_URL           // Solana RPC endpoint
SOL_PRICE_API     // SOL/USD price feed
```

---

## Project Structure

```
src/
├── components/
│   ├── wallet/
│   │   ├── Wallet.tsx              # Provider wrapper
│   │   └── FakeWalletContext.tsx   # Simulated wallet (auto-connected)
│   ├── Chat/                       # Per-game chat panels
│   ├── Tower.tsx / TowerGrave.tsx  # Game tower visuals
│   ├── Selector.tsx / ...          # Bet selectors per game mode
│   ├── Sidebar.tsx                 # Navigation sidebar
│   └── ...
├── context/
│   ├── SocketContext.tsx           # The Tower WebSocket context
│   ├── SocketContextGrave.tsx      # Operators Hub socket
│   └── SocketContextInfinite.tsx   # Infinite Rug socket
├── pages/
│   ├── index.tsx / home.tsx        # Landing / stats page
│   ├── room/
│   │   ├── the-tower.tsx           # The Tower game room
│   │   ├── operators-hub.tsx       # Operators Hub game room
│   │   └── infinite-rug.tsx        # Infinite Rug game room
│   ├── _app.tsx                    # Global app wrapper
│   └── _document.tsx
├── styles/
│   ├── globals.scss                # Base styles + wallet adapter overrides
│   └── infinite.scss               # Infinite Rug pie/ball animation styles
└── config.tsx
```

---

## Game Modes

### The Tower
Players bet SOL to enter a shared pool. A randomised height is drawn on-chain and the winner takes the pot.

### Operators Hub
A Grave-variant jackpot room with a separate backend contract and socket feed.

### Infinite Rug
A continuous round-based game with a spinning wheel UI driven by real-time socket events.

---

## Wallet Simulation

This build ships with a **fake wallet** that is automatically connected on page load — no browser extension (Phantom, Backpack, etc.) is needed. Clicking the wallet button in the sidebar will toggle the connected/disconnected state for UI testing.

To wire up a real wallet in the future, replace `FakeWalletProvider` in `src/components/wallet/Wallet.tsx` with the standard `@solana/wallet-adapter-react` providers.

---

## Deployment

```bash
npm run build
npm run start        # listens on port 4578
```

Or deploy directly to [Vercel](https://vercel.com) — push to GitHub and import the repo; set `NEXT_PUBLIC_*` environment variables as needed.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| No live game data | Check socket URLs in `src/config.tsx` and confirm the backend is running |
| SOL price shows `---` | Verify `SOL_PRICE_API` is reachable from your network |
| `Cannot redefine property: ethereum` | Browser wallet extensions conflict — use incognito mode or disable extra extensions |
| Build error on wallet adapter | Ensure no real `@solana/wallet-adapter-react-ui` imports remain (all replaced with `FakeWalletContext`) |

---

## Branding

Visual style follows the **Rialo** brand identity — warm cream (`#f0ece2`) and dark charcoal (`#1a1918`) palette, rounded organic shapes, minimal and bold typography.
