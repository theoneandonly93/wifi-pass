import React from "react";
import dynamic from "next/dynamic";

// Dynamically import WalletMultiButton to avoid SSR issues
const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function ConnectWallet() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
      <p className="mb-4">To purchase a Dopleganga pass and manage your wireless access, please connect your wallet.</p>
      <WalletMultiButton />
    </div>
  );
}
