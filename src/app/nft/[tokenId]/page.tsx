import { getNFTOwner, getTokenURI } from '@/actions/gallery-actions';
import { ipfsToHttp, isValidUrl, parseToNumber } from '@/lib/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: { tokenId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let tokenId = parseToNumber(params.tokenId);

  if (!tokenId) notFound();

  tokenId -= 1;

  const tokenURI = await getTokenURI(tokenId);
  let nft: Record<string, string> = {};

  const req = await fetch(ipfsToHttp(tokenURI));

  try {
    nft = await req.json();
  } catch (error) {
    console.error(error);
    return { title: 'MintMate' };
  }
  return {
    title: `MintMate - ${nft.name}`,
    description: nft.description,
  };
}

export default async function Page({ params }: Props) {
  let tokenId = parseToNumber(params.tokenId);

  if (!tokenId) notFound();

  tokenId -= 1;

  const tokenURI = await getTokenURI(tokenId);
  let nft: Record<string, string> = {};

  const req = await fetch(ipfsToHttp(tokenURI));

  try {
    nft = await req.json();
  } catch (error) {
    console.error(error);
  }

  const owner = await getNFTOwner(tokenId);

  return (
    <div className="flex max-sm:flex-col max-sm:gap-8 mx-auto min-h-full w-[90%] max-sm:w-full max-sm:max-w-[90%] lg:w-[90%] lg:max-w-7xl py-4">
      <div className="w-full sm:w-2/3 bg-zinc-200/80 p-5 sm:p-10 lg:p-20 flex items-center justify-center">
        <Image
          src={ipfsToHttp(nft.image)}
          alt={nft.name}
          width={800}
          height={800}
          className="w-full aspect-square object-contain"
        />
      </div>
      <div className="w-full sm:w-1/3 sm:px-10 flex flex-col justify-center gap-2">
        <h1 className="font-bold text-4xl">{nft.name}</h1>
        <p className="text-lg">{nft.description}</p>
        {isValidUrl(nft.external_url) && (
          <a className="text-sm underline text-blue-500" href={nft.external_url}>
            {nft.external_url}
          </a>
        )}
        <div className="text-sm mt-8">
          <p className="font-semibold">Owner Address :</p>
          <p className="break-words">{owner}</p>
        </div>
      </div>
    </div>
  );
}
