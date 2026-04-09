import React from "react";
import { FakeWalletProvider } from "./FakeWalletContext";

export default function Wallet(props: { children: any }) {
  return (
    <FakeWalletProvider>
      {props.children}
    </FakeWalletProvider>
  );
}
