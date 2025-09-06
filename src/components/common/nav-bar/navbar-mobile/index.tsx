'use client';
import React, { useEffect, useRef } from 'react';
import SearchNav from './search-nav';
import CategoriesNavMobile from './categories-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CartSheet } from '../../cart/cart-sheet';
import { handleGetProducts } from '@/app/actions/products';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User } from 'lucide-react';

const NavbarMobile = () => {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const updateNavbarHeight = () => {
      // Now TypeScript knows navbar is an HTMLElement
      document.documentElement.style.setProperty(
        '--navbar-mobile-height',
        `${navbar.offsetHeight}px`,
      );
    };

    const resizeObserver = new ResizeObserver(updateNavbarHeight);
    resizeObserver.observe(navbar);

    return () => {
      resizeObserver.unobserve(navbar);
      document.documentElement.style.removeProperty('--navbar-mobile-height');
    };
  }, []);

  const path = usePathname();
  return (
    <nav
      ref={navbarRef}
      className={cn(
        'sticky top-0 z-50 bg-white px-2 py-4 drop-shadow-lg xl:hidden',
        (path === '/login' ||
          path === '/signup' ||
          path === '/account-verification' ||
          path === '/forgot-password' ||
          path.includes('/account-verification')) &&
          'hidden',
      )}
    >
      <div className="flex items-center justify-between">
        <CategoriesNavMobile />
        <Link href={'/'} className="antialiased">
          <picture>
            <img src="/FullBlack.svg" alt="logo" className="h-full w-44" />
          </picture>
        </Link>
        <div className="flex items-center gap-2">
          <SearchNav handleGetProducts={handleGetProducts} />
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
      </div>
    </nav>
  );
};

export default NavbarMobile;
