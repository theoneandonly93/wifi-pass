import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { lat, lng, owner } = req.body || {}
  if (typeof lat !== "number" || typeof lng !== "number" || typeof owner !== "string") {
    return res.status(400).json({ error: "lat, lng, and owner are required" })
  }
  const id = `h_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const hotspot = { id, lat, lng, owner, createdAt: Date.now() }
  db.hotspots.push(hotspot)
  return res.status(200).json({ hotspot })
}

