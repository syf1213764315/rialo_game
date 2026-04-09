import { PublicKey } from "@solana/web3.js";
import { dispatchBet } from "../../mock/gameEvents";

type GameType = "tower" | "grave" | "infinite";

const fakeSleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Called when the user starts a new game (no existing round). */
export const playGame = async (
  wallet: any,
  amount: number,
  setLoading: Function,
  type: GameType = "tower"
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  dispatchBet(amount, type);
  await fakeSleep(600);
  setLoading(false);
};

/** Called when the user clicks bet while a round is already in progress.
 *  In single-player mode we just show a brief "processing" state — the
 *  round cannot be joined mid-flight, so we don't restart it. */
export const enterGame = async (
  wallet: any,
  _pda: PublicKey,
  _amount: number,
  setLoading: Function,
  _endTimestamp: number,
  _type: GameType = "tower"
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  await fakeSleep(600);
  setLoading(false);
};
