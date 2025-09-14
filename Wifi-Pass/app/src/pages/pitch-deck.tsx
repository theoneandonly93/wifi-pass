import React from 'react';
import Head from 'next/head';

const PitchDeckPage = () => {
  return (
    <>
      <Head>
        <title>Pitch Deck | Dopelganga</title>
        <meta name="description" content="Dopelganga Pitch Deck - Vision, Product, and Team" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 bg-gradient-to-b from-black via-zinc-900 to-zinc-800">
        <div className="max-w-3xl w-full bg-white bg-opacity-5 rounded-2xl shadow-xl p-8 border border-zinc-700">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight text-center">Dopelganga Pitch Deck</h1>
          <p className="text-lg text-zinc-200 mb-8 text-center">Discover our vision, product, and team. Download the full deck below.</p>
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-2">Our Vision</h2>
              <p className="text-zinc-300">Empowering global connectivity through decentralized, secure, and affordable WiFi access for everyone.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-2 mt-4">Product Overview</h2>
              <ul className="list-disc list-inside text-zinc-300">
                <li>Decentralized WiFi pass marketplace</li>
                <li>Seamless Solana wallet integration</li>
                <li>Global coverage map and rewards</li>
                <li>Mobile and desktop support</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-white mb-2 mt-4">Team</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex flex-col items-center">
                  <img src="/solanaLogo.png" alt="Founder" className="w-16 h-16 rounded-full border-2 border-zinc-600 mb-2" />
                  <span className="text-white font-semibold">Alex Founder</span>
                  <span className="text-zinc-400 text-sm">CEO</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/solanaLogo.png" alt="CTO" className="w-16 h-16 rounded-full border-2 border-zinc-600 mb-2" />
                  <span className="text-white font-semibold">Jamie Tech</span>
                  <span className="text-zinc-400 text-sm">CTO</span>
                </div>
                {/* Add more team members as needed */}
              </div>
            </section>
            <section className="mt-8 flex flex-col items-center">
              <a
                href="/pitch-deck.pdf"
                download
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-150"
              >
                Download Full Pitch Deck (PDF)
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default PitchDeckPage;
