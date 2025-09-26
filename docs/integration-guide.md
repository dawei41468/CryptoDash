# Exchange & Wallet Integration Guide

This guide walks you through preparing API credentials or wallet connections for the data sources represented in the CryptoTracker Pro dashboard.

> **Security first.** Never commit API keys or seed phrases to source control. Store them in `.env.local` for local development and in your deployment platform's secret manager in production.

## 1. Binance

1. Log into your [Binance](https://www.binance.com/) account and open **Profile → API Management**.
2. Create a new API key and label it (for example, `CryptoTrackerPro`).
3. Complete Binance's security verifications to reveal the key and secret.
4. Under **API Restrictions**:
   - Enable **Read Only** access. _Do not enable withdrawal permissions._
   - If you plan to use IP restrictions, add the server's public IP and click **Confirm**.
5. Store the credentials locally in `.env.local`:
   ```bash
   BINANCE_API_KEY=your_key_here
   BINANCE_API_SECRET=your_secret_here
   ```
6. Restart the Next.js dev server so the new environment variables are loaded.
7. In your data-fetching service (e.g., `/lib/integrations/binance.js`), use the credentials to call the [`/api/v3/account`](https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data) endpoint for balances and recent 24h change stats.

## 2. Coinbase Advanced Trade (Coinbase Pro)

1. Visit [Coinbase Advanced Trade](https://advanced.trade.coinbase.com/) → **API** and click **Create API key**.
2. Choose the portfolio that contains the assets you want to track.
3. Give the key a descriptive name and set **Permissions → View** only.
4. Download the `API Key`, `API Secret`, and `Passphrase` that Coinbase provides.
5. Save them in `.env.local`:
   ```bash
   COINBASE_API_KEY=your_key_here
   COINBASE_API_SECRET=your_secret_here
   COINBASE_API_PASSPHRASE=your_passphrase_here
   ```
6. Use the official REST client or signed fetch calls against [`/accounts`](https://docs.cloud.coinbase.com/advanced-trade-api/reference/retailbrokerageapi_getaccounts) to retrieve balances and product tickers for pricing data.
7. When deploying, add the same values to your hosting provider's secret store.

## 3. MetaMask Wallet

MetaMask exposes assets directly from the browser wallet, so no API keys are needed.

1. Install the [MetaMask extension](https://metamask.io/download/) and import or create your wallet.
2. In the CryptoTracker Pro UI, prompt the connection with `window.ethereum.request({ method: "eth_requestAccounts" })`.
3. Store the selected account address in application state (for example, in a React context) and pass it to your balances hook.
4. Use an on-chain data provider such as [Etherscan](https://docs.etherscan.io/) or [Alchemy](https://docs.alchemy.com/) to fetch token balances for the connected address. Persist the provider keys in `.env.local` (e.g., `ALCHEMY_API_KEY`).
5. Refresh holdings on an interval or with a "Refresh" button to keep the dashboard in sync.

## 4. Kraken

1. Log into [Kraken](https://www.kraken.com/) and go to **Security → API**.
2. Click **Add Key**, select a descriptive name, and enable the following permissions: **Query Funds**, **Query Ledgers**, and **Query Closed Orders**. Leave withdrawal permissions disabled.
3. After creating the key, copy the **Key** and **Private Key** values.
4. Add them to `.env.local`:
   ```bash
   KRAKEN_API_KEY=your_key_here
   KRAKEN_API_SECRET=your_secret_here
   ```
5. Use Kraken's [REST API](https://docs.kraken.com/rest/) endpoints such as `Balance` and `TradeBalance` to obtain holdings and valuation.
6. If Kraken is currently disconnected in the UI, surface actionable messaging (e.g., "Reconnect" button) once credentials are added.

## Environment Variable Checklist

Ensure the following keys are defined locally (and in production secrets) before fetching live data:

```
BINANCE_API_KEY=
BINANCE_API_SECRET=
COINBASE_API_KEY=
COINBASE_API_SECRET=
COINBASE_API_PASSPHRASE=
KRAKEN_API_KEY=
KRAKEN_API_SECRET=
ALCHEMY_API_KEY= # Optional, for MetaMask balance lookups
```

## Next Steps

- Build dedicated integration modules under `lib/integrations` that encapsulate request signing for each exchange.
- Create an API route (e.g., `/api/portfolio`) that aggregates balances, normalises everything to USD, and feeds the `mockAssets` shape currently used in `app/page.jsx`.
- Replace the mocked arrays with responses from the aggregation route, then persist the raw data in a lightweight database (Supabase, PlanetScale, etc.) if you need history.
- Add UX affordances such as status badges (`Connected`, `Action Required`) that react to integration health checks.

Following these steps will let you progressively replace the mocked data with real balances from each provider while keeping secrets out of your client bundle.
