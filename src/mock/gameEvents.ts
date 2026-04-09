/**
 * Lightweight event bridge so transaction.ts (no React access)
 * can notify the correct socket context that a bet was placed.
 */
type GameType = "tower" | "grave" | "infinite";
type BetHandler = (betAmount: number) => void;

const _handlers: Record<GameType, BetHandler | null> = {
  tower: null,
  grave: null,
  infinite: null,
};

export function registerBetHandler(type: GameType, handler: BetHandler) {
  _handlers[type] = handler;
}

export function dispatchBet(betAmount: number, type: GameType = "tower") {
  _handlers[type]?.(betAmount);
}
