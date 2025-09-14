GhostFi Mobile (React Native + Expo)

This repo includes only the web app. To prototype the mobile client quickly:

1) Initialize
- Install Node 18+ and Expo CLI
- Run: npx create-expo-app ghostfi-mobile --template blank

2) Add tabs and QR
- Add react-navigation bottom-tabs
- Add expo-barcode-scanner for QR scanning

3) Tabs
- Home: Wallet connect (deep link to Phantom Mobile) and branding
- Hotspots: Call web API GET /api/hotspots and show nearby; join Wi‑Fi via Wi‑Fi settings intent
- Rewards: Call GET /api/rewards/next and GET /api/rewards/balance?wallet=...

4) QR
- Scan Wi‑Fi payload from GET /api/provision/wifi
- Scan eSIM activation code from GET|POST /api/provision/esim

Note: APIs are stubbed in-memory in the web app; replace with your backend.

