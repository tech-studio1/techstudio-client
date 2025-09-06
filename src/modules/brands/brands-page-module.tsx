import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type Brand = {
  created_at: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  medias: string[];
  updated_at: string;
};

const BrandCard = ({ data }: { data: Brand }) => {
  const medias =
    data && data.medias && data?.medias?.length > 0
      ? data?.medias?.[0]
      : 'https://placehold.co/800x400/svg';
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="size-full">
          <Link href={`/brands/${data?.slug}`} className="size-full">
            <Card className="size-full rounded-3xl transition-all duration-500 ease-in-out hover:shadow-lg">
              <CardContent className="flex size-full grow items-center justify-center pb-0">
                <div className="py-10">
                  <picture>
                    <img
                      src={medias}
                      alt={data?.title}
                      className="h-full w-20"
                    />
                  </picture>
                </div>
              </CardContent>
            </Card>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{data?.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const BrandsPageModule = ({ data }: { data: Brand[] }) => {
  return (
    <div className="my-10 grid size-full grid-cols-3 place-items-center gap-2 px-2 lg:grid-cols-6">
      {data &&
        data.length > 0 &&
        data?.map((i) => <BrandCard key={i?.id} data={i} />)}
    </div>
  );
};

export default BrandsPageModule;
