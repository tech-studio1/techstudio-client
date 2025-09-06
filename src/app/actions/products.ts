'use server';

import { cache } from 'react';

export const handleGetProducts = cache(
  async ({
    page,
    limit,
    search,
    category,
    sort_by_price,
    sort_by_relevance,
    filter_lte,
    filter_gte,
    brands,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort_by_price?: string;
    filter_lte?: string;
    sort_by_relevance?: string;
    filter_gte?: string;
    brands?: string | string[];
  }) => {
    // Construct the URL dynamically
    const baseUrl = `${process.env.BASE_URL}/v1/products/products`;
    const params = new URLSearchParams();

    if (limit !== undefined) params.append('limit', limit.toString());
    if (page !== undefined) params.append('page', page.toString());
    if (search !== undefined) params.append('search', search);
    if (category !== undefined) params.append('category', category);
    if (brands !== undefined) params.append('brand', brands.toString());
    if (sort_by_price !== undefined) {
      params.append('sort_by_field', 'price');
      params.append('sort_by_dir', sort_by_price);
    } else if (sort_by_relevance !== undefined) {
      params.append('sort_by_field', 'relevance');
      params.append(
        'sort_by_dir',
        sort_by_relevance ? sort_by_relevance : 'desc',
      );
    }
    if (filter_lte !== undefined) params.append('price_lte', filter_lte);
    if (filter_gte !== undefined) params.append('price_gte', filter_gte);
    params.append('status', 'ACTIVE');

    const url = `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;

    try {
      const response = await fetch(url, {
        // next: { revalidate: 60 },
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
      });
      const result = await response.json();
      // console.log(JSON.stringify(result));
      if (result?.success) {
        return result;
      } else throw new Error('failed to fetch products');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const handleGetSingleProduct = async (slug: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/products/products/slug/${slug}`,
      {
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
      },
    );
    const result = await response.json();
    // console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    // console.log(error);
    throw new Error('Failed to fetch product data');
  }
};

export const handleGetBrandProducts = cache(
  async ({
    brandId,
    page,
    limit,
    search,
    category,
    sort_by_price,
    sort_by_relevance,
    filter_lte,
    filter_gte,
    brands,
  }: {
    brandId: string;
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort_by_price?: string;
    filter_lte?: string;
    sort_by_relevance?: string;
    filter_gte?: string;
    brands?: string | string[];
  }) => {
    // Construct the URL dynamically
    const baseUrl = `${process.env.BASE_URL}/v1/brand/brands/${brandId}/products`;
    const params = new URLSearchParams();

    if (limit !== undefined) params.append('limit', limit.toString());
    if (page !== undefined) params.append('page', page.toString());
    if (search !== undefined) params.append('search', search);
    if (category !== undefined) params.append('category', category);
    if (brands !== undefined) params.append('brand', brands.toString());
    if (sort_by_price !== undefined) {
      params.append('sort_by_field', 'price');
      params.append('sort_by_dir', sort_by_price);
    } else if (sort_by_relevance !== undefined) {
      params.append('sort_by_field', 'relevance');
      params.append(
        'sort_by_dir',
        sort_by_relevance ? sort_by_relevance : 'desc',
      );
    }
    if (filter_lte !== undefined) params.append('price_lte', filter_lte);
    if (filter_gte !== undefined) params.append('price_gte', filter_gte);
    params.append('status', 'ACTIVE');

    const url = `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;

    try {
      const response = await fetch(url, {
        // next: { revalidate: 60 },
        headers: {
          'content-type': 'application/json',
        },
      });
      const result = await response.json();
      // console.log(JSON.stringify(result));
      if (result?.success) {
        return result;
      } else throw new Error('failed to fetch products');
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
