


import dynamic from "next/dynamic";
const CoverageMap = dynamic(() => import("../components/CoverageMap"), { ssr: false });

import { useRouter } from "next/router";

export default function Coverage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-[#181a1b] p-0 m-0 relative">
      {/* X button to exit coverage map */}
      <button
        className="absolute top-6 right-8 z-50 bg-black bg-opacity-80 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-zinc-700 shadow-lg hover:bg-opacity-100 hover:text-red-400 transition"
        onClick={() => router.push("/")}
        aria-label="Close coverage map"
      >
        &times;
      </button>
      <div className="w-full h-[90vh]">
        <CoverageMap />
      </div>
    </div>
  );
}
