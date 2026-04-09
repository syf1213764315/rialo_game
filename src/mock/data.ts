import { ChatType, Player } from "../utils/type";

// ── Prices ────────────────────────────────────────────────────────────────────
export const MOCK_SOL_PRICE = 148.5;

// ── Players ───────────────────────────────────────────────────────────────────
export const MOCK_PLAYERS: Player[] = [
  { player: "7xKXjBnQ4mNpFdR3gYwLkC9sHvE2iT6yAg4kC3mNp", amount: 1_500_000_000 },
  { player: "4qABcWzX8pLmRhT2yVdKjM5eN7fQ3sUoP1bI6gE9r", amount: 500_000_000 },
  { player: "9rCQdYoZ1kWxSjT4bMpFhR7gLmN2eVuI8sQ3nA5c",  amount: 2_000_000_000 },
];

// Valid base-58 public key used as a fake on-chain PDA
export const MOCK_PDA = "11111111111111111111111111111111";

// ── Statistics ────────────────────────────────────────────────────────────────
export const MOCK_TOTAL_WINS  = 1284.5;
export const MOCK_TOTAL_COUNT = 9_432;

// ── Recent winners ────────────────────────────────────────────────────────────
export const MOCK_WINNERS = [
  {
    user: "7xKX...3mNp",
    bet_amount: 1.5,
    payout: 2.85,
    tx: "5zKa1bXmY3qPnR8fVdJwL9cHsUoE2iT6yAg4kC7e",
  },
  {
    user: "4qAB...9pLm",
    bet_amount: 0.5,
    payout: 0.0,
    tx: "8yMb2cYnZ4rQoS9gWeKxM0dItVpF3jU7zBh5lD8f",
  },
  {
    user: "9rCQ...2kWx",
    bet_amount: 2.0,
    payout: 3.8,
    tx: "3nPc3dZoA5sRpT0hXfLyN1eJuWqG4kV8aCi6mE9g",
  },
];

// ── Chat messages ─────────────────────────────────────────────────────────────
export const MOCK_MESSAGES: ChatType[] = [
  { user_name: "whale_hunter",  message: "LFG! 🔥 placed 2 SOL",          timestamp: Date.now() - 120_000 },
  { user_name: "sol_degen",     message: "good luck everyone",              timestamp: Date.now() - 90_000  },
  { user_name: "rialo_fan",     message: "this game is insane",             timestamp: Date.now() - 60_000  },
  { user_name: "moonman99",     message: "just added 1 SOL to the pot!",   timestamp: Date.now() - 30_000  },
  { user_name: "crypt0ninja",   message: "who's winning this round?",       timestamp: Date.now() - 10_000  },
];

// ── Online counter ────────────────────────────────────────────────────────────
export const MOCK_ONLINED = 42;
