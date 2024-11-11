'use client';

import { Box } from 'lucide-react';
import FormMintNFT from './form-mint-nft';

export default function MintNft() {
  return (
    <div className="flex max-md:flex-col w-full h-fit gap-6">
      <div className="w-1/2 max-md:w-full max-md:aspect-square rounded-lg border border-zinc-300 relative">
        <div className="absolute top-5 left-5 text-blue-500 text-xs flex items-center gap-2 p-1 rounded-full bg-blue-100 font-bold">
          <Box strokeWidth={2} size={18} />
          <span>Uploaded to IPFS</span>
        </div>
      </div>
      <div className="w-1/2 max-md:w-full">
        <FormMintNFT />
      </div>
    </div>
  );
}
