// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "../components/MusicContext";

export const metadata: Metadata = {
  title: "Samman Qaiser | Full-Stack Engineer",
  description: "Software Engineer with 4+ years of experience in MERN stack, Next.js, and Deep Learning. Bridging the gap between creative UI/UX and intelligent automation.",
  metadataBase: new URL('https://samman-portfolio.vercel.app/'), // Absolute URLs ke liye zaroori hai
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // Sab properties openGraph object ke andar honi chahiye
  openGraph: {
    title: 'Samman Qaiser | Full-Stack Mastery & AI Evolution',
    description: 'Expertise in MERN, Next.js, and Deep Learning automation.',
    url: 'https://samman-portfolio.vercel.app/',
    siteName: 'Samman Qaiser Portfolio',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // metadataBase ki wajah se ab sirf path kaafi hai
        width: 1200,
        height: 630,
        alt: 'Samman Qaiser Portfolio Preview',
      },
    ],
  },
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}