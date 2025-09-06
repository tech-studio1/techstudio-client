import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const FeaturedBrandCard2 = () => {
  return (
    <section className="grid grid-cols-1 gap-4 px-2 py-10 md:grid-cols-2 xl:px-0">
      <Link
        href={'#'}
        className={cn(
          'overflow-hidden rounded-2xl antialiased shadow hover:shadow-lg',
        )}
      >
        <picture>
          <img
            src={'/hero/QCY_SP7_techstudio.webp'}
            alt={'brand'}
            className="size-full xl:h-64"
          />
        </picture>
      </Link>
      <Link
        href={'#'}
        className={cn(
          'overflow-hidden rounded-2xl antialiased shadow hover:shadow-lg',
        )}
      >
        <picture>
          <img
            src={'/hero/AURA-FIT-GT17.webp'}
            alt={'brand'}
            className="size-full xl:h-64"
          />
        </picture>
      </Link>
    </section>
  );
};

export default FeaturedBrandCard2;
