import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ipfsToHttp(ipfsUrl: string) {
  return ipfsUrl?.replace('ipfs://', 'https://ipfs.io/ipfs/');
}

export function parseToNumber(value: string) {
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
}

export function isValidUrl(url: string) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!urlPattern.test(url)) return false;

  return true;
}
