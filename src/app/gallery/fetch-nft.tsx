import { getTokenURI } from '@/actions/gallery-actions';
import { ipfsToHttp } from '@/lib/utils';
import NFTCard from './nft-card';

export default async function FetchNFT({ tokenId }: { tokenId: number }) {
  const tokenURI = await getTokenURI(tokenId);
  let nft: Record<string, string> = {};

  const req = await fetch(ipfsToHttp(tokenURI));

  try {
    nft = await req.json();
  } catch (error) {
    console.error(error);
  }

  return <NFTCard {...{ nft, tokenId }} />;
}
