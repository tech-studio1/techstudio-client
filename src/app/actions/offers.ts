'use server';

import { cache } from 'react';

export const handleGetOffers = cache(async () => {
  const uri = `${process.env.BASE_URL}/v1/offer/offers?limit=100&status=ACTIVE`;
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

export const handleGetOfferFromSlug = cache(async (slug: string) => {
  const uri = `${process.env.BASE_URL}/v1/offer/offers/slug/${slug}`;
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
