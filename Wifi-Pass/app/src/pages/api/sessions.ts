import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../lib/db"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ sessions: db.sessions })
  }
  if (req.method === "POST") {
    const { action, wallet, hotspotId } = req.body || {}
    if (action === "start") {
      if (typeof wallet !== "string") return res.status(400).json({ error: "wallet required" })
      const id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const s = { id, wallet, hotspotId, startedAt: Date.now() }
      db.sessions.push(s)
      return res.status(200).json({ session: s })
    }
    if (action === "end") {
      if (typeof wallet !== "string") return res.status(400).json({ error: "wallet required" })
      const active = [...db.sessions].reverse().find((s) => s.wallet === wallet && !s.endedAt)
      if (!active) return res.status(404).json({ error: "no active session" })
      active.endedAt = Date.now()
      return res.status(200).json({ session: active })
    }
    return res.status(400).json({ error: "invalid action" })
  }
  res.setHeader("Allow", ["GET", "POST"]) 
  return res.status(405).json({ error: "Method not allowed" })
}

