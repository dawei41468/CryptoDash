import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);

export const PortfolioOverview = ({
  totalValue,
  totalChange,
  connectedExchanges,
  totalAssets
}) => {
  const isPositive = totalChange >= 0;
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader className="flex items-start justify-between md:flex-row">
          <div>
            <Badge variant="success" className="mb-3 bg-emerald-500/15 text-emerald-400">
              Total Balance
            </Badge>
            <CardTitle className="text-3xl font-bold sm:text-4xl">
              {formatCurrency(totalValue)}
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              Across all connected exchanges and wallets
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 text-sm">
            <span className="text-muted-foreground">24h</span>
            <ChangeIcon className={isPositive ? "h-4 w-4 text-emerald-400" : "h-4 w-4 text-rose-400"} />
            <span className={isPositive ? "text-emerald-400" : "text-rose-400"}>
              {isPositive ? "+" : ""}
              {totalChange.toFixed(2)}%
            </span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/40 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Exchanges</p>
                <p className="text-2xl font-semibold text-white">{connectedExchanges}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/40 bg-background/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tracked Assets</p>
                <p className="text-2xl font-semibold text-white">{totalAssets}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
        <CardHeader>
          <Badge variant="secondary" className="w-fit bg-white/10 text-white">
            Performance Snapshot
          </Badge>
          <CardTitle className="text-white">Portfolio Performance</CardTitle>
          <p className="text-sm text-white/70">
            Stay on top of market trends with real-time performance tracking across all holdings.
          </p>
        </CardHeader>
        <CardContent className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Best Performer</span>
            <span className="text-sm font-semibold text-white">Solana (SOL)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Worst Performer</span>
            <span className="text-sm font-semibold text-white">Ethereum (ETH)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Allocation</span>
            <span className="text-sm font-semibold text-white">45% BTC / 32% ALT / 23% DeFi</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
