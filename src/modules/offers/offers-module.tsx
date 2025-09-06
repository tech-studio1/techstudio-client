import React from 'react';
import OffersContent from './content';
import ProductCard from '@/components/product-card';
import NotFoundCard from '@/components/common/not-found-card';
import { cn } from '@/lib/utils';

const OffersModule = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-12 xl:gap-10">
      <div className="col-span-12 w-full">
        <picture>
          <img
            src={
              data && data.medias && data?.medias?.length > 0
                ? data?.medias?.[0]
                : 'https://placehold.co/800x400/svg'
            }
            alt={data?.title}
            className="aspect-[16/9] w-full"
          />
        </picture>
        <div
          className={cn(
            'my-10 grid w-full place-items-center gap-2 px-2 xl:px-0',
            // Apply a grid layout that changes depending on the state:

            data?.products?.length > 0
              ? 'grid-cols-2 md:grid-cols-5' // When data exists, use a multi-column grid
              : 'grid-cols-1', // When no data is found, you could show a different layout
          )}
        >
          {data?.products?.length > 0 ? (
            data?.products?.map((i: any, idx: number) => (
              <ProductCard key={idx} data={i} />
            ))
          ) : (
            <NotFoundCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersModule;
