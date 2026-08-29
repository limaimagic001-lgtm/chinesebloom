import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chinesebloom.com"),
  title: {
    default: "ChineseBloom – Mandarin Listening & Speaking Practice",
    template: "%s · ChineseBloom",
  },
  description:
    "Practice Mandarin listening and speaking in 20 minutes a day with dictation, shadowing, and retelling for HSK 3–4 learners.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ChineseBloom",
    title: "ChineseBloom – From Textbook Chinese to Natural Conversation",
    description:
      "Mandarin listening and speaking practice for intermediate learners.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "ChineseBloom – Mandarin Listening & Speaking Practice",
    description:
      "Move from textbook Chinese to natural speaking in 20 minutes a day.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
