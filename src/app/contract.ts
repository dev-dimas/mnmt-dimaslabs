import { getContract } from 'thirdweb';
import { client } from './client';
import { sepolia } from 'thirdweb/chains';

export const contract = getContract({
  client: { ...client, secretKey: process.env.THIRDWEB_SECRET_KEY },
  chain: sepolia,
  address: '0xA895a9b5882DBa287CF359b6a722C5be46aCb675',
});
