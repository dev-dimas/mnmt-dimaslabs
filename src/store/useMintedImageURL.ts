import { create } from 'zustand';

interface MintedImageURLStore {
  mintedImageURL: string | null;
  setMintedImageURL: (url: string) => void;
}

export const useMintedImageURL = create<MintedImageURLStore>((set) => ({
  mintedImageURL: null,
  setMintedImageURL: (url) => set({ mintedImageURL: url }),
}));
