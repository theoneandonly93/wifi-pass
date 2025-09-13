import React, { useEffect, useState } from 'react';

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
  const [userData, setUserData] = useState<any>(null);
  const [calcPlan, setCalcPlan] = useState<number>(0);
  const [calcTokens, setCalcTokens] = useState<number>(0);
  const [calcShare, setCalcShare] = useState<number>(0);

  // TODO: Connect to backend/contract for real data
  // useEffect(() => {
  //   fetchVaultValue().then(setVaultValue);
  //   fetchCountdown().then(setCountdown);
  //   fetchUserData().then(setUserData);
  //   const interval = setInterval(() => {
  //     setCountdown((c) => (c > 0 ? c - 1 : 0));
  //     fetchVaultValue().then(setVaultValue);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

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
          <span className="text-sm text-gray-400">Next distribution in:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg">{formatTime(countdown)}</span>
            <progress className="progress progress-accent w-40" value={86400 - countdown} max={86400}></progress>
          </div>
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
        <h2 className="text-xl font-semibold mb-2">Your Claimable Rewards</h2>
        {userData && userData.eligible ? (
          <>
            <div className="mb-2">Claimable: <span className="font-mono text-lg">{userData.claimable.toFixed(4)} SOL</span></div>
            <button className="btn btn-primary" disabled={countdown > 0}>Claim Rewards</button>
            {countdown > 0 && <div className="text-xs text-gray-400 mt-1">You can claim after the next distribution.</div>}
          </>
        ) : (
          <div className="text-gray-400">You are not eligible for rewards this cycle.</div>
        )}
      </div>
    </div>
  );
};

export default MyRewards;
