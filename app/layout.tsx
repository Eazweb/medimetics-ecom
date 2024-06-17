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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Smart",
  description:
    "A full-featured e-commerce application where users can browse products, add them to a cart, and make purchases.",
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
              <Toaster />
              <Footer />
            </ReduxProvider>
          </NextAuthSessionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
