import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";

export const AssetList = ({ assets }) => {
  return (
    <Card className="overflow-hidden border-border/30">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border/40">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Asset</th>
              <th className="px-4 py-3 font-medium">Balance</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">24h Change</th>
              <th className="px-4 py-3 font-medium">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {assets.map((asset) => {
              const isPositive = asset.change24h >= 0;
              const ChangeIcon = isPositive ? TrendingUp : TrendingDown;
              const changeDisplay = formatPercentage(Math.abs(asset.change24h));
              return (
                <tr key={asset.symbol} className="text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                        {asset.symbol}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{asset.balance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatCurrency(asset.price)}</td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-2 ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                      <ChangeIcon className="h-4 w-4" />
                      {isPositive ? "+" : "-"}
                      {changeDisplay}%
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">{formatCurrency(asset.value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
