import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = { title: "ستيكلي — صمّم فكرتك", description: "استوديو سهل لتصميم الملصقات والبطاقات والبوسترات." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl"><body><CartProvider><Navbar />{children}<Footer /></CartProvider></body></html>; }
