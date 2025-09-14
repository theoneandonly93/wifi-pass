import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

function secondsToNextMidnightUTC() {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0))
  const diff = Math.floor((+next - +now) / 1000)
  return diff
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }
  const now = Math.floor(Date.now() / 1000)
  const secondsRemaining = secondsToNextMidnightUTC()
  const total = 86400
  const progress = Math.min(1, Math.max(0, (total - secondsRemaining) / total))
  return res.status(200).json({
    now,
    secondsRemaining,
    total,
    progress,
    vaultSOL: db.rewardsVaultSOL,
  })
}

