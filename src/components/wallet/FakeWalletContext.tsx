import React, { createContext, useContext, useState, ReactNode } from "react";
import { PublicKey } from "@solana/web3.js";

// A fake public key for the fake connection
const FAKE_PUBLIC_KEY = new PublicKey("11111111111111111111111111111111");

interface FakeWalletContextState {
  connected: boolean;
  publicKey: PublicKey | null;
  connect: () => void;
  disconnect: () => void;
  wallet: {
    adapter: {
      name: string;
      icon: string;
    };
  } | null;
  signTransaction?: (transaction: any) => Promise<any>;
}

const FakeWalletContext = createContext<FakeWalletContextState>({
  connected: false,
  publicKey: null,
  connect: () => {},
  disconnect: () => {},
  wallet: null,
});

export const useWallet = () => useContext(FakeWalletContext);

export const FakeWalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(true); // auto-connected by default

  const connect = () => setConnected(true);
  const disconnect = () => setConnected(false);

  return (
    <FakeWalletContext.Provider
      value={{
        connected,
        publicKey: connected ? FAKE_PUBLIC_KEY : null,
        connect,
        disconnect,
        signTransaction: async (tx: any) => {
          console.log("Fake wallet signed transaction:", tx);
          return tx;
        },
        wallet: connected
          ? {
              adapter: {
                name: "Fake Wallet",
                icon: "",
              },
            }
          : null,
      }}
    >
      {children}
    </FakeWalletContext.Provider>
  );
};

export const FakeWalletMultiButton = ({ className }: { className?: string }) => {
  const { connected, connect, disconnect, publicKey } = useWallet();

  return (
    <button
      className={`wallet-adapter-button wallet-adapter-button-trigger ${className || ""}`}
      onClick={connected ? disconnect : connect}
      style={{
        backgroundColor: "#2e2a27",
        color: "#f0ece2",
        padding: "10px 20px",
        borderRadius: "10px",
        fontWeight: "bold",
        border: "1px solid rgba(240,236,226,0.2)",
        letterSpacing: "0.02em",
      }}
    >
      {connected
        ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}`
        : "Select Wallet"}
    </button>
  );
};
