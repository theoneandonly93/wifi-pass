import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }
  // Demo: return a special creator GhostSim profile with no expiry
  const profile = {
    label: "Creator Lifetime gSim",
    unlimited: true,
    expires: null as number | null,
    operator: "Dopelganga LTE / 7G LTE",
    apn: "internet.dopelganga.net",
    smdpPlus: "smdp.dopelganga.net",
    code: `CREATOR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  }
  return res.status(200).json(profile)
}

