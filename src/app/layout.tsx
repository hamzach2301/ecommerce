import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = { title: "Stickly — Your ideas. Your stickers.", description: "Custom and ready-made stickers with a little more personality." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><CartProvider><Navbar />{children}<Footer /></CartProvider></body></html>; }
