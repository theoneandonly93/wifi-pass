import { NextPage } from "next";

const plans = [
  {
    name: "Starter Pass",
    price: "$19/mo",
    speed: "Up to 300 Mbps",
    features: [
      "Unlimited WiFi access across all Dopelganga hotspots",
      "High-speed data program with no throttling",
      "Supports up to 3 devices simultaneously",
      "Military-grade encryption for all connections",
      "99.99% uptime guarantee",
      "No contracts, cancel anytime",
      "24/7 live support",
      "No hidden fees, ever",
      "Access to exclusive member events and offers",
    ],
    compare: "Cheaper than Xfinity's entry plan ($30/mo for 200 Mbps). Faster, more secure, and more reliable.",
    networkBenefits: [
      "Global unlimited coverage on the Dopelganga network",
      "Automatic connection to the fastest node nearby",
      "Seamless handoff between hotspots for uninterrupted browsing",
      "Access to the Dopelganga rewards program",
    ],
  },
  {
    name: "Pro Pass",
    price: "$39/mo",
    speed: "Up to 1 Gbps",
    features: [
      "All Starter Pass features included",
      "Priority network access during peak hours",
      "Supports up to 10 devices simultaneously",
      "Advanced parental controls and content filtering",
      "Dedicated support line with 1-hour response",
      "Free mobile app for network management",
      "Early access to new features and beta programs",
    ],
    compare: "Xfinity's comparable plan is $70/mo for 800 Mbps. Dopelganga is faster, more secure, and more reliable.",
    networkBenefits: [
      "Unlimited high-speed data with zero slowdowns",
      "Access to premium Dopelganga nodes for even lower latency",
      "Network analytics dashboard for usage insights",
      "Priority access to new coverage areas and upgrades",
    ],
  },
  {
    name: "Elite Pass",
    price: "$69/mo",
    speed: "Up to 2.5 Gbps",
    features: [
      "All Pro Pass features included",
      "Enterprise-grade security and DDoS protection",
      "Unlimited device connections",
      "VIP customer support with 15-min response",
      "Custom network analytics and reporting",
      "Global roaming included at no extra cost",
      "Invitation to Dopelganga Founders Circle",
    ],
    compare: "Xfinity's gigabit plan is $100+/mo for 1.2 Gbps. Dopelganga is cheaper, more than 2x faster, and offers better reliability and security.",
    networkBenefits: [
      "Elite access to the fastest, most reliable Dopelganga nodes worldwide",
      "Guaranteed bandwidth even during network congestion",
      "Personalized onboarding and network optimization",
      "Direct line to Dopelganga network engineers",
    ],
  },
];

const Plans: NextPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#181a1b] text-white py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Available Plans</h1>
      <p className="text-lg mb-10 text-center max-w-2xl">
        Dopelganga offers blazing fast, ultra-secure, and reliable WiFi plans for less than Xfinity. Choose the plan that fits your needs and enjoy a better network—everywhere.
      </p>
      <div className="flex flex-wrap gap-8 justify-center">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-[#23272a] rounded-2xl shadow-xl border border-zinc-700 max-w-xs w-full p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
            <div className="text-3xl font-extrabold mb-2 text-blue-400">{plan.price}</div>
            <div className="text-base mb-4 text-zinc-300">{plan.speed}</div>
            <ul className="list-disc list-inside text-zinc-200 text-left mb-4">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="w-full mb-3">
              <div className="font-semibold text-white mb-1">What you get from the network:</div>
              <ul className="list-disc list-inside text-green-300 text-left text-sm">
                {plan.networkBenefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-green-400 font-semibold text-center mb-2">{plan.compare}</div>
            <button className="mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-150">Get Started</button>
          </div>
        ))}
      </div>
      <div className="mt-12 text-zinc-400 text-sm text-center max-w-xl">
        <b>Why Dopelganga?</b> <br />
        <span>
          Our network is built on next-gen decentralized infrastructure, offering faster speeds, lower latency, and unmatched security. No contracts, no hidden fees, just better internet—everywhere you go.
        </span>
      </div>
    </div>
  );
};

export default Plans;
