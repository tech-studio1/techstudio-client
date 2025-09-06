'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import PriceFilter from './price-filter';
import BrandsFilter from './brands-filter';
import IdealFilter from './ideal-filter';
import { usePathname } from 'next/navigation';

export function MobileFilter() {
  const path = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <SlidersHorizontal className="size-4" />
          <span>Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <div className="border-b px-2 py-4 font-semibold text-gray-500">
          Filters
        </div>
        <PriceFilter />
        {!path?.startsWith('/brands/') && <BrandsFilter />}
        {/* <IdealFilter /> */}
      </SheetContent>
    </Sheet>
  );
}
