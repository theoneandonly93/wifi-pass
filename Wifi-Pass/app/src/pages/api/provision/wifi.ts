import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]) 
    return res.status(405).json({ error: "Method not allowed" })
  }
  const ssid = "Dopelganga.Fi"
  const password = "ghostfi-demo" // demo only
  const auth = "WPA"
  const hidden = false
  const qrPayload = `WIFI:T:${auth};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`
  return res.status(200).json({ ssid, password, auth, hidden, qrPayload })
}

