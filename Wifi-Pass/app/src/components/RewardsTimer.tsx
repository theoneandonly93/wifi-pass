import React, { useEffect, useState } from "react"

type Data = {
  secondsRemaining: number
  total: number
  progress: number
  vaultSOL: number
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${m}m ${s}s`
}

export default function RewardsTimer() {
  const [data, setData] = useState<Data | null>(null)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch("/api/rewards/next")
        const d = await res.json()
        if (!active) return
        setData(d)
        setRemaining(d.secondsRemaining)
      } catch {}
    }
    load()
    const t = setInterval(() => setRemaining((x) => (x > 0 ? x - 1 : 0)), 1000)
    const p = setInterval(load, 15000)
    return () => {
      active = false
      clearInterval(t)
      clearInterval(p)
    }
  }, [])

  if (!data) return null
  const dayTotal = data.total || 86400
  const progress = Math.min(1, Math.max(0, (dayTotal - remaining) / dayTotal))

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Next GFI distribution in</span>
        <span className="font-mono">{formatTime(remaining)}</span>
      </div>
      <progress className="progress progress-accent w-full" value={progress * 100} max={100}></progress>
    </div>
  )
}

