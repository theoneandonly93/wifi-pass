import React from "react";
import RewardsTimer from "../components/RewardsTimer";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#181a1b]">
      <h2 className="text-3xl font-extrabold mb-8 text-white tracking-widest">Dopelganga Dashboard</h2>
      <div className="w-full max-w-xl bg-black bg-opacity-90 rounded-2xl shadow-xl p-10">
        <p className="mb-6 text-center text-lg text-gray-400 font-medium">
          Manage your active passes, view hotspot NFTs, and activate eSIM profiles.
        </p>
        <div className="mb-6">
          <RewardsTimer />
        </div>
        <ul className="list-disc pl-6 mb-6 text-gray-300">
          <li>Active Pass: <span className="font-semibold text-white">Monthly</span> (expires in 29 days)</li>
          <li>Hotspot NFT: <span className="font-semibold text-white">#1234</span></li>
          <li>eSIM Status: <span className="font-semibold text-green-500">Active</span></li>
        </ul>
        <button className="px-6 py-2 rounded-lg font-semibold bg-gray-700 bg-opacity-60 text-white hover:bg-gray-600 transition shadow-md">Renew Pass</button>
      </div>
    </div>
  );
}
