import { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Locales, routing } from "@/i18n/routing";

import { MeshGradient } from "./MeshGradient";
import { MainNavServer } from "./MainNavServer";
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

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locales)) {
    notFound();
  }
  // Enable static rendering.
  setRequestLocale(locale);

  // Providing all messages to the client side.
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === Locales.AR ? "rtl" : "ltr"}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <MeshGradient />
          <MainNavServer />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
