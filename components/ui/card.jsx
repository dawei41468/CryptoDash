import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border/40 bg-card/60 p-6 shadow-lg shadow-black/10 backdrop-blur transition hover:border-border/80",
        className
      )}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col space-y-2", className)} {...props} />;
});

export const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return <h3 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />;
});

export const CardDescription = React.forwardRef(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />;
});

export const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("mt-4 flex-1", className)} {...props} />;
});
