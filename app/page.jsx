"use client";

import { useMemo } from "react";
import { Plus, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortfolioOverview } from "@/components/PortfolioOverview";
import { ExchangeCard } from "@/components/ExchangeCard";
import { AssetList } from "@/components/AssetList";

const mockExchanges = [
  {
    id: "binance",
    name: "Binance",
    connected: true,
    balance: 45234.67,
    change24h: 2.34,
    assets: 12
  },
  {
    id: "coinbase",
    name: "Coinbase Pro",
    connected: true,
    balance: 23456.78,
    change24h: -1.23,
    assets: 8
  },
  {
    id: "metamask",
    name: "MetaMask Wallet",
    connected: true,
    balance: 15678.9,
    change24h: 5.67,
    assets: 15
  },
  {
    id: "kraken",
    name: "Kraken",
    connected: false,
    balance: 0,
    change24h: 0,
    assets: 0
  }
];

const mockAssets = [
  { symbol: "BTC", name: "Bitcoin", balance: 1.2345, price: 42350.67, change24h: 2.34, value: 52291.15 },
  { symbol: "ETH", name: "Ethereum", balance: 15.678, price: 2234.56, change24h: -1.23, value: 35023.12 },
  { symbol: "SOL", name: "Solana", balance: 234.56, price: 98.76, change24h: 5.67, value: 23169.86 },
  { symbol: "AVAX", name: "Avalanche", balance: 456.78, price: 32.45, change24h: -2.11, value: 14822.01 },
  { symbol: "DOT", name: "Polkadot", balance: 678.9, price: 15.23, change24h: 3.45, value: 10341.85 }
];

export default function HomePage() {
  const { totalValue, totalChange } = useMemo(() => {
    const totalBalance = mockAssets.reduce((acc, asset) => acc + asset.value, 0);
    const change =
      mockExchanges
        .filter((exchange) => exchange.connected)
        .reduce((acc, exchange) => acc + exchange.change24h, 0) /
      Math.max(mockExchanges.filter((exchange) => exchange.connected).length, 1);

    return {
      totalValue: totalBalance,
      totalChange: change
    };
  }, []);

  const connectedCount = useMemo(
    () => mockExchanges.filter((exchange) => exchange.connected).length,
    []
  );

  return (
    <div className="min-h-screen bg-background/60">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary/80">
                Welcome back
              </p>
              <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                CryptoTracker Pro
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage all your crypto in one place
              </p>
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Exchange
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-8 px-4 py-8 sm:px-6">
        <PortfolioOverview
          totalValue={totalValue}
          totalChange={totalChange}
          connectedExchanges={connectedCount}
          totalAssets={mockAssets.length}
        />

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Connected Exchanges & Wallets</h2>
            <Badge variant="secondary" className="bg-crypto-blue/20 text-crypto-blue">
              {connectedCount} Connected
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockExchanges.map((exchange) => (
              <ExchangeCard key={exchange.id} exchange={exchange} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Asset Holdings</h2>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" /> View Details
            </Button>
          </div>
          <AssetList assets={mockAssets} />
        </section>
      </main>
    </div>
  );
}
