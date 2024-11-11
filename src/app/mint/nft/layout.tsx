import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MintMate - Mint',
  description:
    'Create and mint your own unique NFTs on MintMate. Bring your digital creations to life and own a piece of the blockchain.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
