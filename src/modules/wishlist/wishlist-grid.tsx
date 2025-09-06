import { Button } from '@/components/ui/button';
import React from 'react';
import products from '@/utils/new-products.json';
import ProductCard from '@/components/product-card';

const WishlistGrid = ({ data }: { data: any[] }) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>Wishlist {`(${6})`}</div>
        <Button variant={'outline'} className="h-14">
          Move all to cart
        </Button>
      </div>
      <div className="my-10 grid grid-cols-2 place-items-center gap-2 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((i, idx) => <ProductCard key={idx} data={i} />)}
      </div>
    </section>
  );
};

export default WishlistGrid;
