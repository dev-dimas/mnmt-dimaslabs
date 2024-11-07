import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MintMate',
  description: 'A website dedicated to creating and minting NFTs.',
  openGraph: {
    images: 'android-chrome-512x512.png',
  },
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/icon-dark.png',
      type: 'image/png',
      rel: 'icon',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/icon-light.png',
      type: 'image/png',
      rel: 'icon',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full h-full min-w-full w-full">
      <body className={`${manrope.variable} font-manrope antialiased h-full w-full flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
