'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { handleGetBrands } from '@/app/actions/brands';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Brand = {
  created_at: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  medias: string[];
  updated_at: string;
};

const BrandsFilter = () => {
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Default open
  const [initialLoad, setInitialLoad] = useState(true);

  // Directly derive selected brands from search params
  const selectedBrands = useMemo(
    () => searchParams.get('brands')?.toLowerCase().split(',') || [],
    [searchParams],
  );

  // Fetch brands once on mount with cleanup
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const loadBrands = async () => {
      try {
        const data = await handleGetBrands();
        if (isMounted && data) {
          setBrandData(data?.data);
          setInitialLoad(false);
        }
      } catch (error) {
        console.error('Brands fetch error:', error);
        if (isMounted) setInitialLoad(false);
      }
    };

    loadBrands();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  // Immediate URL update without debounce
  const updateSelectedBrands = useCallback(
    (newBrands: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newBrands.length > 0) {
        params.set('brands', newBrands.join(','));
      } else {
        params.delete('brands');
      }

      params.delete('page');
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // Optimized brand toggle handler
  const handleBrandToggle = useCallback(
    (brandTitle: string) => {
      const lowerTitle = brandTitle.toLowerCase();
      const newBrands = selectedBrands.includes(lowerTitle)
        ? selectedBrands.filter((title) => title !== lowerTitle)
        : [...selectedBrands, lowerTitle];

      updateSelectedBrands(newBrands);
    },
    [selectedBrands, updateSelectedBrands],
  );

  // Memoized brand list rendering
  const brandsList = useMemo(() => {
    if (initialLoad) return null; // Defer rendering until initial load

    return brandData.map((brand) => {
      const isSelected = selectedBrands.includes(brand.title.toLowerCase());
      return (
        <div
          key={brand.id}
          className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-gray-100"
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => handleBrandToggle(brand.title)}
            id={brand.id}
          />
          <label
            htmlFor={brand.id}
            className="cursor-pointer text-xs font-medium leading-none"
          >
            {brand.title}
          </label>
        </div>
      );
    });
  }, [brandData, selectedBrands, handleBrandToggle, initialLoad]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-b p-2 font-semibold text-gray-500 hover:text-black">
        <span>Brands</span>
        <ChevronDown
          className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2">
        <div className="flex flex-col items-start space-y-2">
          {initialLoad ? (
            <div className="text-sm text-gray-500">Loading brands...</div>
          ) : brandsList?.length ? (
            brandsList
          ) : (
            <div className="text-sm text-gray-500">No brands available</div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BrandsFilter;
