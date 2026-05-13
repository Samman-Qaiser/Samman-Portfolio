// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MusicProvider } from "../components/MusicContext";

export const metadata: Metadata = {
  title: "Samman Qaiser | Full-Stack Engineer",
  description: "Software Engineer with 4+ years of experience in MERN stack, Next.js, and Deep Learning. Bridging the gap between creative UI/UX and intelligent automation.",
  metadataBase: new URL('https://samman-portfolio.vercel.app/'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Samman Qaiser | Full-Stack Mastery & AI Evolution',
    description: 'Expertise in MERN, Next.js, and Deep Learning automation.',
    url: 'https://samman-portfolio.vercel.app/',
    siteName: 'Samman Qaiser Portfolio',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Samman Qaiser Portfolio Preview',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning yahan zaroori hai kyunke hum <html> ki class script se change kar rahe hain */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Yeh script page content load hone se pehle theme apply kar degi (No White Flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}