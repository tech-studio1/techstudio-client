import Banner from '@/components/banner';
// import BrandCarousel from '@/modules/landing/brand-carousel';
// import CategoriesModule from '@/modules/landing/categories';
// import ChargerCables from '@/modules/landing/charger-cables';
// import FeaturedBrandCard from '@/modules/landing/featured-brands';
import FeaturedBrandCard2 from '@/modules/landing/featured-brands-2';
// import HeadPhones from '@/modules/landing/head-phones';
import HeroSection from '@/modules/landing/hero-section';
// import NewArrival from '@/modules/landing/new-arrival';
// import PopularProducts from '@/modules/landing/popular-products';
// import PowerBanks from '@/modules/landing/power-banks';
// import SmartWatches from '@/modules/landing/smart-watches';
import { Support } from '@/modules/landing/support';
import { handleGetProducts } from './actions/products';
// import Fullloader from '@/components/common/loader/fullloader';
import dynamic from 'next/dynamic';
import Sectionloader from '@/components/common/loader/section-loader';
import { handleGetCategory } from './actions/category';
import { Suspense } from 'react';
import { preloadProducts } from '@/components/preload-product';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  let imageSrc = '/logo_en.webp';
  return {
    title:
      'TechStudio BD: Electronics & Tech Gadgets Store in Bangladesh | Smartwatches, Headphones, Power Banks',
    description:
      'Shop electronics & gadgets in Bangladesh: Wireless Headphones, Smartwatches, Powerbanks, Chargers, Trimmers & more. Best prices, fast delivery, and 100% secure payments. 🎧 Free Shipping Available! ',
    keywords:
      'Fans, Headphones, Neckband, Powerbanks, Smart Watches,True Wireless Earbuds, Speaker',
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

    openGraph: {
      type: 'website',

      title:
        'TechStudio BD: Electronics & Tech Gadgets Store in Bangladesh | Smartwatches, Headphones, Power Banks',

      description:
        'Shop electronics & gadgets in Bangladesh: Wireless Headphones, Smartwatches, Powerbanks, Chargers, Trimmers & more. Best prices, fast delivery, and 100% secure payments. 🎧 Free Shipping Available! ',

      url: `https://techstudio.com.bd`, // Add the canonical URL

      images: [
        {
          url: imageSrc,

          width: 1200,

          height: 630,

          alt: 'TechStudio BD',
          type: 'image/webp',
        },
      ],

      siteName: 'TechStudio', // Add your store name
    },

    twitter: {
      card: 'summary_large_image',

      title:
        'TechStudio BD: Electronics & Tech Gadgets Store in Bangladesh | Smartwatches, Headphones, Power Banks',

      description:
        'Shop electronics & gadgets in Bangladesh: Wireless Headphones, Smartwatches, Powerbanks, Chargers, Trimmers & more. Best prices, fast delivery, and 100% secure payments. 🎧 Free Shipping Available! ',

      images: [imageSrc],
    },

    alternates: {
      canonical: `/`,
    },
  };
}

const SmartWatches = dynamic(() => import('@/modules/landing/smart-watches'), {
  loading: () => <Sectionloader />,
});
const HeadPhones = dynamic(() => import('@/modules/landing/head-phones'), {
  loading: () => <Sectionloader />,
});
const PowerBanks = dynamic(() => import('@/modules/landing/power-banks'), {
  loading: () => <Sectionloader />,
});
// const ChargerCables = dynamic(
//   () => import('@/modules/landing/charger-cables'),
//   {
//     loading: () => <Sectionloader />,
//   },
// );

const ProductContainer = dynamic(
  () => import('@/modules/landing/product-container'),
  {
    loading: () => <Sectionloader />,
  },
);

const CategoriesModule = dynamic(() => import('@/modules/landing/categories'), {
  loading: () => <Sectionloader />,
});

