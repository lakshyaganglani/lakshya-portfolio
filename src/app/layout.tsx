import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { person } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${person.name} — ${person.role}`,
  description: person.resumeSummary,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Runs before hydration to avoid a flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var isLight = stored
                    ? stored === 'light'
                    : window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (isLight) document.documentElement.classList.add('light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
