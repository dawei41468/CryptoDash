import "./globals.css";

export const metadata = {
  title: "CryptoTracker Pro",
  description: "Manage all of your crypto assets in one unified dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
