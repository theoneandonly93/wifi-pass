// Simple in-memory store for development/demo purposes.
// In production, replace with a real database (e.g., Postgres).

type GlobalDB = {
  hotspots: Array<{ id: string; lat: number; lng: number; owner: string; createdAt: number }>
  sessions: Array<{ id: string; wallet: string; hotspotId?: string; startedAt: number; endedAt?: number }>
  esimProfiles: Record<string, { status: "active" | "revoked"; activationCode: string; createdAt: number; creatorLifetime?: boolean }>
  rewardsVaultSOL: number
  userBalances: Record<string, { gfi: number }>
}

declare global {
  // eslint-disable-next-line no-var
  var __dgdb: GlobalDB | undefined
}

const db: GlobalDB = global.__dgdb || {
  hotspots: [],
  sessions: [],
  esimProfiles: {},
  rewardsVaultSOL: 1000, // demo vault
  userBalances: {},
}

if (!global.__dgdb) {
  global.__dgdb = db
}

export default db