export default async function Home() {
  preloadProducts({ page: 1, limit: 12 });
  preloadProducts({ page: 1, limit: 12, category: 'smart-watches' });
  preloadProducts({ page: 1, limit: 12, category: 'true-wireless-earbuds' });
  preloadProducts({ page: 1, limit: 12, category: 'powerbanks' });
  preloadProducts({ page: 1, limit: 12, category: 'cables' });
  preloadProducts({ page: 1, limit: 12, category: 'speaker' });

  const categoriesData = await handleGetCategory();

  const newArrivals = await handleGetProducts({
    page: 1,
    limit: 12,
    // category: 'smart-watches',
  });

  const fans = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'fans',
  });

  const powerBanks = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'powerbanks',
  });

  const neckbands = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'neckband',
  });

  const speakers = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'speaker',
  });

  const earbuds = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'true-wireless-earbuds',
  });

  const smartwatches = await handleGetProducts({
    page: 1,
    limit: 12,
    category: 'smart-watches',
  });

  // const cables = await handleGetProducts({
  //   page: 1,
  //   limit: 12,
  //   category: 'cables',
  // });
  // console.log();
  // if (!earbuds && !powerBanks && !cables && !smartwatches) {
  //   return <Fullloader />;
  // }

  const [categories, newArrival, fan, powerbank, neckband, earbud, smartwatch] =
    await Promise.all([
      categoriesData,
      newArrivals,
      fans,
      powerBanks,
      neckbands,
      earbuds,
      smartwatches,
    ]);

  return (
    <main className="mx-auto w-full max-w-6xl">
      <HeroSection />
      {/* <FeaturedBrandCard /> */}
      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(categories) && categories.length > 0 && (
          <CategoriesModule data={categories} />
        )}
      </Suspense>

      {/* <NewArrival /> */}
      <FeaturedBrandCard2 />
      {/* <PopularProducts /> */}
      {/* <Banner image={'/banner/171152472265.webp'} alt="banner" /> */}
      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(newArrival.data) && newArrival.data?.length > 0 && (
          <ProductContainer
            data={newArrival?.data}
            title="New Arrivals"
            href="/new-arrivals"
          />
        )}
      </Suspense>
      <Link href={'/categories/powerbanks'}>
        <Banner
          image={'/hero/powerbank_techstudio.webp'}
          alt="techstudio powerbanks"
        />
      </Link>
      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(powerbank?.data) && powerbank?.data?.length > 0 && (
          <PowerBanks data={powerbank?.data} />
        )}
      </Suspense>
      <Link href={'/categories/neckband'}>
        <Banner
          image={'/hero/monster-neckband.webp'}
          alt="monster neckband techstudio"
        />
      </Link>

      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(neckband?.data) && neckband?.data?.length > 0 && (
          <ProductContainer
            data={neckband?.data}
            title="Neckband"
            href="/categories/neckband"
          />
        )}
      </Suspense>

      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(speakers?.data) && speakers?.data?.length > 0 && (
          <ProductContainer
            data={speakers?.data}
            title="Speaker"
            href="/categories/speaker"
          />
        )}
      </Suspense>

      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(smartwatch.data) && smartwatch.data?.length > 0 && (
          <SmartWatches data={smartwatch?.data} />
        )}
      </Suspense>

      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(fan?.data) && fan?.data?.length > 0 && (
          <ProductContainer
            data={fan?.data}
            title="Fans"
            href="/categories/fans"
          />
        )}
      </Suspense>

      <Suspense fallback={<Sectionloader />}>
        {Array.isArray(earbud.data) && earbud.data?.length > 0 && (
          <HeadPhones data={earbud?.data} />
        )}
      </Suspense>

      {/* <Suspense fallback={<Sectionloader />}>
        {Array.isArray(cable.data) && cable?.data.length > 0 && (
          <ChargerCables data={cable?.data} />
        )}
      </Suspense> */}

      {/* <BrandCarousel /> */}
      <Support />
    </main>
  );
}
