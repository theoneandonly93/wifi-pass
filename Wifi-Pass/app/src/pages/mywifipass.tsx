import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MyWifiPass() {
  const [passes, setPasses] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching passes from localStorage
    const stored = localStorage.getItem("mywifipasses");
    setPasses(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#181a1b] text-white p-4">
      <h1 className="text-3xl font-bold mb-6">MyWifiPass</h1>
      {passes.length === 0 ? (
        <p className="text-lg">No passes yet. Buy a pass to get started!</p>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          {passes.map((pass, i) => (
            <div key={i} className="bg-[#23272a] rounded-2xl p-6 flex flex-col gap-2 border border-zinc-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">{pass.type} Pass</span>
                <span className="text-gray-400">{pass.duration}</span>
              </div>
              <div className="text-gray-300">Status: <span className="font-semibold">{pass.status}</span></div>
              <div className="text-gray-400 text-sm">Purchased: {pass.purchasedAt}</div>
              {pass.status === "inactive" && (
                <button className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={() => window.location.href = '/provision'}>Activate Now</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
