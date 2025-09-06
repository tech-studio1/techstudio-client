import { handleGetCategory } from '@/app/actions/category';
import { handleGetProducts } from '@/app/actions/products';
import Fullloader from '@/components/common/loader/fullloader';
import Sectionloader from '@/components/common/loader/section-loader';
import { PARAMS, SEARCHPARAMS } from '@/lib/global';
import CategoriesBreadcrumbs from '@/modules/categories/categories-breadcrumbs';
import CategoryModule from '@/modules/categories/categories-module';
import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { preloadProducts } from '@/components/preload-product';
interface CategoryItemProps {
  created_at: string;
  description: string;
  id: string;
  slug: string;
  medias: string[];
  status: string;
  title: string;
  updated_at: string;
  sub_categories?: any[];
}

export async function generateMetadata({
  params,
}: {
  params: PARAMS;
}): Promise<Metadata> {
  const slug = (await params).slug;
  let title = 'Category';
  let description = 'Browse products in this category';
  let robots = { index: true, follow: true };
  let imageSrc = '/logo_en.webp';
  try {
    if (slug === 'all') {
      title = 'All Products';
      description = 'Explore our complete product collection';
    } else {
      const categories = await handleGetCategory();
      const category = categories.find(
        (cat: CategoryItemProps) => cat.slug === slug,
      );

      if (category) {
        title = 'Buy ' + category.title + ' in Bangladesh | TechStudio BD';
        description = category.description;
        imageSrc =
          category && category?.medias && category.medias?.length > 0
            ? category?.medias?.[0]
            : '/logo_en.webp';
      } else {
        title = 'Category Not Found';
        description = 'The requested category does not exist';
        robots = { index: false, follow: false };
      }
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return {
    title,
    description,
    robots,
    metadataBase: new URL('https://techstudio.com.bd'),
    openGraph: {
      siteName: 'TechStudio',
      title: `${title} | TechStudio`,
      description,
      url: `https://www.techstudio.com.bd/categories/${slug}`,
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
      canonical: `/categories/${slug}`,
    },
  };
}

// Convert to SSR - no ISR caching
export const dynamic = 'force-dynamic';

const StructuredData = async ({ slug }: { slug: string }) => {
  let categoryData: CategoryItemProps | null = null;
  const baseUrl = 'https://www.techstudio.com.bd';

  try {
    if (slug !== 'all') {
      const categories: CategoryItemProps[] = await handleGetCategory();
      categoryData =
        (categories &&
          categories.find((cat) => {
            cat.slug === slug;
          })) ||
        null;
    }
  } catch (error) {
    console.error('Error fetching category for structured data:', error);
  }

  // CollectionPage Schema
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: slug === 'all' ? 'All Products' : categoryData?.title || 'Category',
    description:
      slug === 'all'
        ? 'Complete collection of our products'
        : categoryData?.description || 'Product category',
    url: `${baseUrl}/categories/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/categories/${slug}`,
    },
  };

  // Breadcrumb Schema
  const breadcrumbSegments = slug.split('/');
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categories',
        item: `${baseUrl}/categories`,
      },
      ...breadcrumbSegments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 3,
        name:
          segment === 'all'
            ? 'All Products'
            : categoryData?.title || segment.replace(/-/g, ' '),
        item: `${baseUrl}/categories/${breadcrumbSegments.slice(0, index + 1).join('/')}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
};

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SEARCHPARAMS;
}) => {
  const slug = (await params).slug;
  const { page, query, limit, sort_by_price, filter_lte, filter_gte, brands } =
    await searchParams;
  // console.log(query);
  const formattedSlug = slug.toString();
  // console.log(formattedSlug);
  const currentPage = parseInt(page ? page.toString() : '1');
  // console.log(currentPage);
  const querylimit = Number(limit) | 20;
  const structuredBrand = brands
    ? decodeURIComponent(brands.toString())
    : undefined;
  // console.log(structuredBrand);

  preloadProducts({
    page: currentPage || 1,
    limit: querylimit,
    brands: structuredBrand,
    // search: formattedSlug,
    sort_by_price: sort_by_price?.toString(),
    filter_lte: filter_lte?.toString(),
    filter_gte: filter_gte?.toString(),
    category: formattedSlug,
  });

  const products = await handleGetProducts({
    page: currentPage || 1,
    limit: querylimit,
    brands: structuredBrand,
    // search: formattedSlug,
    sort_by_price: sort_by_price?.toString(),
    filter_lte: filter_lte?.toString(),
    filter_gte: filter_gte?.toString(),
    category: formattedSlug,
  });
  if (!products) {
    return <Fullloader />;
  }
  return (
    <main className="mx-auto max-w-6xl">
      <Suspense fallback={null}>
        <StructuredData slug={slug} />
      </Suspense>
      <CategoriesBreadcrumbs slug={slug} />
      <Suspense fallback={<Sectionloader />}>
        <CategoryModule data={products} />
      </Suspense>
    </main>
  );
};

export default page;
