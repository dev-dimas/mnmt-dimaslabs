import Navbar from '@/components/navbar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThirdwebProvider } from 'thirdweb/react';
import './globals.css';
import rootMetadata from './metadata';
import { Toaster } from '@/components/ui/sonner';

const manrope = localFont({
  src: '../assets/manrope.ttf',
  variable: '--font-manrope',
  preload: true,
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full h-full min-w-full w-full">
      <body
        className={`${manrope.variable} font-manrope antialiased h-full w-full flex flex-col bg-background text-foreground`}
      >
        <ThirdwebProvider>
          <NuqsAdapter>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster position="top-center" theme="light" richColors />
          </NuqsAdapter>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
