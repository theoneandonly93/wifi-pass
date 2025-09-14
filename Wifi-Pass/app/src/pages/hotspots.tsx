import { useEffect, useState } from 'react'
import Link from 'next/link'

type Hotspot = { id: string; lat: number; lng: number; owner: string; createdAt: number }

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/hotspots')
        const data = await res.json()
        setHotspots(data.hotspots || [])
      } catch {}
    })()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registered Hotspots</h1>
      <p className="mb-4 text-gray-400">SSID for all hotspots: <span className="font-semibold text-white">Dopelganga.Fi</span></p>
      <div className="mb-6">
        <Link href="/coverage" className="btn btn-primary">Open Coverage Map</Link>
      </div>
      <div className="space-y-3">
        {hotspots.length === 0 && <div className="text-gray-500">No hotspots yet. Be the first to register on the coverage map.</div>}
        {hotspots.map(h => (
          <div key={h.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-400">Owner</div>
                <div className="font-mono">{h.owner}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Location</div>
                <div className="font-mono">{h.lat.toFixed(5)}, {h.lng.toFixed(5)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

