import { handleGetProducts } from '@/app/actions/products';
import Fullloader from '@/components/common/loader/fullloader';
import Sectionloader from '@/components/common/loader/section-loader';
import { PARAMS, SEARCHPARAMS } from '@/lib/global';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { preloadProducts } from '@/components/preload-product';
import NewArrivalsBreadcrumbs from '@/modules/new-arrivals/newarrivals-breadcrumbs';
import NewArrivalsModule from '@/modules/new-arrivals/newarrivals-module';

export async function generateMetadata(): Promise<Metadata> {
  let title =
    'New Tech Gadgets in Bangladesh | Latest Smartwatches, Earbuds & More | TechStudio BD';
  let description =
    'Discover the newest tech arrivals: Wireless earbuds, gaming accessories, power banks & more. Limited-time discounts & free delivery! 🚀 Shop latest gadgets →';
  let robots = { index: true, follow: true };
  let imageSrc = '/logo_en.webp';

  return {
    title,
    description,
    robots,
    metadataBase: new URL('https://techstudio.com.bd'),
    openGraph: {
      siteName: 'TechStudio',
      title: `${title} | TechStudio`,
      description,
      url: `https://www.techstudio.com.bd/new-arrivals`,
      images: [
        {
          url: imageSrc, // Add default category image
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | TechStudio`,
      description,
      images: [imageSrc],
    },
    alternates: {
      canonical: `/new-arrivals`,
    },
  };
}

// Convert to SSR - no ISR caching
export const dynamic = 'force-dynamic';

const page = async ({ searchParams }: { searchParams: SEARCHPARAMS }) => {
  const { page, limit, sort_by_price, filter_lte, filter_gte, brands } =
    await searchParams;
  const currentPage = parseInt(page ? page.toString() : '1');
  const querylimit = Number(limit) | 20;
  const structuredBrand = brands
    ? decodeURIComponent(brands.toString())
    : undefined;

  preloadProducts({
    page: currentPage || 1,
    limit: querylimit,
    brands: structuredBrand,
    sort_by_price: sort_by_price?.toString(),
    filter_lte: filter_lte?.toString(),
    filter_gte: filter_gte?.toString(),
  });

  const products = await handleGetProducts({
    page: currentPage || 1,
    limit: querylimit,
    brands: structuredBrand,
    sort_by_price: sort_by_price?.toString(),
    filter_lte: filter_lte?.toString(),
    filter_gte: filter_gte?.toString(),
  });
  if (!products) {
    return <Fullloader />;
  }
  return (
    <main className="mx-auto max-w-6xl">
      <NewArrivalsBreadcrumbs />
      <Suspense fallback={<Sectionloader />}>
        <NewArrivalsModule data={products} />
      </Suspense>
    </main>
  );
};

export default page;
