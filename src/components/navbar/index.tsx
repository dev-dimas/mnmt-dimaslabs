import Image from 'next/image';
import mintmateLogo from '@/assets/mintmate.png';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Navbar() {
  return (
    <nav className="flex justify-center items-center">
      <div className="flex justify-between items-center container w-full max-lg:max-w-[90%] max-w-[75%] py-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src={mintmateLogo} alt="Mintmate Logo" className="h-10 w-auto" placeholder="blur" />
          </Link>
          <Link href="/gallery" className="font-semibold text-zinc-500 hover:text-black text-sm underline-on-hover after:bg-zinc-500">
            Gallery
          </Link>
        </div>
        <div className="flex gap-5">
          <Button className="text-blue-500 hover:bg-blue-100 bg-blue-100 font-semibold rounded-full shadow-none">Mint</Button>
          <Button className="text-black hover:bg-zinc-200 bg-zinc-200 font-semibold rounded-full shadow-none" variant="secondary">
            Connect
          </Button>
        </div>
      </div>
    </nav>
  );
}
