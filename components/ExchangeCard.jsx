import { Wallet, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);

export const ExchangeCard = ({ exchange }) => {
  const isPositive = exchange.change24h >= 0;

  return (
    <Card className="flex flex-col bg-background/70">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-semibold text-white">{exchange.name}</CardTitle>
          </div>
          {exchange.connected ? (
            <Badge variant="success" className="bg-emerald-500/15 text-emerald-400">
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Connected
            </Badge>
          ) : (
            <Badge variant="destructive" className="bg-rose-500/15 text-rose-400">
              <XCircle className="mr-1 h-3.5 w-3.5" /> Disconnected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-xl font-semibold text-white">{formatCurrency(exchange.balance)}</p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">24h Change</span>
          <span className={isPositive ? "text-emerald-400" : "text-rose-400"}>
            {isPositive ? "+" : ""}
            {exchange.change24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Assets</span>
          <span className="font-medium text-white">{exchange.assets}</span>
        </div>
      </CardContent>
    </Card>
  );
};
