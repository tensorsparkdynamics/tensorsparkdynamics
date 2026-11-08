import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/src/components/AppShell';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: { default: 'Tensorspark - AI Solutions, Internships & Growth Agency', template: '%s' },
  description: 'Enterprise AI products, 3-month engineering fellowships, automated candidate offer letter generator with unique identification codes, Bengaluru corporate headquarters with 100% remote internships, and digital growth agency.',
  openGraph: {
    title: 'Tensorspark - AI Solutions, Internships & Growth Agency',
    description: 'Enterprise AI products, 3-month engineering fellowships, automated candidate offer letter generator with unique identification codes, Bengaluru corporate headquarters with 100% remote internships, and digital growth agency.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#08090d] text-neutral-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
