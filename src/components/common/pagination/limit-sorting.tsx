'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const LimitSorting = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={searchParams.get('limit') || '20'}
      onValueChange={handleLimitChange}
    >
      <SelectTrigger
        className="w-fit p-1 font-semibold"
        aria-label="Items per page"
      >
        <SelectValue placeholder="20" />
      </SelectTrigger>
      <SelectContent className="w-[--radix-select-trigger-width]">
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LimitSorting;
