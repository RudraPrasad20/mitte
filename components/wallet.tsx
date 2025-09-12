"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const Wallet = () => {
  const endpoint = process.env.NEXT_PUBLIC_RPC_URL!;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Wallet;
