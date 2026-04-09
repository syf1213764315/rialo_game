# Rialo Jackpot — Game Frontend

A real-time, on-chain jackpot game suite built with Next.js, featuring three game modes: **The Tower**, **Operators Hub**, and **Infinite Rug**. The UI connects to a backend over WebSockets and renders live game state for all players.

> Wallet connectivity uses a simulated (fake) connection for demo purposes — no real wallet extension is required.

---

## About Rialo

Rialo is a next-generation blockchain protocol designed around **supermodularity** — the deliberate integration of critical infrastructure primitives (oracles, automation, data feeds, privacy, and interoperability) into the base layer itself. Unlike modular chains that outsource execution-adjacent services to third-party middleware, Rialo collapses fragmentation to maximize system welfare for every participant.

The jackpot suite is a live demonstration of Rialo's core capabilities applied to on-chain gaming.

---

## Why Rialo Powers On-Chain Games

### Reactive Transactions — Native Automation

Traditional on-chain games depend on external cron jobs or off-chain keepers to trigger round changes, settle winners, and advance game state. Rialo's **Reactive Transactions** replace this patchwork with a native automation layer built into consensus itself. Game contracts can express asynchronous workflows that react to real-time conditions — a round ends, a winner is selected, funds are settled — without any external scheduler.

> *"They need a mechanism for expressing asynchronous workflows that react to changing conditions and external signals inside the consensus process itself."*

In the jackpot context this means round transitions, cooldowns, and prize distribution happen on-chain, deterministically, with the same finality guarantees as user-initiated transactions.

### Stake-for-Service — Frictionless Game Credits

Managing separate balances for gameplay and staking is a known UX burden in crypto games. Rialo's **Stake-for-Service (SfS)** converts staking yield into live service credits that automatically pay for network costs. Players and game contracts can fund recurring activity — entry fees, round processing, state updates — directly from their staking rewards, eliminating the need to maintain a separate gas wallet.

### Native Privacy — Confidential Game State

Public blockchains expose all state by default, which breaks fairness in games where knowing the current pool composition or opponent bets yields an advantage. Rialo integrates **native privacy primitives** at the base layer, enabling the game backend to commit to hidden state (e.g., sealed bets, randomness seeds) that is only revealed at settlement — preserving both verifiability and confidentiality.

### Parallel Execution — High-Throughput Rounds

Jackpot games see bursty, correlated transaction submissions as rounds open and close. Rialo's **concurrency control layer** runs transactions in parallel where dependency analysis permits it, dramatically increasing throughput and reducing latency compared to sequential execution chains. Multiple game rooms (The Tower, Operators Hub, Infinite Rug) can process bets and settle rounds simultaneously without queuing.

### Distributed Key Generation — Trustless Randomness

Fair winner selection demands a randomness source that no single party can bias. Rialo's **Distributed Key Generation (DKG)** protocol lets the validator set produce unpredictable, unbiasable randomness collaboratively, without a central dealer. The jackpot program can consume this native randomness to determine outcomes in a cryptographically sound way that is provably fair and publicly verifiable.

### Prediction Markets & Oracle Integration

