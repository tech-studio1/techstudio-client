'use client';
import Link from 'next/link';
import { CartSheet } from '../cart/cart-sheet';

import SearchFromNav from './search-from-nav';
import { handleGetProducts } from '@/app/actions/products';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User } from 'lucide-react';
const MainNav = () => {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-4">
      <Link href={'/'} className="ml-6 antialiased">
        <picture>
          <img src="/FullBlack.svg" alt="logo" className="h-full w-64" />
        </picture>
      </Link>
      <SearchFromNav handleGetProducts={handleGetProducts} />
      <div className="flex items-center gap-4">
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={'/wishlist'} className="hover:text-primary">
                <Heart />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-1 text-xs text-white">
              <p>Wishlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={'/user/profile'} className="hover:text-primary">
                <User />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-primary p-1 text-xs text-white">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <CartSheet />
      </div>
    </nav>
  );
};

export default MainNav;
