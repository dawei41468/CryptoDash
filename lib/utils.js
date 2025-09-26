import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value, { currency = "USD", maximumFractionDigits = 2 } = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits
  }).format(typeof value === "number" ? value : 0);
}

export function formatPercentage(value, { maximumFractionDigits = 2 } = {}) {
  return Number.parseFloat(value ?? 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });
}

function normalizePercentages(items) {
  if (!items.length) return [];

  const working = items.map((item, index) => ({
    symbol: item.symbol,
    raw: item.percentage,
    percentage: Math.floor(item.percentage),
    index
  }));

  let remainder = Math.round(
    100 - working.reduce((sum, item) => sum + item.percentage, 0)
  );

  if (remainder > 0) {
    const prioritised = [...working].sort(
      (a, b) => (b.raw - b.percentage) - (a.raw - a.percentage)
    );
    let cursor = 0;
    const length = prioritised.length;
    while (remainder > 0 && length > 0) {
      prioritised[cursor % length].percentage += 1;
      remainder -= 1;
      cursor += 1;
    }
  }

  return working
    .sort((a, b) => a.index - b.index)
    .map((item) => ({ symbol: item.symbol, percentage: item.percentage }));
}

export function calculatePortfolioStats(assets = []) {
  if (!Array.isArray(assets) || assets.length === 0) {
    return {
      totalValue: 0,
      weightedChange: 0,
      bestPerformer: null,
      worstPerformer: null,
      allocation: []
    };
  }

  const totalValue = assets.reduce((sum, asset) => sum + (asset.value ?? 0), 0);

  const weightedChange =
    totalValue > 0
      ? assets.reduce(
          (sum, asset) => sum + (asset.value ?? 0) * (asset.change24h ?? 0),
          0
        ) / totalValue
      : 0;

  const bestPerformer = assets.reduce((best, asset) => {
    if (!best) return asset;
    return (asset.change24h ?? -Infinity) > (best.change24h ?? -Infinity)
      ? asset
      : best;
  }, null);

  const worstPerformer = assets.reduce((worst, asset) => {
    if (!worst) return asset;
    return (asset.change24h ?? Infinity) < (worst.change24h ?? Infinity)
      ? asset
      : worst;
  }, null);

  const sortedByValue = [...assets].sort(
    (a, b) => (b.value ?? 0) - (a.value ?? 0)
  );
  const primaryHoldings = sortedByValue.slice(0, 3).map((asset) => ({
    symbol: asset.symbol,
    value: asset.value ?? 0
  }));
  const otherValue = sortedByValue
    .slice(3)
    .reduce((sum, asset) => sum + (asset.value ?? 0), 0);
  if (otherValue > 0) {
    primaryHoldings.push({ symbol: "Other", value: otherValue });
  }

  const allocation =
    totalValue > 0
      ? normalizePercentages(
          primaryHoldings.map((holding) => ({
            symbol: holding.symbol,
            percentage: (holding.value / totalValue) * 100
          }))
        )
      : [];

  return {
    totalValue,
    weightedChange,
    bestPerformer,
    worstPerformer,
    allocation
  };
}
