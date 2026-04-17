import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrackPy — 14-Day Python Interview Prep",
  description:
    "Crack the coding interview with 14 days of Python. In-browser Python execution, LeetCode-style problems, auto-graded test cases.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
