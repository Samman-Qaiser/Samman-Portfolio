import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "../src/components/SmoothScroll"; // Import karein

export const metadata: Metadata = {
  title: "Samman's Portfolio",
  description: "Web Developer",
  icons: {
    icon: '/favicon.ico', // public folder se path
    // Agar apple touch icon dena ho:
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}