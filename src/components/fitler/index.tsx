'use client';
import React from 'react';
import PriceFilter from './price-filter';
import BrandsFilter from './brands-filter';
import IdealFilter from './ideal-filter';
import { usePathname } from 'next/navigation';

const FiltersComponent = () => {
  const path = usePathname();

  return (
    <div className="rounded border bg-white shadow">
      <div className="border-b px-2 py-4 font-semibold text-gray-500">
        Filters
      </div>
      <PriceFilter />
      {/* Hide BrandsFilter on any /brands/ route */}
      {!path?.startsWith('/brands/') && <BrandsFilter />}
      {/* <IdealFilter /> */}
    </div>
  );
};

export default FiltersComponent;
