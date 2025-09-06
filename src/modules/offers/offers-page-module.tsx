import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export type Offer = {
  created_at: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  medias: string[];
  updated_at: string;
};

const OfferCard = ({ data }: { data: Offer }) => {
  const medias =
    data && data.medias && data?.medias?.length > 0
      ? data?.medias?.[0]
      : 'https://placehold.co/800x400/svg';
  return (
    <Link href={`/offers/${data?.slug}`}>
      <Card>
        <CardContent className="p-4">
          <picture>
            <img
              src={medias}
              alt={data?.title}
              className="aspect-[16/9] w-full"
            />
          </picture>
        </CardContent>
        <CardFooter>
          <CardTitle>{data?.title}</CardTitle>
        </CardFooter>
      </Card>
    </Link>
  );
};

const OffersPageModule = ({ data }: { data: Offer[] }) => {
  return (
    <div className="my-10 grid size-full min-h-96 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.length > 0 &&
        data?.map((i) => <OfferCard key={i?.id} data={i} />)}
    </div>
  );
};

export default OffersPageModule;
