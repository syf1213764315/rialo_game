/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext, useRef, useCallback } from "react";
import { ChatType, Player } from "../utils/type";
import { MOCK_MESSAGES, MOCK_ONLINED, MOCK_PDA } from "../mock/data";
import { registerBetHandler } from "../mock/gameEvents";
// This provider handles the "tower" game type

// ── Timing ────────────────────────────────────────────────────────────────────
const COUNTDOWN_MS = 6_000;   // 6 s countdown bar
const RUNNING_MS   = 8_000;   // 8 s animation runs (ball reaches target in ~2-4 s)
const RESULTS_MS   = 3_000;   // 3 s to show result before full reset

// Fake addresses
const FAKE_USER = "11111111111111111111111111111111"; // matches FakeWalletContext

const FAKE_OPPONENTS: Player[] = [
  { player: "7xKXjBnQ4mNpFdR3gYwLkC9sHvE2iT6yAg4kC3mNp", amount: 1_500_000_000 },
  { player: "4qABcWzX8pLmRhT2yVdKjM5eN7fQ3sUoP1bI6gE9r", amount:   500_000_000 },
];

interface Context {
  socket?: undefined;
  gameData?: { players: Player[]; pda: string; endTimestamp: number; gameStarted: boolean };
  gameEnded?: boolean;
  winner?: { winner: string; resultHeight: number; bet: number; payout: number };
  resultHeight?: number;
  setClearGame?: Function;
  started?: boolean;
  setStarted?: Function;
  messages?: ChatType[];
  onlined?: number;
  isStarting?: number;
  recentWinners?: any[];
}

const context = createContext<Context>({});
export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
  const [started,    setStarted]      = useState(false);
  const [messages,   setMessages]     = useState<ChatType[]>(MOCK_MESSAGES);
  const [onlined]                     = useState(MOCK_ONLINED);
  const [isStarting, setGameStarting] = useState<number>(1);
  const [gameData,   setGameData]     = useState<Context["gameData"]>();
  // Use false (not undefined) so Selector's useEffect resets setTimer(0) on new round
  const [gameEnded,  setGameEnded]    = useState<boolean | undefined>(undefined);
  const [winner,     setWinner]       = useState({ bet: 0, payout: 0, winner: "", resultHeight: 0 });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // Minimal – Selector.tsx calls this; we only reset isStarting.
  // setTimer(0) is already called DIRECTLY inside Selector's gameEnded useEffect.
  // We intentionally don't clear winner/started so the result stays visible.
  const setClearGame = () => {
    setGameStarting(1);
  };

  const startRound = useCallback((betAmount: number) => {
    clearTimers();

    // Pre-compute the winner NOW (like a server would)
    const userWins    = Math.random() < 0.4;
    const winnerAddr  = userWins ? FAKE_USER
                      : FAKE_OPPONENTS[Math.floor(Math.random() * FAKE_OPPONENTS.length)].player;
    const resultHeight = Math.floor(Math.random() * 7) + 1;
    const pendingWinner = {
      winner: winnerAddr,
      bet: betAmount,
      payout: userWins ? parseFloat((betAmount * 1.9).toFixed(4)) : 0,
      resultHeight,
    };

    const allPlayers: Player[] = [
      { player: FAKE_USER, amount: Math.floor(betAmount * 1e9) },
      ...FAKE_OPPONENTS,
    ];

    // Signal new round → Selector's useEffect will call setTimer(0)
    setGameEnded(false);
    setGameData({ players: allPlayers, endTimestamp: Date.now() + COUNTDOWN_MS, pda: MOCK_PDA, gameStarted: true });
    setWinner({ bet: 0, payout: 0, winner: "", resultHeight: 0 });
    setStarted(false);
    setGameStarting(1);

    // Phase 2: show animation + reveal winner so target > 0 → ball moves
    const t1 = setTimeout(() => {
      setStarted(true);
      setWinner(pendingWinner);   // target = resultHeight*500+2500 → ball starts moving
    }, COUNTDOWN_MS);

    // Phase 3: game over (ball has reached target by now)
    const t2 = setTimeout(() => {
      setGameEnded(true);
    }, COUNTDOWN_MS + RUNNING_MS);

    // Phase 4: full reset to idle state
    const t3 = setTimeout(() => {
      setGameData(undefined);
      setWinner({ bet: 0, payout: 0, winner: "", resultHeight: 0 });
      setGameEnded(undefined);
      setStarted(false);
      setGameStarting(1);
    }, COUNTDOWN_MS + RUNNING_MS + RESULTS_MS);

    timers.current = [t1, t2, t3];
  }, []);

  useEffect(() => {
    registerBetHandler("tower", startRound);
    return () => clearTimers();
  }, [startRound]);

  // Periodic fake chat messages
  useEffect(() => {
    const samples = ["let's gooo! 🔥", "good luck!", "gg", "who's winning?", "nice pot!"];
    const id = setInterval(() => {
      setMessages(prev => [
        ...(prev ?? []),
        {
          user_name: `player_${Math.floor(Math.random() * 9000) + 1000}`,
          message: samples[Math.floor(Math.random() * samples.length)],
          timestamp: Date.now(),
        },
      ]);
    }, 14_000);
    return () => clearInterval(id);
  }, []);

  return (
    <context.Provider value={{ gameData, gameEnded, winner, setClearGame, isStarting, started, setStarted, messages, onlined }}>
      {props.children}
    </context.Provider>
  );
};

export default SocketProvider;
