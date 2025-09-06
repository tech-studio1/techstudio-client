'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MAX_PRICE = 100000;

const PriceFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);

  // Initialize and sync state from URL parameters
  const initialMin = parseInt(searchParams.get('filter_gte') || '0');
  const initialMax = parseInt(
    searchParams.get('filter_lte') || MAX_PRICE.toString(),
  );
  const [range, setRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);

  const [debouncedRange] = useDebounce(range, 500);

  // Sync state with URL parameters
  useEffect(() => {
    const newGte = parseInt(searchParams.get('filter_gte') || '0');
    const newLte = parseInt(
      searchParams.get('filter_lte') || MAX_PRICE.toString(),
    );
    setRange([newGte, newLte]);
  }, [searchParams]);

  // Update URL when debounced range changes
  useEffect(() => {
    const currentGte = parseInt(searchParams.get('filter_gte') || '0');
    const currentLte = parseInt(
      searchParams.get('filter_lte') || MAX_PRICE.toString(),
    );

    // Avoid unnecessary updates
    if (debouncedRange[0] === currentGte && debouncedRange[1] === currentLte)
      return;

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedRange[0] > 0) {
      params.set('filter_gte', debouncedRange[0].toString());
    } else {
      params.delete('filter_gte');
    }

    if (debouncedRange[1] < MAX_PRICE) {
      params.set('filter_lte', debouncedRange[1].toString());
    } else {
      params.delete('filter_lte');
    }

    // Only reset pagination if filter changes
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedRange, router, searchParams]);

  const handleSliderChange = (value: [number, number]) => {
    setRange(value);
  };

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numericValue = Math.min(MAX_PRICE, Math.max(0, Number(value) || 0));

    setRange((prev) => {
      if (type === 'min') {
        return [Math.min(numericValue, prev[1]), prev[1]];
      }
      return [prev[0], Math.max(numericValue, prev[0])];
    });
  };

  const toggleCollapsible = () => setIsOpen((prev) => !prev);

  return (
    <Collapsible open={isOpen} onOpenChange={toggleCollapsible}>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-2 text-sm font-medium text-gray-600 hover:text-black">
        <span>Price</span>
        <ChevronDown
          className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2 pb-2">
        <div className="space-y-3">
          <Slider
            value={range}
            onValueChange={handleSliderChange}
            min={0}
            max={MAX_PRICE}
            step={1000}
            className="w-full"
          />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Min</label>
              <Input
                type="number"
                value={range[0]}
                onChange={(e) => handleInputChange('min', e.target.value)}
                className="h-8 px-2 py-1 text-xs"
                min={0}
                max={range[1]}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Max</label>
              <Input
                type="number"
                value={range[1]}
                onChange={(e) => handleInputChange('max', e.target.value)}
                className="h-8 px-2 py-1 text-xs"
                min={range[0]}
                max={MAX_PRICE}
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PriceFilter;
