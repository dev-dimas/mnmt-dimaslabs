'use server';

import { contract } from '@/app/contract';
import { isValidUrl } from '@/lib/utils';
import { upload } from 'thirdweb/storage';

type MetadataERC721 = {
  name: string;
  description: string;
  image: string;
  externalUrl?: string;
};

function createMetadataERC721({
  name,
  description,
  image,
  externalUrl,
}: MetadataERC721): MetadataERC721 {
  if (!image.startsWith('ipfs://')) {
    throw new Error("Image URL must start with 'ipfs://'");
  }

  const metadata: MetadataERC721 = {
    name,
    description,
    image,
  };

  if (externalUrl) {
    const isExternalUrlValid = isValidUrl(externalUrl);

    if (!isExternalUrlValid) {
      throw new Error('External url is not valid!');
    }

    metadata.externalUrl = externalUrl;
  }

  return metadata;
}

export async function uploadFileToIPFS(formData: FormData) {
  try {
    const file: File | null = formData.get('file') as File;

    if (!file) throw new Error('No file uploaded');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return await upload({
      client: contract.client,
      files: [buffer],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(message);
    return message;
  }
}

async function uploadJsonToIPFS(json: Record<string, unknown>) {
  try {
    return await upload({
      client: contract.client,
      files: [json],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(message);
    return message;
  }
}

export async function prepareMintNFT({ name, description, image, externalUrl }: MetadataERC721) {
  try {
    const metadata = createMetadataERC721({ name, description, image, externalUrl });

    return await uploadJsonToIPFS(metadata);
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return message;
  }
}
