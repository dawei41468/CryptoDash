# CryptoTracker Pro

A Next.js dashboard experience for monitoring cryptocurrency holdings across exchanges and wallets. The UI showcases a portfolio summary, connection status for multiple exchanges, and a detailed asset table powered by reusable UI primitives.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Features

- Portfolio overview with total balance and 24h performance snapshot derived from your holdings data
- Automatic best/worst performer highlights and allocation breakdown
- Exchange connectivity cards with status indicators
- Asset holdings table showing balances, prices, and change percentages
- Tailwind CSS design tokens for a cohesive, glassmorphism-inspired aesthetic

Mock data is provided in `app/page.jsx` to demonstrate the layout.

## Connecting Real Data

When you're ready to replace the mock arrays, follow the detailed steps in [`docs/integration-guide.md`](docs/integration-guide.md) to configure Binance, Coinbase Advanced Trade, MetaMask, and Kraken credentials.
