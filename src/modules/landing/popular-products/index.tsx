import React from 'react';
import products from '@/utils/new-products.json';
import ProductCard from '@/components/product-card';
import { Product } from '@/lib/product-types';

const PopularProducts = ({ data }: { data: Product[] }) => {
  return (
    <section className="px-2 py-10 2xl:px-0">
      <div className="border-b pb-2">
        <h3 className="text-lg font-bold">Popular Products</h3>
      </div>
      <div className="my-10 grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((i, idx) => <ProductCard key={idx} data={i} />)}
      </div>
    </section>
  );
};

export default PopularProducts;
