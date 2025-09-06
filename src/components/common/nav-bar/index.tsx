'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import TopLinks from './top-links';
import MainNav from './main-nav';
import { BottomNav } from './bottom-nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { handleGetCategoryTree } from '@/app/actions/category';

const Navbar: React.FC<any> = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await handleGetCategoryTree();
        setCategories(result);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  // console.log(memoizedCategories);
  const path = usePathname();
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const updateNavbarHeight = () => {
      // Now TypeScript knows navbar is an HTMLElement
      document.documentElement.style.setProperty(
        '--navbar-height',
        `${navbar.offsetHeight}px`,
      );
    };

    const resizeObserver = new ResizeObserver(updateNavbarHeight);
    resizeObserver.observe(navbar);

    return () => {
      resizeObserver.unobserve(navbar);
      document.documentElement.style.removeProperty('--navbar-height');
    };
  }, []);

  return (
    <header
      ref={navbarRef}
      className={cn(
        'sticky top-0 z-50 hidden bg-white shadow-md transition-all duration-500 ease-in-out xl:block',
        (path === '/login' ||
          path === '/signup' ||
          path === '/account_verification' ||
          path === '/forgot-password' ||
          path.includes('/account-verification')) &&
          'xl:hidden',
      )}
    >
      <TopLinks />
      <MainNav />
      <BottomNav data={memoizedCategories} />
    </header>
  );
};

export default Navbar;
