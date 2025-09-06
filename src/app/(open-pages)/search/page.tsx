import { handleGetProducts } from '@/app/actions/products';
import Fullloader from '@/components/common/loader/fullloader';
import { preloadProducts } from '@/components/preload-product';
import { SEARCHPARAMS } from '@/lib/global';
import ProductsBreadcrumbs from '@/modules/products/products-breadcrumbs';
import ProductsModule from '@/modules/products/products-module';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  let title = 'Search Tech Gadgets in Bangladesh | TechStudio';
  let description =
    'Discover the newest tech arrivals: Wireless earbuds, gaming accessories, power banks & more. Limited-time discounts & free delivery! 🚀 Shop latest gadgets →';
  let robots = { index: true, follow: true };
  return {
    title,
    description,
    robots,
    metadataBase: new URL('https://techstudio.com.bd'),
  };
}

export const dynamic = 'force-dynamic';
const page = async ({ searchParams }: { searchParams: SEARCHPARAMS }) => {
  const {
    page,
    query,
    limit,
    sort_by_price,
    filter_lte,
    filter_gte,
    brands,
    sort_by_relevance,
  } = await searchParams;
  // console.log(query);
  const formattedSlug =
    query &&
    query.toString().replaceAll('-', ' ').replaceAll('_', ' ').toLowerCase();
  // console.log(formattedSlug);
  const currentPage = parseInt(page ? page.toString() : '1');
  // console.log(currentPage);
  const querylimit = Number(limit) | 20;

  const structuredBrand = brands
    ? decodeURIComponent(brands.toString())
    : undefined;

  //preload data
  if (sort_by_price) {
    preloadProducts({
      page: currentPage || 1,
      limit: querylimit,
      brands: structuredBrand,
      search: formattedSlug,
      sort_by_price: sort_by_price?.toString(),
      filter_lte: filter_lte?.toString(),
      filter_gte: filter_gte?.toString(),
    });
  } else {
    preloadProducts({
      page: currentPage || 1,
      limit: querylimit,
      brands: structuredBrand,
      search: formattedSlug,
      sort_by_relevance: sort_by_relevance?.toString(),
      filter_lte: filter_lte?.toString(),
      filter_gte: filter_gte?.toString(),
    });
  }

  //fetchdata
  const products = sort_by_price
    ? await handleGetProducts({
        page: currentPage || 1,
        limit: querylimit,
        brands: structuredBrand,
        search: formattedSlug,
        sort_by_price: sort_by_price?.toString(),
        filter_lte: filter_lte?.toString(),
        filter_gte: filter_gte?.toString(),
      })
    : await handleGetProducts({
        page: currentPage || 1,
        limit: querylimit,
        brands: structuredBrand,
        search: formattedSlug,
        sort_by_relevance: sort_by_relevance?.toString(),
        filter_lte: filter_lte?.toString(),
        filter_gte: filter_gte?.toString(),
      });

  if (products && products?.data && products?.meta) {
    return (
      <main className="mx-auto max-w-6xl">
        <Suspense fallback={<Fullloader />}>
          <ProductsBreadcrumbs slug={formattedSlug || ''} />

          <ProductsModule data={products} />
        </Suspense>
      </main>
    );
  } else {
    return <Fullloader />;
  }
};

export default page;
