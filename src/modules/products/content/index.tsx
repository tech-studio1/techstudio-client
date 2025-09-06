'use client';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import { MobileFilter } from '@/components/fitler/mobile-filter';
import { PaginationComponent } from '@/components/common/pagination';
import Sectionloader from '@/components/common/loader/section-loader';
import NotFoundCard from '@/components/common/not-found-card';
import { cn } from '@/lib/utils';
import LimitSorting from '@/components/common/pagination/limit-sorting';
import { RelevanceSorting } from '@/components/common/pagination/relevance-sorting';
import { PriceSorting } from '@/components/common/pagination/price-sorting';
const ProductsContent = ({ data }: { data: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  // console.log(data);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const formattedQuery = query
    ?.toString()
    .replaceAll('-', ' ')
    .toLowerCase()
    .replaceAll('_', ' ');

  return (
    <section className="w-full">
      <div className="px-2 pb-2 md:hidden">
        <div className="">
          <MobileFilter />
        </div>
      </div>
      <div className="px-2 xl:px-0">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded bg-white p-2 shadow md:justify-between">
          <p className="hidden font-bold capitalize xl:block">
            {formattedQuery}
          </p>

          <div className="hidden md:block xl:hidden">
            <MobileFilter />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-500">Rel:</p>
              <RelevanceSorting />
            </div>
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
        <PaginationComponent
          currentPage={data?.meta ? data.meta.page : 1}
          totalPages={data?.meta ? data?.meta?.pages : 1}
        />
      </Suspense>
    </section>
  );
};

export default ProductsContent;

const meta = {
  limit: 10,
  page: 1,
  pages: 0,
  total: 9,
};
