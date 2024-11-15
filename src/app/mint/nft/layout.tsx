import { Metadata } from 'next';

/**
 * Metadata for the Mint page.
 * Defines the title and description for the page.
 */
export const metadata: Metadata = {
  title: 'MintMate - Mint',
  description:
    'Create and mint your own unique NFTs on MintMate. Bring your digital creations to life and own a piece of the blockchain.',
};

/**
 * Layout component for the Mint page.
 * It renders the children components passed to it.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
