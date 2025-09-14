import { FC, useState } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useAutoConnect } from '../contexts/AutoConnectProvider';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export const AppBar: FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="navbar flex h-20 flex-row shadow-lg bg-[#000000] text-neutral-content border-b border-zinc-600 px-4">
      {/* Left: Logo */}
      <div className="navbar-start flex items-center gap-2">
        <Link href="/" className="flex items-center">
          <img src="/solanaLogo.png" alt="Dopelganga Logo" className="h-10 w-10 mr-2" />
          <span className="text-white text-2xl font-bold tracking-widest hidden sm:inline">Dopelganga</span>
      </Link>
    </div>


      {/* Center: Text Tabs (hidden on small screens) */}
      <div className="flex-1 justify-center items-center gap-4 sm:gap-6 hidden sm:flex">
        <Link
          href="/coverage"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          Coverage
        </Link>
        <Link
          href="/hotspots"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          Hotspots
        </Link>
        <Link
          href="/passes"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          Plans
        </Link>
        <Link
          href="/myrewards"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          MyRewards
        </Link>
        <Link
          href="/mywifipass"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          MyWifiPass
        </Link>
        <Link
          href="/pitch-deck"
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          Pitch Deck
        </Link>
        <Link
          href="/provision"
          className="px-3 py-1 rounded-lg bg-gray-200 bg-opacity-20 text-gray-700 hover:bg-gray-300 hover:bg-opacity-30 text-base font-semibold tracking-wide transition-all duration-150 whitespace-nowrap"
        >
          Provisioning
        </Link>
      </div>

      {/* Right: Wallet + Hamburger */}
      <div className="navbar-end flex items-center gap-4">
        {/* Connect Wallet button */}
        <div className="mr-2">
          <WalletMultiButtonDynamic />
        </div>

        {/* Hamburger menu */}
        <button
          className="btn btn-ghost text-white text-3xl"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Open navigation menu"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile nav drawer */}
      {isNavOpen && (
        <div className="fixed top-6 right-6 z-50 flex flex-col items-end">
          <div className="bg-[#000000] rounded-2xl shadow-2xl p-4 w-56 flex flex-col items-center border border-zinc-800">
            <button
              className="self-end text-white text-2xl mb-2 hover:text-gray-400"
              onClick={() => setIsNavOpen(false)}
              aria-label="Close navigation menu"
            >
              &times;
            </button>
            <nav className="flex flex-col w-full items-center gap-3">
              <Link
                className="w-full py-2 text-lg font-semibold rounded-xl text-gray-200 bg-[#23272a] hover:bg-[#2d2f31] text-center transition-all duration-150"
                href="/coverage"
                onClick={() => setIsNavOpen(false)}
              >
                Coverage
              </Link>
              <a
                className="w-full py-2 text-lg font-semibold rounded-xl text-gray-200 bg-[#23272a] hover:bg-[#2d2f31] text-center transition-all duration-150"
                href="#"
                onClick={() => setIsNavOpen(false)}
              >
                Mobile (Expo)
              </a>
              <Link
                className="w-full py-2 text-lg font-semibold rounded-xl text-gray-200 bg-[#23272a] hover:bg-[#2d2f31] text-center transition-all duration-150"
                href="/passes"
                onClick={() => setIsNavOpen(false)}
              >
                Plans
              </Link>
              <a
                className="w-full py-2 text-lg font-semibold rounded-xl text-gray-200 bg-[#23272a] hover:bg-[#2d2f31] text-center transition-all duration-150"
                href="#"
                onClick={() => setIsNavOpen(false)}
              >
                Rewards
              </a>
              <hr className="w-3/4 border-zinc-700 my-2" />
              <Link
                className="w-full py-2 text-base font-semibold rounded-xl text-gray-700 bg-gray-200 bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 text-center transition-all duration-150 whitespace-nowrap"
                href="/myrewards"
                onClick={() => setIsNavOpen(false)}
              >
                MyRewards
              </Link>
              <Link
                className="w-full py-2 text-base font-semibold rounded-xl text-gray-700 bg-gray-200 bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 text-center transition-all duration-150 whitespace-nowrap"
                href="/mywifipass"
                onClick={() => setIsNavOpen(false)}
              >
                MyWifiPass
              </Link>
              <Link
                className="w-full py-2 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-center transition-all duration-150"
                href="/pitch-deck"
                onClick={() => setIsNavOpen(false)}
              >
                Pitch Deck
              </Link>
              <Link
                className="w-full py-2 text-base font-semibold rounded-xl text-gray-700 bg-gray-200 bg-opacity-20 hover:bg-gray-300 hover:bg-opacity-30 text-center transition-all duration-150 whitespace-nowrap"
                href="/provision"
                onClick={() => setIsNavOpen(false)}
              >
                Provisioning
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
