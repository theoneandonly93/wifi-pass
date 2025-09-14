import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";

// Example static conversion rate: 1 SOL = $150
const SOL_TO_USD = 150;
const plans = [
  { type: "Basic", price: 0.02, duration: "24 hours" },
  { type: "Pro", price: 0.05, duration: "7 days" },
  { type: "Unlimited", price: 0.15, duration: "30 days" },
];

export default function Plans() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  // Simulate storing plan in localStorage
  const storePlan = (plan: any) => {
    const stored = localStorage.getItem("mywifipasses");
    const list = stored ? JSON.parse(stored) : [];
    list.push(plan);
    localStorage.setItem("mywifipasses", JSON.stringify(list));
  };

  const handleBuy = useCallback((planType: string) => {
    if (!connected) return;
    const plan = plans.find((p) => p.type === planType);
    if (!plan) return;
    if (confirm(`Buy ${planType} plan with GFI/USDC?`)) {
      storePlan({
        ...plan,
        status: "inactive",
        purchasedAt: new Date().toLocaleString(),
      });
      alert("Purchase successful! See MyWifiPass.");
      router.push("/mywifipass");
    }
  }, [connected, router]);

  const handleActivate = useCallback(async (planType: string) => {
    if (!connected || !publicKey) return;
    const plan = plans.find((p) => p.type === planType);
    if (!plan) return;
    if (confirm(`Activate and buy ${planType} plan?`)) {
      storePlan({
        ...plan,
        status: "inactive",
        purchasedAt: new Date().toLocaleString(),
      });
      try {
        await fetch('/api/provision/esim', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'activate', wallet: publicKey.toBase58() })
        });
      } catch {}
      alert("Plan purchased! eSIM provisioning available under Provisioning.");
      router.push("/provision");
    }
  }, [connected, publicKey, router]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 sm:p-4 bg-[#181a1b] overflow-x-hidden overflow-y-auto">
      <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-8 text-white tracking-widest text-center w-full">Dopelganga Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-5xl">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className="bg-black bg-opacity-60 sm:bg-opacity-80 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col items-center backdrop-blur-md border border-white border-opacity-10"
            style={{ minWidth: 0, maxWidth: '100%', transition: 'all 0.2s', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.25)' }}
          >
            <span className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-white">{plan.type}</span>
            <span className="mb-1 sm:mb-2 text-gray-400 text-xs sm:text-base">{plan.duration}</span>
            <span className="mb-1 text-base sm:text-lg text-gray-300 font-bold">{plan.price} SOL</span>
            <span className="mb-3 sm:mb-6 text-xs text-gray-400">(~${(plan.price * SOL_TO_USD).toFixed(2)} USD)</span>
            {connected ? (
              <div className="flex flex-col gap-2 w-full mt-2 sm:mt-4">
                <button
                  className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold bg-gray-700 bg-opacity-60 text-white hover:bg-gray-600 transition shadow-md text-xs sm:text-base"
                  onClick={() => handleBuy(plan.type)}
                >
                  Buy
                </button>
                <button
                  className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold bg-blue-700 bg-opacity-80 text-white hover:bg-blue-800 transition shadow-md text-xs sm:text-base"
                  onClick={() => handleActivate(plan.type)}
                >
                  Activate
                </button>
              </div>
            ) : (
              <span className="text-gray-500 text-xs sm:text-base">Connect wallet to buy</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

