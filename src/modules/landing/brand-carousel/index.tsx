'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';

const useAutoSlide = (emblaApi: any, interval = 3000) => {
  const autoplay = useCallback(() => {
    if (!emblaApi) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(autoplay, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval]);
};

export default function BrandCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  //   const [currentIndex, setCurrentIndex] = useState(0);

  useAutoSlide(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    // emblaApi.on("select", () => {
    //   setCurrentIndex(emblaApi.selectedScrollSnap());
    // });
  }, [emblaApi]);

  const images = [
    {
      url: '/brand-icons/amazfit.webp',
      href: '/brands/amazfit',
      name: 'Amazfit',
    },
    {
      url: '/brand-icons/foneng.webp',
      href: '/brands/foneng',
      name: 'Foneng',
    },
    {
      url: '/brand-icons/haier.webp',
      href: '/brands/haier',
      name: 'Haier',
    },
    {
      url: '/brand-icons/haylou.webp',
      href: '/brands/haylou',
      name: 'Haylou',
    },
    {
      url: '/brand-icons/imiki.webp',
      href: '/brands/imiki',
      name: 'Imiki',
    },
    {
      url: '/brand-icons/kieslect.webp',
      href: '/brands/kieslect',
      name: 'Kieslect',
    },
    {
      url: '/brand-icons/kospet.webp',
      href: '/brands/kospet',
      name: 'Kospet',
    },
    {
      url: '/brand-icons/mibro.webp',
      href: '/brands/mibro',
      name: 'Mibro',
    },
    {
      url: '/brand-icons/oneplus.webp',
      href: '/brands/oneplus',
      name: 'OnePlus',
    },
    {
      url: '/brand-icons/oraimo.webp',
      href: '/brands/oraimo',
      name: 'Oraimo',
    },
    {
      url: '/brand-icons/xiaomei.webp',
      href: '/brands/xiaomei',
      name: 'Xiaomei',
    },
  ];

  return (
    <div className="relative xl:ml-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((item, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_33.333%] pl-0 md:flex-[0_0_16.666%]"
            >
              <Link
                href={item?.href}
                className="relative w-full"
                style={{ height: '150px' }}
              >
                <picture>
                  <img
                    src={item?.url}
                    alt={`Slide ${index + 1}`}
                    className="h-[65px] w-[140px] object-fill"
                  />
                </picture>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
