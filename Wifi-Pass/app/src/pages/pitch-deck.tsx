
import React, { useState } from 'react';
import Head from 'next/head';

const slides = [
  {
    title: 'Dopelganga Pitch Deck',
    content: (
      <>
        <img src="/solanaLogo.png" alt="Dopelganga Logo" className="mx-auto mb-6 w-24 h-24 rounded-full border-4 border-purple-600 bg-white" />
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight text-center">Dopelganga</h1>
        <p className="text-lg text-zinc-200 text-center">Empowering global connectivity through decentralized, secure, and affordable WiFi access for everyone.</p>
      </>
    ),
  },
  {
    title: 'Problem',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">The Problem</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Billions lack affordable, reliable internet access.</li>
          <li>Current WiFi sharing is fragmented, insecure, and hard to monetize.</li>
          <li>Travelers and remote workers face connectivity barriers worldwide.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Solution',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Our Solution</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Decentralized WiFi pass marketplace on Solana</li>
          <li>Secure, seamless wallet-based access and payments</li>
          <li>Global coverage map and real-time rewards</li>
          <li>Easy onboarding for hosts and users</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Product',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Product Overview</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Buy, sell, and share WiFi passes globally</li>
          <li>Integrated Solana wallet for instant transactions</li>
          <li>Mobile and desktop support</li>
          <li>Coverage map, activity log, and rewards dashboard</li>
        </ul>
        <img src="/wifi.png" alt="Product Screenshot" className="mx-auto mt-6 w-64 rounded-xl shadow-lg border-2 border-zinc-700" />
      </>
    ),
  },
  {
    title: 'Market',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Market Opportunity</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>$1T+ global connectivity market</li>
          <li>3.5B+ people still lack reliable internet</li>
          <li>Remote work, travel, and IoT drive demand</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Business Model',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Business Model</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Transaction fees on WiFi pass sales</li>
          <li>Premium features for hosts and users</li>
          <li>Partnerships with ISPs and device makers</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Go-to-Market',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Go-to-Market Strategy</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Launch in major travel hubs and remote work hotspots</li>
          <li>Incentivize early adopters with rewards</li>
          <li>Partner with local ISPs and communities</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Traction',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Traction & Milestones</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Beta launched with 1,000+ users</li>
          <li>Partnerships with 5+ local ISPs</li>
          <li>Featured at Solana Breakpoint 2025</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Team',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Meet the Team</h2>
        <div className="flex flex-wrap gap-8 justify-center mt-4">
          <div className="flex flex-col items-center">
            <img src="/solanaLogo.png" alt="Alex Founder" className="w-20 h-20 rounded-full border-2 border-purple-600 mb-2 bg-white" />
            <span className="text-white font-semibold">Alex Founder</span>
            <span className="text-zinc-400 text-sm">CEO</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/solanaLogo.png" alt="Jamie Tech" className="w-20 h-20 rounded-full border-2 border-blue-500 mb-2 bg-white" />
            <span className="text-white font-semibold">Jamie Tech</span>
            <span className="text-zinc-400 text-sm">CTO</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/solanaLogo.png" alt="Taylor Ops" className="w-20 h-20 rounded-full border-2 border-green-500 mb-2 bg-white" />
            <span className="text-white font-semibold">Taylor Ops</span>
            <span className="text-zinc-400 text-sm">COO</span>
          </div>
        </div>
      </>
    ),
  },
  {
    title: 'Roadmap',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Roadmap</h2>
        <ul className="list-disc list-inside text-zinc-200 text-lg mx-auto max-w-xl">
          <li>Q4 2025: Mainnet launch, mobile app release</li>
          <li>Q1 2026: Expand to 10+ new cities, add fiat onramps</li>
          <li>Q2 2026: Launch enterprise and IoT solutions</li>
        </ul>
      </>
    ),
  },
  {
    title: 'Contact',
    content: (
      <>
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Contact & Download</h2>
        <p className="text-zinc-200 text-lg text-center mb-6">Let's connect! Reach out for partnership, investment, or to join the team.</p>
        <div className="flex flex-col items-center gap-2 mb-6">
          <a href="mailto:hello@dopelganga.com" className="text-blue-400 underline">hello@dopelganga.com</a>
          <a href="https://twitter.com/dopelganga" className="text-blue-400 underline">@dopelganga</a>
        </div>
        <a
          href="/pitch-deck.pdf"
          download
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-150"
        >
          Download Full Pitch Deck (PDF)
        </a>
      </>
    ),
  },
];

const PitchDeckPage = () => {
  const [slide, setSlide] = useState(0);

  const goNext = () => setSlide((s) => Math.min(s + 1, slides.length - 1));
  const goBack = () => setSlide((s) => Math.max(s - 1, 0));

  return (
    <>
      <Head>
        <title>Pitch Deck | Dopelganga</title>
        <meta name="description" content="Dopelganga Pitch Deck - Vision, Product, and Team" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 bg-gradient-to-b from-black via-zinc-900 to-zinc-800">
        <div className="max-w-2xl w-full bg-white bg-opacity-5 rounded-2xl shadow-xl p-8 border border-zinc-700 relative">
          <div className="absolute top-4 left-4 text-zinc-400 text-sm">{slide + 1} / {slides.length}</div>
          <div className="flex flex-col gap-6 min-h-[340px] justify-center">
            {slides[slide].content}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={goBack}
              disabled={slide === 0}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-150 ${slide === 0 ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-gradient-to-r from-zinc-700 to-zinc-900 text-white hover:from-zinc-800 hover:to-zinc-700'}`}
            >
              Back
            </button>
            <button
              onClick={goNext}
              disabled={slide === slides.length - 1}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-150 ${slide === slides.length - 1 ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default PitchDeckPage;
