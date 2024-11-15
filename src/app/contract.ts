import { getContract } from 'thirdweb';
import { client } from './client';
import { sepolia } from 'thirdweb/chains';

/**
 * This module exports a configured contract instance using thirdweb's getContract function.
 * It utilizes a thirdweb client and connects to the Sepolia test network.
 *
 * Environment Variables:
 * - THIRDWEB_SECRET_KEY: Required. Used as a secret key for the thirdweb client.
 *
 * Contract Details:
 * - Chain: Sepolia
 * - Address: 0xA895a9b5882DBa287CF359b6a722C5be46aCb675
 *
 * Usage:
 * Import the 'contract' from this module to interact with the specified smart contract.
 */
export const contract = getContract({
  client: { ...client, secretKey: process.env.THIRDWEB_SECRET_KEY },
  chain: sepolia,
  address: '0xA895a9b5882DBa287CF359b6a722C5be46aCb675',
});
