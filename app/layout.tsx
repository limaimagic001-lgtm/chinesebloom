import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chinesebloom.com"),
  title: {
    default: "Mandarin Listening & Speaking Practice for Intermediate Learners | ChineseBloom",
    template: "%s · ChineseBloom",
  },
  description:
    "Practice Mandarin listening and speaking with natural HSK 3–4 conversations. Listen, dictate, shadow, and retell in one free 20-minute lesson.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ChineseBloom",
    title: "Mandarin Listening & Speaking Practice | ChineseBloom",
    description:
      "Natural Mandarin listening and speaking practice for intermediate HSK 3–4 learners.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Mandarin Listening & Speaking Practice | ChineseBloom",
    description:
      "Turn Mandarin you understand into natural speech with a free 20-minute lesson.",
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
