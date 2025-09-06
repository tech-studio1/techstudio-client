import React from 'react';
import BatteryInfo from '@/modules/product/BatteryInfo';
import ProductGallery from '@/modules/product/ProductGallery';
import ProductInfo from '@/modules/product/ProductInfo';
import ProductSpecs from '@/modules/product/ProductSpecs';
import SensorsInfo from '@/modules/product/SensorsInfo';
import {
  handleGetProducts,
  handleGetSingleProduct,
} from '@/app/actions/products';
import Fullloader from '@/components/common/loader/fullloader';
import ProductDescription from '@/modules/product/product-description';
import NotFoundCard from '@/components/common/not-found-card';
import { Product } from '@/lib/product-types';
import type { Metadata } from 'next';
import ProductView from '@/modules/product/product-view';

// Remove revalidate and generateStaticParams to opt out of static generation
// This will make the page render on each request (SSR)
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const slug = (await params).slug;
    let productResponse;

    try {
      productResponse = await handleGetSingleProduct(slug);
    } catch (error) {
      console.error(`Failed to fetch metadata for product ${slug}:`, error);
      return {
        title: 'Product | TechStudio',
        description: 'Explore our products at TechStudio',
        metadataBase: new URL('https://techstudio.com.bd'),
      };
    }

    if (!productResponse?.data || !productResponse.success) {
      return {
        title: 'Product Not Found | TechStudio',
        description: 'The product you are looking for does not exist.',
        metadataBase: new URL('https://techstudio.com.bd'),
      };
    }

    const product: Product = productResponse.data;
    const firstMedia =
      product?.variants?.[0]?.medias?.[0] ??
      product?.medias?.[0] ??
      '/product_place_holder.gif';

    const category = product?.category?.replace(/-/g, ' ');

    // Extract and format the specifications

    const specs =
      product?.specs?.map((spec) => `${spec.key}: ${spec.value}`).join(', ') ||
      'No specifications available';

    // Create a clean description that includes the specs

    const cleanDescription = `${specs}`;

    // Ensure the description does not exceed 160 characters

    const trimmedDescription =
      cleanDescription.length > 160
        ? cleanDescription.substring(0, 157) + '...'
        : cleanDescription;

    // Build keywords from features and category

    const keywords = [
      ...(product?.features || []),

      category,

      ...product?.specs?.map((spec) => spec.value),

      product?.title,
    ];

    return {
      title: `${product?.title} | TechStudio BD`,

      description: trimmedDescription,

      keywords: Array.from(new Set(keywords)).slice(0, 10).join(', '), // Unique first 10 keywords

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

        title: `${product?.title} | TechStudio`,

        description: trimmedDescription,

        url: `https://techstudio.com.bd/product/${slug}`, // Add the canonical URL

        images: [
          {
            url: firstMedia,

            width: 1200,

            height: 630,

            alt: product.title,
            type: 'image/webp',
          },
        ],

        siteName: 'TechStudio', // Add your store name
      },

      twitter: {
        card: 'summary_large_image',

        title: `${product?.title} | TechStudio`,

        description: trimmedDescription,

        images: [firstMedia],
      },

      alternates: {
        canonical: `/product/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'TechStudio',
      description: 'Explore our products at TechStudio',
      metadataBase: new URL('https://techstudio.com.bd'),
    };
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const slug = (await params).slug;
    let product;

    try {
      product = await handleGetSingleProduct(slug);
    } catch (error) {
      console.error(`Failed to fetch product ${slug}:`, error);
      return <NotFoundCard />;
    }

    if (!product || !product.success || !product.data) {
      return <NotFoundCard />;
    }

    const prodData: Product = product.data;
    const jsonLd = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: prodData.title,
      offers: {
        ...(prodData.variants || {}),
        availability: prodData.status,
        priceCurrency: 'BDT',
        hasMerchantReturnPolicy: 'yes',
        price: prodData.pricing?.compareAtPrice,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingService: {
            '@type': 'DeliveryChargeSpecification',
            name: 'Doorstep Delivery',
            price: prodData.pricing?.compareAtPrice,
            priceCurrency: 'BDT',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'BD',
          },
        },
        paymentAccepted: 'Cash on Delivery',
      },
      image:
        prodData?.variants?.[0]?.medias?.[0] ??
        prodData?.medias?.[0] ??
        '/product_place_holder.gif',
      priceCurrency: 'BDT',
      ...prodData,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="mx-auto max-w-6xl px-2 xl:px-0">
          <div className="py-8">
            <ProductView product={prodData} />
            <ProductSpecs specs={prodData.specs} />
            <ProductDescription product={prodData} />
            {/* Only show these if relevant for product category */}
            {prodData.category === 'smart-watch' && (
              <>
                <BatteryInfo />
                <SensorsInfo />
              </>
            )}
            {/* <QAForm /> */}
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error('Error in Page component:', error);
    return <NotFoundCard />;
  }
};

export default Page;
