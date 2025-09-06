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

// Updated Price Sorting Component
export const PriceSorting = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove relevance sort if exists
    params.delete('sort_by_relevance');

    if (value === 'Default') {
      params.delete('sort_by_price');
    } else {
      params.set('sort_by_price', value === 'Low' ? 'asc' : 'desc');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const currentSort = searchParams.get('sort_by_price');
  const currentValue =
    currentSort === 'asc' ? 'Low' : currentSort === 'desc' ? 'High' : 'Default';

  return (
    <Select value={currentValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[95px] p-1 font-semibold">
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Default">Default</SelectItem>
        <SelectItem value="Low">Low &gt; High</SelectItem>
        <SelectItem value="High">High &gt; Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
