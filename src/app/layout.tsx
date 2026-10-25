import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bandhan Sweets & Restaurant | A Taste of Royal Mithaas & Soul',
  description:
    'Contemporary Indian Mithai crafted in 100% pure desi ghee, Banarasi Chaat Theatre, Royal Vegetarian Thalis, and Bespoke Festive Gifting.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#D9822B] selection:text-white">
        {children}
      </body>
    </html>
  );
}