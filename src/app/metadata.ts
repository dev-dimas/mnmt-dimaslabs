import { Metadata } from 'next';

/**
 * This file contains the root metadata for the Next.js app.
 * It is used to define the title, description, and open graph metadata, etc.
 * It is also used to define the icons for the app, both light and dark.
 */

const rootMetadata: Metadata = {
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

export default rootMetadata;
