import type { NextApiRequest, NextApiResponse } from "next"
import db from "../../../lib/db"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ hotspots: db.hotspots })
  }
  res.setHeader("Allow", ["GET"]) 
  return res.status(405).json({ error: "Method not allowed" })
}

