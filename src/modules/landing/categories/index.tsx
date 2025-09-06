'use client';
import Link from 'next/link';
import React from 'react';

type Category = {
  id: string;
  medias: string[];
  slug: string;
  title: string;
  featured?: boolean;
  featured_sequence?: number;
};

function getFeaturedCategories(categories: Category[]): Category[] {
  return categories
    .filter((cat) => cat.featured)
    .sort((a, b) => (a.featured_sequence ?? 0) - (b.featured_sequence ?? 0));
}

const CategoriesModule = ({ data }: { data: Category[] }) => {
  return (
    <section className="my-10 px-4">
      <h3 className="mb-2 text-center text-lg font-bold">Explore Categories</h3>
      <p className="text-center text-sm text-gray-500">
        Find your preferred item in the highlighted product selection.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {getFeaturedCategories(data)?.map((category, idx) => (
          <Link
            key={idx}
            href={`/categories/${category?.slug}`}
            className="group block"
          >
            <div className="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md sm:p-2">
              <div className="mb-2 flex aspect-square items-center justify-center">
                <picture>
                  <img
                    src={category?.medias?.[0]}
                    alt={category?.title}
                    className="size-auto object-contain p-4"
                  />
                </picture>
              </div>
              <p className="truncate text-center text-xs font-medium text-gray-800 group-hover:text-primary">
                {category?.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesModule;
