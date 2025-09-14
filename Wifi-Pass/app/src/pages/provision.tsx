import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

export default function ProvisionPage() {
  const { publicKey, connected } = useWallet()
  const [wifi, setWifi] = useState<{ ssid: string; password: string; auth: string; qrPayload: string } | null>(null)
  const [esim, setEsim] = useState<any>(null)
  const [creator, setCreator] = useState<any>(null)
  const wallet = publicKey?.toBase58()

  useEffect(() => {
    fetch('/api/provision/wifi').then(r => r.json()).then(setWifi).catch(()=>{})
  }, [])

  const loadEsim = async () => {
    if (!wallet) return
    try {
      const res = await fetch(`/api/provision/esim?wallet=${wallet}`)
      if (res.ok) setEsim(await res.json())
    } catch {}
  }

  useEffect(() => { loadEsim() }, [wallet])

  const activateEsim = async (creatorLifetime = false) => {
    if (!wallet) return
    const res = await fetch('/api/provision/esim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'activate', wallet, creatorLifetime }) })
    const data = await res.json()
    setEsim(data)
  }
  const revokeEsim = async () => {
    if (!wallet) return
    const res = await fetch('/api/provision/esim', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'revoke', wallet }) })
    const data = await res.json()
    setEsim(data)
  }

  const loadCreator = async () => {
    const res = await fetch('/api/creator/gsim')
    const data = await res.json()
    setCreator(data)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Provisioning</h1>

      <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Wi-Fi: Dopelganga.Fi</h2>
        {wifi ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-400">SSID</div>
            <div className="font-mono">{wifi.ssid}</div>
            <div className="text-sm text-gray-400">Password</div>
            <div className="font-mono">{wifi.password}</div>
            <div className="text-sm text-gray-400">QR Payload</div>
            <div className="font-mono break-all bg-black bg-opacity-40 p-2 rounded">{wifi.qrPayload}</div>
          </div>
        ) : (
          <div className="text-gray-500">Loading Wi-Fi details…</div>
        )}
      </section>

      <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <h2 className="text-xl font-semibold mb-2">GhostSim (gSim) eSIM</h2>
        {!connected && <div className="text-gray-500 mb-2">Connect your wallet to manage your eSIM.</div>}
        <div className="flex gap-2 mb-3">
          <button className="btn btn-primary" onClick={() => activateEsim(false)} disabled={!connected}>Activate</button>
          <button className="btn" onClick={revokeEsim} disabled={!connected}>Revoke</button>
          <button className="btn" onClick={() => activateEsim(true)} disabled={!connected}>Activate Creator Lifetime</button>
        </div>
        {esim ? (
          <div className="space-y-1 text-sm">
            <div>Status: <span className="font-semibold">{esim.status}</span></div>
            {esim.activationCode && <div>Activation Code: <span className="font-mono break-all">{esim.activationCode}</span></div>}
            {esim.operator && <div>Operator: {esim.operator}</div>}
            {esim.apn && <div>APN: {esim.apn}</div>}
          </div>
        ) : (
          <div className="text-gray-500">No eSIM active.</div>
        )}
      </section>

      <section className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Creator Lifetime gSim</h2>
        <div className="flex gap-2 mb-3">
          <button className="btn" onClick={loadCreator}>Get Creator Profile</button>
        </div>
        {creator && (
          <div className="space-y-1 text-sm">
            <div>Label: {creator.label}</div>
            <div>Unlimited: {String(creator.unlimited)}</div>
            <div>Code: <span className="font-mono">{creator.code}</span></div>
            <div>Operator: {creator.operator}</div>
            <div>APN: {creator.apn}</div>
          </div>
        )}
      </section>
    </div>
  )
}

