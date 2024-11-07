import { Metadata } from 'next';

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
