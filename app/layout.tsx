import "@/styles/globals.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import AuthContextProvider from "@/context/AuthContextProvider";
import DataContextProvider from "@/context/DataContextProvider";
import type { Viewport } from 'next';
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-512x512.png",
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  var currentYear = new Date().getFullYear();

  return (
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <AuthContextProvider>
            <DataContextProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex w-full p-0 md:px-20 lg:px-20">{children}</div>
                </div>
              </ThemeProvider>
            </DataContextProvider>
          </AuthContextProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
