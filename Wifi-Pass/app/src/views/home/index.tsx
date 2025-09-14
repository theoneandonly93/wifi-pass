// Next, React
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  // Redirect to /passes when wallet connects
  const router = useRouter();

  // No auto-redirects. Only go to coverage when button is clicked.

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col items-center">
        <div className="mt-10 max-w-2xl w-full bg-black bg-opacity-90 shadow-2xl rounded-3xl p-12 flex flex-col items-center">
          <div className='text-sm font-normal align-bottom text-right text-slate-600 w-full mb-2'>v{pkg.version}</div>
          <h1 className="text-center text-5xl font-extrabold text-white mb-4 tracking-widest">
            Dopelganga
          </h1>
          <h3 className="text-center text-2xl font-semibold text-gray-300 mb-6">
            Decentralized WiFi & Cellular Service
          </h3>
          <p className="text-center text-lg text-slate-400 mb-8">
            Welcome to Dopelganga! Access, manage, and share decentralized wireless passes and GhostSim (gSim). Instantly connect to the future of wireless freedom.
          </p>
          <button
            className="btn btn-primary btn-lg bg-gray-700 text-white hover:bg-gray-600 transform hover:scale-110 transition-all"
            onClick={async () => {
              if (!wallet.connected && wallet.connect) {
                await wallet.connect();
              }
              // Always go to coverage map when button is clicked
              router.push('/coverage');
            }}
          >
            Find a Hotspot
          </button>
        </div>
        {/* Phone image, 1 inch (24px) below the card holder and 1 inch (24px) above the footer */}
        <div style={{ marginTop: 24, marginBottom: 24 }} className="flex items-center justify-center w-full">
          <img
            src="/wifi.png"
            alt="Smartphone Wi‑Fi Settings Overview"
            className="block max-w-[90vw] sm:max-w-[60vw] md:max-w-[480px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
