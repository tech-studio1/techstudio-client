'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel';
import Link from 'next/link';

const useAutoSlide = (
  emblaApi: EmblaCarouselType | undefined,
  interval = 3000,
) => {
  const timerRef = useRef<number | null>(null);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  const start = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(autoplay, interval);
  }, [autoplay, interval]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return { start, stop };
};

export default function AutoSlidingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const { start: startAutoSlide, stop: stopAutoSlide } = useAutoSlide(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;

    // Handle pointer interactions
    const handlePointerDown = () => stopAutoSlide();
    const handlePointerUp = () => startAutoSlide();

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopAutoSlide();
      } else {
        startAutoSlide();
      }
    };

    // Add event listeners
    emblaApi.on('pointerDown', handlePointerDown);
    emblaApi.on('pointerUp', handlePointerUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      emblaApi.off('pointerDown', handlePointerDown);
      emblaApi.off('pointerUp', handlePointerUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [emblaApi, startAutoSlide, stopAutoSlide]);
  const images = [
    {
      url: '/banner/monson-best-seal.webp',
      href: '/',
      name: 'Best Deal',
    },
    {
      url: '/banner/anker-official.webp',
      href: '/brands/anker',
      name: 'Anker Best Official Deal',
    },
    {
      url: '/banner/qcy-offer.webp',
      href: '/brands/qcy',
      name: 'QCY Best Official Deal',
    },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((item, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%] pl-0">
              {item?.href === '#' ? (
                <div className="relative size-full">
                  <picture>
                    <img
                      src={item.url}
                      alt={`Slide ${index + 1}`}
                      className="size-full object-fill 2xl:h-full"
                    />
                  </picture>
                </div>
              ) : (
                <Link href={item?.href} className="relative size-full">
                  <picture>
                    <img
                      src={item.url}
                      alt={`Slide ${index + 1}`}
                      className="size-full object-fill 2xl:h-full"
                    />
                  </picture>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
