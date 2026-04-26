import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahirahmed.dev"),
  title: {
    default: "Mahir Ahmed",
    template: "%s — Mahir Ahmed",
  },
  description: "Builder and closer. CS @ UNSW.",
  openGraph: {
    title: "Mahir Ahmed",
    description: "Builder and closer. CS @ UNSW.",
    url: "https://mahirahmed.dev",
    siteName: "mahirahmed.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mahir Ahmed",
    description: "Builder and closer. CS @ UNSW.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="min-h-screen bg-bg text-ink font-mono antialiased selection:bg-accent selection:text-bg">
        {children}
      </body>
    </html>
  );
}
