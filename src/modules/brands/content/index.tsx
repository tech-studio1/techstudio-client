'use client';
import { useParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductCard from '@/components/product-card';
import { MobileFilter } from '@/components/fitler/mobile-filter';
import { PriceSorting } from '@/components/common/pagination/price-sorting';
import LimitSorting from '@/components/common/pagination/limit-sorting';
import Sectionloader from '@/components/common/loader/section-loader';
import NotFoundCard from '@/components/common/not-found-card';
import { cn } from '@/lib/utils';
import { PaginationComponent } from '@/components/common/pagination';
const BrandsContent = ({ data }: { data: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const slug = decodeURIComponent(params.slug?.toString() || '');
  const id = slug.split('?')[0];
  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return (
    <section className="w-full">
      <div className="px-2 xl:px-0">
        <div className="flex items-center justify-between rounded bg-white p-2 shadow">
          <p className="hidden font-bold capitalize xl:block">
            {id
              ?.toString()
              .replaceAll('-', ' ')
              .toLowerCase()
              .replaceAll('_', ' ')}
          </p>
          <div className="xl:hidden">
            <MobileFilter />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-500">Show:</p>
              <LimitSorting />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-500">Sort:</p>

              <PriceSorting />
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          'my-10 grid w-full place-items-center gap-2 px-2 xl:px-0',
          // Apply a grid layout that changes depending on the state:
          isLoading
            ? 'grid-cols-1' // When loading, you might want a single-column layout
            : data?.data?.length > 0
              ? 'grid-cols-2 md:grid-cols-5' // When data exists, use a multi-column grid
              : 'grid-cols-1', // When no data is found, you could show a different layout
        )}
      >
        {isLoading ? (
          <Sectionloader />
        ) : data?.data?.length > 0 ? (
          data.data.map((i: any, idx: number) => (
            <ProductCard key={idx} data={i} />
          ))
        ) : (
          <NotFoundCard />
        )}
      </div>
      <Suspense fallback={null}>
        {' '}
        <PaginationComponent
          currentPage={data?.meta ? data.meta.page : 1}
          totalPages={data?.meta ? data?.meta?.pages : 1}
          id={id?.toString()}
        />
      </Suspense>
    </section>
  );
};

export default BrandsContent;
