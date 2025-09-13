import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

// Example static conversion rate: 1 SOL = $150
const SOL_TO_USD = 150;
const passes = [
  { type: "Daily", price: 0.02, duration: "24 hours" },
  { type: "Weekly", price: 0.05, duration: "7 days" },
  { type: "Monthly", price: 0.15, duration: "30 days" },
];

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function Passes() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  // Simulate storing pass in localStorage
  const storePass = (pass: any) => {
    const stored = localStorage.getItem("mywifipasses");
    const passes = stored ? JSON.parse(stored) : [];
    passes.push(pass);
    localStorage.setItem("mywifipasses", JSON.stringify(passes));
  };

  const handleBuy = useCallback((passType: string) => {
    if (!connected) return;
    const pass = passes.find((p) => p.type === passType);
    if (!pass) return;
    // Simulate payment (SOL or debit card)
    if (confirm(`Buy ${passType} pass with SOL or debit card?`)) {
      storePass({
        ...pass,
        status: "inactive",
        purchasedAt: new Date().toLocaleString(),
      });
      alert("Purchase successful! Pass sent to MyWifiPass.");
      router.push("/mywifipass");
    }
  }, [connected, router]);

  const handleActivate = useCallback((passType: string) => {
    if (!connected) return;
    const pass = passes.find((p) => p.type === passType);
    if (!pass) return;
    // Simulate payment if not already bought
    if (confirm(`Activate and buy ${passType} pass?`)) {
      storePass({
        ...pass,
        status: "inactive",
        purchasedAt: new Date().toLocaleString(),
      });
      alert("Pass purchased! Now set up your gSim (ghostSim) for activation.");
      // Simulate gSim setup prompt
      setTimeout(() => {
        alert("gSim setup coming soon!");
        router.push("/mywifipass");
      }, 500);
    }
  }, [connected, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#181a1b]">
      <h2 className="text-6xl font-extrabold mb-8 text-white tracking-widest">Dopleganga Passes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {passes.map((pass) => (
          <div key={pass.type} className="bg-black bg-opacity-90 shadow-2xl rounded-3xl p-12 flex flex-col items-center">
            <span className="text-2xl font-bold mb-2 text-white">{pass.type}</span>
            <span className="mb-2 text-gray-400">{pass.duration}</span>
            <span className="mb-1 text-lg text-gray-300 font-bold">{pass.price} SOL</span>
            <span className="mb-6 text-xs text-gray-400">(~${(pass.price * SOL_TO_USD).toFixed(2)} USD)</span>
            {connected ? (
              <div className="flex flex-col gap-2 w-full mt-4">
                <button
                  className="px-6 py-2 rounded-lg font-semibold bg-gray-700 bg-opacity-60 text-white hover:bg-gray-600 transition shadow-md"
                  onClick={() => handleBuy(pass.type)}
                >
                  Buy
                </button>
                <button
                  className="px-6 py-2 rounded-lg font-semibold bg-blue-700 bg-opacity-80 text-white hover:bg-blue-800 transition shadow-md"
                  onClick={() => handleActivate(pass.type)}
                >
                  Activate
                </button>
              </div>
            ) : (
              <span className="text-gray-500">Connect wallet to buy</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
