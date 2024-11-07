import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { ThirdwebProvider } from 'thirdweb/react';
import rootMetadata from './metadata';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full h-full min-w-full w-full">
      <body className={`${manrope.variable} font-manrope antialiased h-full w-full flex flex-col`}>
        <ThirdwebProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
