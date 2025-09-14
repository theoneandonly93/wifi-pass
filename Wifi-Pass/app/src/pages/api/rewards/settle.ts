import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

// Demo settlement: awards 1 GFI per completed session minute to session owner
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }
  let distributed = 0
  const now = Date.now()
  for (const s of db.sessions) {
    if (!s.endedAt) continue
    const minutes = Math.max(0, Math.floor((s.endedAt - s.startedAt) / 60000))
    if (minutes <= 0) continue
    const w = s.wallet
    db.userBalances[w] = db.userBalances[w] || { gfi: 0 }
    db.userBalances[w].gfi += minutes
    distributed += minutes
  }
  return res.status(200).json({ distributedGFI: distributed })
}

