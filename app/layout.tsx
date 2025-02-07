import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ViewTransitions } from "next-view-transitions";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster as ToastMsg } from "react-hot-toast";
import ScrollToTopButton from "./components/TopScroller";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medimetics",
  description:
    "Hello pretty faces, your one and only stop for facial care products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>
          <NextAuthSessionProvider>
            <ReduxProvider>
              <Navbar />
              <ToastMsg position="bottom-right" />
              {children}
              <ScrollToTopButton />
              <Toaster />
              <Footer />
            </ReduxProvider>
          </NextAuthSessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
