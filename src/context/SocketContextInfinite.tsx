/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect, useContext, useRef, useCallback } from "react";
import { ChatType, Player } from "../utils/type";
import { MOCK_MESSAGES, MOCK_ONLINED, MOCK_PDA } from "../mock/data";
import { registerBetHandler } from "../mock/gameEvents";

const COUNTDOWN_MS = 6_000;
// Infinite ball animation takes up to ~22 s (720*3+720*7 deg at ~6°/frame @40fps)
const RUNNING_MS   = 26_000;
const RESULTS_MS   = 4_000;

const FAKE_USER = "11111111111111111111111111111111";
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
  startTimeStamp?: number;
  setStartTimeStamp?: Function;
  heartbeat?: number;
}

const context = createContext<Context>({});
export const useSocket = () => useContext(context);

const SocketProviderInfinite = (props: { children: any }) => {
  const [started,        setStarted]        = useState(false);
  const [messages,       setMessages]       = useState<ChatType[]>(MOCK_MESSAGES);
  const [onlined]                           = useState(MOCK_ONLINED);
  const [isStarting,     setGameStarting]   = useState<number>(1);
  const [startTimeStamp, setStartTimeStamp] = useState(0);
  const [gameData,       setGameData]       = useState<Context["gameData"]>();
  // Use false (not undefined) so Selector's useEffect triggers setTimer(0) on new round
  const [gameEnded,      setGameEnded]      = useState<boolean | undefined>(undefined);
  const [winner,         setWinner]         = useState({ bet: 0, payout: 0, winner: "", resultHeight: 0 });
  const [heartbeat,      setHeartbeat]      = useState(Date.now());

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // Minimal – Selector.tsx already calls setTimer(0) directly in its gameEnded effect.
  // We do not clear winner/started here so the result stays visible until the next round.
  const setClearGame = () => {
    setGameStarting(1);
  };

  const startRound = useCallback((betAmount: number) => {
    clearTimers();

    // Pre-compute winner immediately (server-style)
    const userWins     = Math.random() < 0.4;
    const winnerAddr   = userWins ? FAKE_USER
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

    // Setting gameEnded = false causes Selector's useEffect to call setTimer(0)
    setGameEnded(false);
    setGameData({ players: allPlayers, endTimestamp: Date.now() + COUNTDOWN_MS, pda: MOCK_PDA, gameStarted: true });
    setWinner({ bet: 0, payout: 0, winner: "", resultHeight: 0 });
    setStarted(false);
    setGameStarting(1);
    setStartTimeStamp(Date.now());

    // Phase 2: reveal winner → target > 0 → Selector's ball starts moving
    const t1 = setTimeout(() => {
      setStarted(true);
      setWinner(pendingWinner);
    }, COUNTDOWN_MS);

    // Phase 3: mark game as ended (ball has reached target by now)
    const t2 = setTimeout(() => {
      setGameEnded(true);
    }, COUNTDOWN_MS + RUNNING_MS);

    // Phase 4: full reset to idle
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
    registerBetHandler("infinite", startRound);
    return () => clearTimers();
  }, [startRound]);

  useEffect(() => {
    const id = setInterval(() => setHeartbeat(Date.now()), 5_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const samples = ["infinite mode! 🌀", "gg", "rialo 🔥", "nice spin!", "who's next?"];
    const id = setInterval(() => {
      setMessages(prev => [
        ...(prev ?? []),
        {
          user_name: `inf_${Math.floor(Math.random() * 9000) + 1000}`,
          message: samples[Math.floor(Math.random() * samples.length)],
          timestamp: Date.now(),
        },
      ]);
    }, 14_000);
    return () => clearInterval(id);
  }, []);

  return (
    <context.Provider value={{ gameData, gameEnded, winner, setClearGame, isStarting, started, setStarted, messages, onlined, startTimeStamp, setStartTimeStamp, heartbeat }}>
      {props.children}
    </context.Provider>
  );
};

export default SocketProviderInfinite;
