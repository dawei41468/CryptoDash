import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "inline-flex items-center justify-center rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-white shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  outline:
    "inline-flex items-center justify-center rounded-md border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  secondary:
    "inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ghost:
    "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-11 px-8"
};

export const Button = React.forwardRef(function Button(
  { className, variant = "default", size = "default", ...props },
  ref
) {
  return (
    <button className={cn(buttonVariants[variant], buttonSizes[size], className)} ref={ref} {...props} />
  );
});
