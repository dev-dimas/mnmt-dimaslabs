'use client';

import Autoscroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import Image, { StaticImageData } from 'next/image';
import './carousel.css';

export default function CarouselAutoscroll({ buyerImages }: { buyerImages: StaticImageData[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoscroll({
      speed: 1,
      startDelay: 500,
      stopOnInteraction: false,
      stopOnFocusIn: false,
    }),
  ]);
  const slideSize = 100 / 4.5;

  return (
    <div className="embla ">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {buyerImages?.map((image, index) => (
            <div className="embla__slide !mx-[6px] !px-0" style={{ flex: `0 0 ${slideSize}%` }} key={index}>
              <Image src={image} alt={`NFT-${index + 1}`} className="object-cover w-full rounded-xl" placeholder="blur" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
