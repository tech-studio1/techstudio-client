'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, ShoppingCart, User, Grid3x3, Gift } from 'lucide-react';
import { Session } from 'next-auth';
import { useCart } from '@/context/cart-context';
import { useHydration } from '@/hooks/use-hydration';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { Category } from '@/app/actions/category';

const bottomNavItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/categories',
    icon: Grid3x3,
    label: 'Categories',
  },
  {
    href: '/offers',
    icon: Gift,
    label: 'Offers',
  },
  {
    href: '/cart',
    icon: ShoppingCart,
    label: 'Cart',
  },
];

interface BottomNavigationProps {
  session: Session | null;
  userData: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
  } | null;
  categories: Category[];
}

export default function BottomNavigation({ session, userData, categories }: BottomNavigationProps) {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const isHydrated = useHydration();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Create dynamic nav items based on auth state
  const navItems = [
    ...bottomNavItems.slice(0, 3), // Home, Categories, Offers
    {
      href: '/cart',
      icon: ShoppingCart,
      label: 'Cart',
    },
    {
      href: session?.user && userData ? '/user/profile' : '?auth=login',
      icon: User,
      label: session?.user && userData ? 'Profile' : 'Login',
    },
  ];

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-white md:hidden"
        // style={{
        //   paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
        // }}
      >
        <div className="grid min-h-16 grid-cols-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            // Special handling for Categories button
            if (item.href === '/categories') {
              return (
                <button
                  key="categories"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className={`relative flex flex-col items-center justify-center px-1 py-2 transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'text-primary'
                      : 'text-gray-400 hover:text-gray-600 active:bg-gray-50'
                  }`}
                >
                  {/* Active Background */}
                  {isActive && (
                    <div className="absolute inset-0 mx-2 rounded-lg bg-primary/5" />
                  )}

                  {/* Icon */}
                  <div className="relative">
                    <Icon
                      className={`size-6 transition-all duration-200 ${
                        isActive ? 'scale-110' : ''
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-1 text-xs transition-all duration-200 ${
                      isActive ? 'font-semibold' : 'font-medium'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-1/2 top-0 h-1 w-8 -translate-x-1/2 rounded-b-full bg-primary" />
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center px-1 py-2 transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-600 active:bg-gray-50'
                }`}
              >
                {/* Active Background */}
                {isActive && (
                  <div className="absolute inset-0 mx-2 rounded-lg bg-primary/5" />
                )}

                {/* Icon with badge effect */}
                <div className="relative">
                  <Icon
                    className={`size-6 transition-all duration-200 ${
                      isActive ? 'scale-110' : ''
                    }`}
                  />
                  {/* Badge for cart with real cart count */}
                  {item.href === '/cart' && isHydrated && totalItems > 0 && (
                    <div className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {totalItems}
                    </div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-1 text-xs transition-all duration-200 ${
                    isActive ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-1/2 top-0 h-1 w-8 -translate-x-1/2 rounded-b-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu 
        categories={categories} 
        isOpen={isMobileMenuOpen} 
        onOpenChange={setIsMobileMenuOpen} 
      />
    </>
  );
}
