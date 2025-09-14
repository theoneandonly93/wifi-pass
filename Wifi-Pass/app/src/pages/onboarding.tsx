import React from "react";
import Link from "next/link";

export default function Onboarding() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#181a1b]">
      <div className="bg-black bg-opacity-90 rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-xl w-full">
        <h1 className="text-4xl font-extrabold mb-4 text-white tracking-widest">Dopelganga</h1>
        <p className="mb-6 text-center text-lg text-gray-400 font-medium">
          Instantly access decentralized Wi‑Fi and cellular service. Connect your wallet, purchase a plan, and activate your hotspot or eSIM — all powered by Dopelganga.
        </p>
        <Link href="/passes" className="px-8 py-3 rounded-lg font-semibold bg-gray-700 bg-opacity-60 text-white hover:bg-gray-600 transition shadow-md">
          Get Started
        </Link>
      </div>
    </div>
  );
}

