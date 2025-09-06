import React from 'react';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import { Product } from '@/lib/product-types';

const ProductContainer = ({
  data,
  title,
  href,
}: {
  data: Product[];
  title: string;
  href: string;
}) => {
  return (
    <section className="px-2 py-4 2xl:px-0">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <Link href={href} className="text-sm font-semibold text-primary">
          See All
        </Link>
      </div>
      <div className="my-10 grid grid-cols-2 place-items-center gap-2 md:grid-cols-5 lg:grid-cols-6">
        {data?.map((i, idx: number) => <ProductCard key={idx} data={i} />)}
      </div>
    </section>
  );
};

export default ProductContainer;
