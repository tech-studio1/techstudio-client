import { handleGetOfferFromSlug, handleGetOffers } from '@/app/actions/offers';
import Fullloader from '@/components/common/loader/fullloader';
import Sectionloader from '@/components/common/loader/section-loader';
import { PARAMS, SEARCHPARAMS } from '@/lib/global';
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import NotFoundCard from '@/components/common/not-found-card';
import { notFound } from 'next/navigation';
import OffersBreadcrumbs from '@/modules/offers/offers-breadcrumbs';
import OffersModule from '@/modules/offers/offers-module';

export type Offer = {
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
      description: 'Explore all products across our offers',
      metadataBase: new URL('https://techstudio.com.bd'),
      openGraph: {
        title: 'All Products',
        description: 'Discover our complete product collection',
        url: 'https://techstudio.com.bd/offers',
        images: [], // Add default image if available
      },
      twitter: {
        card: 'summary_large_image',
        title: 'All Products | TechStudio',
        description: 'Explore all products across our offers',
        images: [], // Add default Twitter image if available
      },
    };
  }

  const offersData = await handleGetOffers();
  const offer = offersData?.data.find((b: Offer) => b.slug === slug);

  return {
    title: `${offer?.title || 'Offer'} Products | TechStudio`,
    description: `Explore products from ${offer?.title || 'our offer'}`,
    metadataBase: new URL('https://techstudio.com.bd'),
    openGraph: {
      siteName: 'TechStudio',
      title: `${offer?.title || 'Offer'} Products in Bangladesh | TechStudio`,
      description: `Shop 100% genuine ${offer?.title || 'our offer'} gadgets in Bangladesh: Smartwatches, power banks, earbuds & more. COD available!`,
      url: `https://www.techstudio.com.bd/offers/${offer?.slug}`,
      images: offer?.medias?.[0] ? [offer.medias[0]] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${offer?.title || 'Offer'} Products | TechStudio`,
      description: `Explore products from ${offer?.title || 'our offer'}`,
      images: offer?.medias?.[0] ? [offer.medias[0]] : [],
    },
    alternates: {
      canonical: `/offers/${offer?.slug}`,
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
  const offer = await handleGetOfferFromSlug(slug);

  // Use Next.js notFound() for invalid offers
  if (!offer || !offer.data) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl">
      <OffersBreadcrumbs slug={slug} />
      <Suspense fallback={<Sectionloader />}>
        <OffersModule data={offer?.data} />
      </Suspense>
    </main>
  );
};

export default page;
