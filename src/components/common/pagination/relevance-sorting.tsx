'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const RelevanceSorting = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove price sort if exists
    params.delete('sort_by_price');

    if (value === 'Default') {
      params.delete('sort_by_relevance');
    } else {
      params.set('sort_by_relevance', value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const currentSort = searchParams.get('sort_by_relevance');
  const currentValue = currentSort ? currentSort : 'desc';

  return (
    <Select value={currentValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-fit p-1 font-semibold">
        <SelectValue placeholder="Relevance" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Asc</SelectItem>
        <SelectItem value="desc">Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};
