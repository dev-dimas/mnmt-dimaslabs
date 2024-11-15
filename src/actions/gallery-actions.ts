'use server';

import { contract } from '@/app/contract';
import { ipfsToHttp } from '@/lib/utils';
import { readContract } from 'thirdweb';

export async function getTokenIdCounter() {
  return await readContract({ contract, method: 'function _tokenIdCounter() returns (uint256)' });
}

export async function getTokenURI(tokenId: number) {
  return await readContract({
    contract,
    method: 'function tokenURI(uint256 tokenId) returns (string)',
    params: [BigInt(tokenId)],
  });
}

export async function getGalleryNFTs() {
  const tokenIdCounter = await getTokenIdCounter();
  if (!tokenIdCounter) return;

  const nftMetadata = [];

  for (let i = 0; i < tokenIdCounter; i++) {
    const tokenURI = await getTokenURI(i);
    if (tokenURI) {
      const req = await fetch(ipfsToHttp(tokenURI));

      try {
        const res = await req.json();
        nftMetadata.push({ tokenId: i, tokenURI, ...res });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return nftMetadata;
}

export async function getNFTOwner(tokenId: number) {
  return await readContract({
    contract,
    method: 'function ownerOf(uint256 tokenId) returns (address)',
    params: [BigInt(tokenId)], // Passing tokenId sebagai argumen
  });
}
