// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "../components/MusicContext";
export const metadata: Metadata = {
  title: "Samman's Portfolio",
  description: "Web Developer",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <MusicProvider>
      <body>
        {children} {/* only children, no client component wrapping */}
      </body>
      </MusicProvider>
    </html>
  );
}