"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <nav className="w-full bg-background border-b border-border px-6 py-4 flex justify-between">
      <span className="text-4xl font-extrabold text-foreground">Mitte</span>
      <WalletMultiButton />
    </nav>
  );
};

export default Navbar;
