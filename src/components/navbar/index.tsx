import mintmateLogo from '@/assets/mintmate.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import Auth from './auth';

export default async function Navbar() {
  return (
    <nav className="flex justify-center items-center">
      <div className="flex justify-between items-center w-full max-w-[90%] lg:w-[90%] lg:max-w-7xl py-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src={mintmateLogo}
              alt="Mintmate Logo"
              className="h-10 w-auto"
              placeholder="blur"
            />
          </Link>
          <Link
            href="/gallery"
            className="font-semibold text-zinc-500 hover:text-black text-sm underline-on-hover after:bg-zinc-500"
          >
            Gallery
          </Link>
        </div>
        <div className="flex gap-5">
          <Button
            className="text-blue-500 hover:bg-blue-100 bg-blue-100 font-semibold rounded-full shadow-none"
            asChild
          >
            <Link href="/mint/nft">Mint</Link>
          </Button>
          <Auth />
        </div>
      </div>
    </nav>
  );
}
