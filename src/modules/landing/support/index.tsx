import React from 'react';
import support from '@/utils/support.json';
import { cn } from '@/lib/utils';

export const Support = () => {
  return (
    <section className="mb-10 mt-4 grid grid-cols-2 place-items-center gap-x-2 gap-y-10 xl:grid-cols-4">
      {support?.map((i, idx) => (
        <div
          key={idx}
          className={cn(
            'flex max-w-64 flex-col items-center justify-center',
            (idx === 1 || idx === 2) && 'mt-0 xl:mt-6',
          )}
        >
          <picture>
            <img src={i?.image} alt={i?.title} className="size-14" />
          </picture>
          <h5 className="mb-6 mt-2 text-center font-bold">{i?.title}</h5>
          <p className="text-center text-gray-600">{i?.description}</p>
        </div>
      ))}
    </section>
  );
};
