import { handleGetBrandFromSlug, handleGetBrands } from '@/app/actions/brands';
import { handleGetBrandProducts } from '@/app/actions/products';
import Fullloader from '@/components/common/loader/fullloader';
import Sectionloader from '@/components/common/loader/section-loader';
import { PARAMS, SEARCHPARAMS } from '@/lib/global';
import BrandsBreadcrumbs from '@/modules/brands/brands-breadcrumbs';
import BrandsModule from '@/modules/brands/brands-module';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import NotFoundCard from '@/components/common/not-found-card';
import { notFound } from 'next/navigation';

export type Brand = {
  created_at: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  medias: string[];
  updated_at: string;
};

// Convert to SSR - no ISR caching
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: PARAMS;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'all') {
    return {
      title: 'All Products | TechStudio',
      description: 'Explore all products across our brands',
      metadataBase: new URL('https://techstudio.com.bd'),
      openGraph: {
        title: 'All Products',
        description: 'Discover our complete product collection',
        url: 'https://techstudio.com.bd/brands',
        images: [], // Add default image if available
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Products | TechStudio',
        description: 'Explore all products across our brands',
        images: [], // Add default Twitter image if available
      },
    };
  }

  const brandsData = await handleGetBrands();
  const brand = brandsData?.data.find((b: Brand) => b.slug === slug);

  return {
    title: `${brand?.title || 'Brand'} Products | TechStudio`,
    description: `Explore products from ${brand?.title || 'our brand'}`,
    metadataBase: new URL('https://techstudio.com.bd'),
    openGraph: {
      siteName: 'TechStudio',
      title: `${brand?.title || 'Brand'} Products in Bangladesh | TechStudio`,
      description: `Shop 100% genuine ${brand?.title || 'our brand'} gadgets in Bangladesh: Smartwatches, power banks, earbuds & more. COD available!`,
      url: `https://www.techstudio.com.bd/brands/${brand?.slug}`,
      images: brand?.medias?.[0] ? [brand.medias[0]] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brand?.title || 'Brand'} Products | TechStudio`,
      description: `Explore products from ${brand?.title || 'our brand'}`,
      images: brand?.medias?.[0] ? [brand.medias[0]] : [],
    },
    alternates: {
      canonical: `/brands/${brand?.slug}`,
    },
  };
}
const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SEARCHPARAMS;
}) => {
  const slug = (await params).slug;
  const { page, query, limit, sort_by_price, filter_lte, filter_gte } =
    await searchParams;
  const formattedSlug = slug.toString();
  const currentPage = parseInt(page ? page.toString() : '1');
  const querylimit = Number(limit) | 20;

  const brand = await handleGetBrandFromSlug(slug);

  // Use Next.js notFound() for invalid brands
  if (!brand || !brand.data) {
    notFound();
  }

  const products = await handleGetBrandProducts({
    brandId: brand.data.id.split(':')[1],
    page: currentPage || 1,
    limit: querylimit,
    // search: formattedSlug,
    sort_by_price: sort_by_price?.toString(),
    filter_lte: filter_lte?.toString(),
    filter_gte: filter_gte?.toString(),
    brands: formattedSlug,
  });

  if (!products) {
    return <Fullloader />;
  }

  return (
    <main className="mx-auto max-w-6xl">
      <BrandsBreadcrumbs slug={slug} />
      <Suspense fallback={<Sectionloader />}>
        <BrandsModule data={products} />
      </Suspense>
    </main>
  );
};

export default page;
