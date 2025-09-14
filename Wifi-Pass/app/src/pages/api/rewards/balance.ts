import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }
  const { wallet } = req.query
  if (typeof wallet !== "string") return res.status(400).json({ error: "wallet required" })
  const bal = db.userBalances[wallet] || { gfi: 0 }
  return res.status(200).json(bal)
}

