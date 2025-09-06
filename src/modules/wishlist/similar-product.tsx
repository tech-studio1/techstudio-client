import { Button } from '@/components/ui/button';
import React from 'react';
import products from '@/utils/new-products.json';
import ProductCard from '@/components/product-card';

const SimilarProducts = ({ data }: { data: any[] }) => {
  return (
    <section className="pb-10">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Just for You</div>
        <Button className="h-14">See More</Button>
      </div>
      <div className="my-10 grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((i, idx) => <ProductCard key={idx} data={i} />)}
      </div>
    </section>
  );
};

export default SimilarProducts;
