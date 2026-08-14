import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ángela España — Liquidación especial",
  description: "Prendas seleccionadas desde $150 MXN. Showroom en Cancún y envíos a todo México.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f7f4ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