The Rialo base layer natively integrates data feeds and oracle infrastructure. Future versions of the jackpot suite can reference Rialo's on-chain oracles to price SOL in real time, settle prediction-style side bets, or pull external event data — all without trusting a third-party data provider.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (Pages Router) + React 18 + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + Sass (SCSS) |
| Real-time | [socket.io-client](https://socket.io/) |
| Data fetching | [@tanstack/react-query](https://tanstack.com/query) + [axios](https://axios-http.com/) |
| On-chain | [@project-serum/anchor](https://www.anchor-lang.com/), [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) |
| Wallet | Custom `FakeWalletContext` (simulated — no extension needed) |
| Notifications | Custom toast group + [react-toastify](https://fkhadra.github.io/react-toastify/) |
| Audio | [react-sound](https://github.com/leoasis/react-sound) |
| Confetti | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |

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

RPC_URL           // Solana / Rialo RPC endpoint
SOL_PRICE_API     // SOL/USD price feed (CoinGecko)
```

---

## Project Structure

```
src/
├── components/
│   ├── wallet/
│   │   ├── Wallet.tsx              # Provider wrapper
│   │   └── FakeWalletContext.tsx   # Simulated wallet (auto-connected)
│   ├── Chat/                       # Per-game chat panels (Tower, Grave, Infinite)
│   ├── Tower.tsx / TowerGrave.tsx  # Game tower visuals
│   ├── InfiniteBox.tsx             # Infinite Rug wheel display
│   ├── InfiniteBetBox.tsx          # Bet entry for Infinite Rug
│   ├── Selector.tsx / ...          # Bet selectors per game mode
│   ├── Sidebar.tsx                 # Navigation sidebar
│   ├── Waitboard.tsx               # Pre-round player list
│   ├── CountdownBar.tsx            # Round timer display
│   ├── Playhistory.tsx             # Recent winners list
│   └── ToastGroup.tsx              # Toast notification container
├── context/
│   ├── SocketContext.tsx           # The Tower game state + bet bridge
│   ├── SocketContextGrave.tsx      # Operators Hub variant
│   ├── SocketContextInfinite.tsx   # Infinite Rug variant (longer rounds)
│   └── solana/
│       ├── transaction.ts          # enterGame / playGame helpers
│       ├── types.ts                # Anchor / IDL types
│       └── jackpot.ts             # Jackpot program IDL (Anchor)
├── mock/
│   ├── data.ts                     # Mock players, stats, prices, chat
│   └── gameEvents.ts               # Client-side round simulation + bet dispatch
├── pages/
│   ├── index.tsx / home.tsx        # Landing page + global stats
│   ├── room/
│   │   ├── the-tower.tsx           # The Tower game room
│   │   ├── operators-hub.tsx       # Operators Hub game room
│   │   └── infinite-rug.tsx        # Infinite Rug game room
│   ├── _app.tsx                    # Global wrapper (mute toggle)
│   └── _document.tsx
├── utils/
│   ├── util.ts                     # useSolanaPrice, color helpers, pie data
│   └── type.ts                     # Shared types (Player, ChatType, socket events)
├── styles/
│   ├── globals.scss                # Base styles + wallet adapter overrides
│   └── infinite.scss               # Infinite Rug pie/ball animation styles
└── config.tsx                      # All URLs, keys, constants
```

---

## Game Modes

### The Tower

Players bet SOL to enter a shared pool. A randomised height is drawn on-chain and the winner takes the entire pot. Rounds follow a lobby → running → settle cycle managed by `SocketContext`.

### Operators Hub

A Grave-variant jackpot room with a separate backend contract and socket feed. Designed for operator-curated game sessions with independent state tracking via `SocketContextGrave`.

### Infinite Rug

A continuous round-based game with a spinning pie-wheel UI. Each player's share of the wheel is proportional to their bet; the ball lands on a segment to determine the winner. Powered by `SocketContextInfinite` with extended `RUNNING_MS` to support longer rounds.

---

## On-Chain Architecture

The game backend is anchored (via Anchor framework) to a `jackpot` program whose IDL lives in `src/context/solana/jackpot.ts`. The key flows are:

1. **`enterGame`** — player submits a bet; the frontend builds and signs a transaction referencing the game PDA.
2. **`playGame`** — dispatches the bet into the current round's pool, triggering the mock (or live) round state machine.
3. **Round settlement** — winner is selected using on-chain randomness; prize is transferred via the program.

In the current repository the Solana transaction layer is wired to a **mock event system** (`mock/gameEvents.ts`) so the full game loop runs in the browser without a live validator connection. Switching to live requires updating `RPC_URL` and removing the mock dispatch in `transaction.ts`.

---

## Wallet Simulation

This build ships with a **fake wallet** that is automatically connected on page load — no browser extension (Phantom, Backpack, etc.) is needed. Clicking the wallet button in the sidebar will toggle the connected/disconnected state for UI testing.

To wire up a real wallet in the future, replace `FakeWalletProvider` in `src/components/wallet/Wallet.tsx` with the standard `@solana/wallet-adapter-react` providers and remove `FakeWalletMultiButton`.

---

## Deployment

```bash
npm run build
npm run start        # listens on port 4578
```

Or deploy directly to [Vercel](https://vercel.com) — push to GitHub and import the repo. Set any `NEXT_PUBLIC_*` environment variables as needed before building.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| No live game data | Check socket URLs in `src/config.tsx` and confirm the backend is running |
| SOL price shows `---` | Verify `SOL_PRICE_API` (CoinGecko) is reachable from your network |
| `Cannot redefine property: ethereum` | Browser wallet extensions conflict — use incognito mode or disable extra extensions |
| Build error on wallet adapter | Ensure no real `@solana/wallet-adapter-react-ui` imports remain (all replaced with `FakeWalletContext`) |
| Round never advances | The mock timer in `SocketContext` uses `LOBBY_MS` / `RUNNING_MS` from `config.tsx` — check those values |

---

## Rialo Ecosystem Links

- [Rialo Docs](https://www.rialo.io/docs) — Protocol whitepapers and technical deep-dives
- [Reactive Transactions](https://www.rialo.io/docs) — Native automation model
- [Stake-for-Service](https://www.rialo.io/docs) — Staking yield as service credits
- [Distributed Key Generation](https://www.rialo.io/docs) — Trustless randomness primitive
- [Native Privacy](https://www.rialo.io/docs) — Confidential computation at the base layer
- [Supermodularity & Integration](https://www.rialo.io/docs) — Why Rialo integrates primitives natively

---

## Branding

Visual style follows the **Rialo** brand identity — warm cream (`#f0ece2`) and dark charcoal (`#1a1918`) palette, rounded organic shapes, minimal and bold typography.
