import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MeshGradient } from "./MeshGradient";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindMash!",
  description:
    "Test your knowledge with fun and engaging quizzes! Explore a wide range of topics, challenge your friends, and track your progress. Ready to become a quiz master?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MeshGradient />
        {children}
      </body>
    </html>
  );
}
