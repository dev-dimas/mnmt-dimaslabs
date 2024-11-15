'use server';
/**
 * This file contains functions to interact with the Gallery contract.
 * The functions are exported and can be used by other parts of the application.
 * The functions are marked with the 'use server' directive to indicate that they should be executed on the server.
 */

import { contract } from '@/app/contract';
import { ipfsToHttp } from '@/lib/utils';
import { readContract } from 'thirdweb';

export async function getTokenIdCounter() {
  /**
   * Get the current _tokenIdCounter value from the contract.
   * This value represents the number of NFTs minted by the contract.
   * @returns The current _tokenIdCounter value, or null if the contract method call fails.
   */
  return await readContract({ contract, method: 'function _tokenIdCounter() returns (uint256)' });
}

export async function getTokenURI(tokenId: number) {
  /**
   * Get the tokenURI for the specified tokenId from the contract.
   * This value represents the IPFS URL of the NFT's metadata.
   * @param tokenId The ID of the NFT to retrieve the tokenURI for.
   * @returns The tokenURI for the specified NFT, or null if the contract method call fails.
   */
  return await readContract({
    contract,
    method: 'function tokenURI(uint256 tokenId) returns (string)',
    params: [BigInt(tokenId)],
  });
}

export async function getGalleryNFTs() {
  /**
   * Get all the NFTs minted by the contract.
   * This function calls getTokenIdCounter() to get the number of NFTs minted by the contract.
   * It then loops through the range of tokenIds (from 0 to tokenIdCounter - 1) and calls getTokenURI() for each tokenId.
   * The returned NFT metadata is then processed and returned as an array of objects.
   * @returns An array of objects containing the NFT metadata, or an empty array if the contract method call fails.
   */
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
  /**
   * Get the owner of the specified NFT from the contract.
   * This value represents the Ethereum address of the NFT's owner.
   * @param tokenId The ID of the NFT to retrieve the owner for.
   * @returns The owner of the specified NFT, or null if the contract method call fails.
   */
  return await readContract({
    contract,
    method: 'function ownerOf(uint256 tokenId) returns (address)',
    params: [BigInt(tokenId)], // Passing tokenId sebagai argumen
  });
}
