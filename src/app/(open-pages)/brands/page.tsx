import { handleGetBrands } from '@/app/actions/brands';
import Fullloader from '@/components/common/loader/fullloader';
import NotFoundCard from '@/components/common/not-found-card';
import BrandsPageModule from '@/modules/brands/brands-page-module';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      'Top Gadgets Brands in Bangladesh | Xiaomi, Samsung, JBL & More | TechStudio BD',
    description:
      'Shop genuine electronics from top global brands: Xiaomi, Samsung, JBL, Boat, & more. Best prices in Bangladesh, secure payments, and fast delivery. ✅ Authorized Seller → Explore now!',
    keywords: 'Xiaomi, Samsung, JBL, Awei, Baseus',
    metadataBase: new URL('https://techstudio.com.bd'), // Set your production URL here
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const page = async () => {
  const data = await handleGetBrands();
  const brands = data?.data;
  // console.log(data, brands);
  if (!data) {
    return <Fullloader />;
  }
  return (
    <main className="mx-auto size-full max-w-6xl">
      <Suspense fallback={<Fullloader />}>
        <section>
          {data && brands?.length > 0 ? (
            <BrandsPageModule data={brands} />
          ) : (
            <NotFoundCard />
          )}
        </section>
      </Suspense>
    </main>
  );
};

export default page;
