import { Button } from '@/components/ui/button';
import NFT1 from '@/assets/nft-1.jpg';
import NFT2 from '@/assets/nft-2.jpg';
import NFT3 from '@/assets/nft-3.jpg';
import NFT4 from '@/assets/nft-4.jpg';
import NFT5 from '@/assets/nft-5.jpg';
import NFT6 from '@/assets/nft-6.jpg';
import NFT7 from '@/assets/nft-7.jpg';
import NFT8 from '@/assets/nft-8.jpg';
import CarouselAutoscroll from '@/components/ui/carousel-autoscroll';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="min-h-[50vh] max-lg:min-h-[47vh] w-full flex flex-col justify-center items-center gap-4 text-center max-sm:px-2">
        <h1 className="uppercase text-sm font-bold text-zinc-400">
          Create, Explore, & Collect Digital Art NFTs.
        </h1>
        <h2 className="text-4xl font-bold">Crystalized Passion.</h2>
        <Button variant="outline" className="rounded-full" asChild>
          <Link href="/gallery">Explore</Link>
        </Button>
      </div>
      <div className="mb-3 h-1/4 max-lg:flex-1">
        <CarouselAutoscroll buyerImages={[NFT1, NFT2, NFT3, NFT4, NFT5, NFT6, NFT7, NFT8]} />
        <CarouselAutoscroll
          buyerImages={[NFT3, NFT7, NFT1, NFT5, NFT2, NFT8, NFT4, NFT6]}
          isBackward
          className="lg:hidden mt-3"
        />
      </div>
    </div>
  );
}
