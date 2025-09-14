import React, { useEffect, useState } from 'react';
import RewardsTimer from '../components/RewardsTimer';
import { useWallet } from '@solana/wallet-adapter-react';

// TODO: Connect to backend/contract for real data
// Remove all dummy data and connect these states to real contract calls in the next step

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

const MyRewards: React.FC = () => {
  const [vaultValue, setVaultValue] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [gfiBalance, setGfiBalance] = useState<number>(0);
  const [calcPlan, setCalcPlan] = useState<number>(0);
  const [calcTokens, setCalcTokens] = useState<number>(0);
  const [calcShare, setCalcShare] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/api/rewards/next');
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        setVaultValue(data.vaultSOL || 0);
        setCountdown(data.secondsRemaining || 0);
      } catch {}
    };
    load();
    const t = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    const p = setInterval(load, 15000);
    return () => { mounted = false; clearInterval(t); clearInterval(p); };
  }, []);

  const { publicKey } = useWallet();
  useEffect(() => {
    const wallet = publicKey?.toBase58();
    if (!wallet) return;
    (async () => {
      try {
        const res = await fetch(`/api/rewards/balance?wallet=${wallet}`);
        if (res.ok) {
          const data = await res.json();
          setGfiBalance(data.gfi || 0);
        }
      } catch {}
    })();
  }, [publicKey]);

  // Rewards calculator logic
  useEffect(() => {
    if (vaultValue > 0 && (calcPlan > 0 || calcTokens > 0)) {
      // Placeholder: user share = (plan * tokens) / (total plan*token) * vault
      // For demo, assume total = 10000
      setCalcShare(((calcPlan * calcTokens) / 10000) * vaultValue);
    } else {
      setCalcShare(0);
    }
  }, [vaultValue, calcPlan, calcTokens]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Rewards & Community Vault</h1>
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Vault Value</span>
          <span className="text-2xl font-mono">{vaultValue.toFixed(2)} SOL</span>
        </div>
        <div className="mb-2">
          <RewardsTimer />
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Rewards Calculator</h2>
        <div className="flex flex-col gap-2 mb-2">
          <label>
            Plan Value (SOL):
            <input type="number" className="input input-bordered ml-2" value={calcPlan} onChange={e => setCalcPlan(Number(e.target.value))} />
          </label>
          <label>
            Token Holdings:
            <input type="number" className="input input-bordered ml-2" value={calcTokens} onChange={e => setCalcTokens(Number(e.target.value))} />
          </label>
        </div>
        <div className="text-green-400 font-bold">Estimated Reward: {calcShare.toFixed(4)} SOL</div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Your GFI Balance</h2>
        <div className="mb-1">Claimable GFI: <span className="font-mono text-lg">{gfiBalance.toFixed(4)}</span></div>
        <div className="text-xs text-gray-400">Distributions occur daily at 00:00 UTC.</div>
      </div>
    </div>
  );
};

export default MyRewards;
