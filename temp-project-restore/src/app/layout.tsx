import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../lib/fonts";

export const metadata: Metadata = {
  title: "Currículo Pro IA - O seu currículo perfeito em 5 minutos",
  description: "Crie currículos profissionais com ajuda de Inteligência Artificial. Templates modernos, otimização ATS e entrega instantânea.",
  keywords: "currículo, CV, inteligência artificial, IA, emprego, carreira, templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
