export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

// Dopelganga types
export interface PlanNFTMeta {
  name: string // e.g., Basic / Pro / Unlimited
  minutes?: number
  sms?: number
  dataGB?: number
  expiresAt?: number // epoch ms
  currency?: 'GFI' | 'USDC'
}

export interface HotspotRecord {
  id: string
  lat: number
  lng: number
  owner: string
  createdAt: number
}
