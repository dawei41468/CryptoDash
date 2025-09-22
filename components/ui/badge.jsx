import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary",
  secondary: "inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
  success: "inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400",
  destructive: "inline-flex items-center rounded-full bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-400"
};

export const Badge = React.forwardRef(function Badge(
  { className, variant = "default", ...props },
  ref
) {
  return <div ref={ref} className={cn(badgeVariants[variant], className)} {...props} />;
});
