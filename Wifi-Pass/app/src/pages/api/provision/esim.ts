import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

// Demo SM-DP+ and profile metadata
const SMDP_PLUS = "smdp.dopelganga.net"
const OPERATOR_NAME = "Dopelganga LTE / 7G LTE"
const APN = "internet.dopelganga.net"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { action, wallet, creatorLifetime } = req.body || {}
    if (typeof wallet !== "string") return res.status(400).json({ error: "wallet required" })

    if (action === "activate") {
      const id = `esim_${wallet}`
      const activationCode = `${SMDP_PLUS};${Math.random().toString(36).slice(2)}${Date.now()}`
      db.esimProfiles[id] = {
        status: "active",
        activationCode,
        createdAt: Date.now(),
        creatorLifetime: Boolean(creatorLifetime),
      }
      return res.status(200).json({
        id,
        status: "active",
        activationCode,
        operator: OPERATOR_NAME,
        apn: APN,
        smdpPlus: SMDP_PLUS,
      })
    }
    if (action === "revoke") {
      const id = `esim_${wallet}`
      const existing = db.esimProfiles[id]
      if (!existing) return res.status(404).json({ error: "not found" })
      existing.status = "revoked"
      return res.status(200).json({ id, status: existing.status })
    }
    return res.status(400).json({ error: "invalid action" })
  }

  if (req.method === "GET") {
    const { wallet } = req.query
    if (typeof wallet !== "string") return res.status(400).json({ error: "wallet required" })
    const id = `esim_${wallet}`
    const existing = db.esimProfiles[id]
    if (!existing) return res.status(404).json({ error: "not found" })
    return res.status(200).json({ id, ...existing, operator: OPERATOR_NAME, apn: APN, smdpPlus: SMDP_PLUS })
  }

  res.setHeader("Allow", ["GET", "POST"]) 
  return res.status(405).json({ error: "Method not allowed" })
}

