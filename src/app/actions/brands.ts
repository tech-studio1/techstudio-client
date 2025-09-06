'use server';

import { cache } from 'react';

export const handleGetBrands = cache(async () => {
  const uri = `${process.env.BASE_URL}/v1/brand/brands?limit=100&status=ACTIVE`;
  try {
    const response = await fetch(uri, {
      cache: 'no-cache',
      // next: { revalidate: 60 },
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
});

export const handleGetBrandFromSlug = cache(async (slug: string) => {
  const uri = `${process.env.BASE_URL}/v1/brand/brands/slug/${slug}`;
  try {
    const response = await fetch(uri, {
      cache: 'no-cache',
      // next: { revalidate: 60 },
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
});
