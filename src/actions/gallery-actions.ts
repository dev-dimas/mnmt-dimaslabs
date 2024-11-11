'use server';

import { client } from '@/app/client';
import { ipfsToHttp } from '@/lib/utils';
import { getContract, readContract } from 'thirdweb';
import { sepolia } from 'thirdweb/chains';

const contract = getContract({
  client: { ...client, secretKey: process.env.THIRDWEB_SECRET_KEY },
  chain: sepolia,
  address: '0xA895a9b5882DBa287CF359b6a722C5be46aCb675',
});

export async function getTokenIdCounter() {
  return await readContract({ contract, method: 'function _tokenIdCounter() returns (uint256)' });
}

export async function getTokenURI(tokenId: number) {
  return await readContract({
    contract,
    method: 'function tokenURI(uint256 tokenId) returns (string)',
    params: [BigInt(tokenId)], // Passing tokenId sebagai argumen
  });
}

export async function getGalleryNFTs() {
  const tokenIdCounter = await getTokenIdCounter();
  console.log('TokenIdCounter', tokenIdCounter);
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
