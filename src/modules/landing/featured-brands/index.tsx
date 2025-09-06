import React from 'react';
import brands from '@/utils/brands.json';
import Link from 'next/link';
import { cn } from '@/lib/utils';
const FeaturedBrandCard = () => {
  return (
    <section className="my-10 grid gap-4 px-2 md:grid-cols-3">
      {brands?.map((i, idx) => (
        <Link
          href={i?.href}
          key={idx}
          className={cn(
            'overflow-hidden rounded-2xl antialiased shadow hover:shadow-lg',
            idx > 0 ? 'hidden px-2 md:block' : '',
          )}
        >
          <picture>
            <img src={i?.image} alt={i?.label} className="h-24 w-full" />
          </picture>
        </Link>
      ))}
    </section>
  );
};

export default FeaturedBrandCard;
