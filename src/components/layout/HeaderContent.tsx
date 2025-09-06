'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ShoppingCart,
  User,
  Tag,
  FileText,
  MapPin,
  Phone,
  Award,
  Gift,
  CircleUserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import { Category } from '@/app/actions/category';
import SearchFromNav from '../common/nav-bar/search-from-nav';
import { handleGetProducts } from '@/app/actions/products';
import { CartSheet } from '../common/cart/cart-sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import UserDropdown from './UserDropdown';
import { Session } from 'next-auth';
import SearchNav from '../common/nav-bar/navbar-mobile/search-nav';

interface HeaderContentProps {
  categories: Category[];
  session: Session | null;
  userData: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
  } | null;
}

export default function HeaderContent({
  categories,
  session,
  userData,
}: HeaderContentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="">
        {/* Main Header */}
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="TechStudio Logo"
              width={120}
              height={40}
              className="h-full w-52"
            />
          </Link>

          {/* Desktop Search */}
          <div className="mx-8 hidden max-w-2xl flex-1 md:flex">
            <SearchFromNav handleGetProducts={handleGetProducts} />
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/offers">
                    <Gift className="animate-pulse-scale cursor-pointer text-red-600 duration-1000 hover:text-primary" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-primary p-1 text-xs text-white">
                  <p>Offers</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CartSheet />

            {session?.user && userData ? (
              <UserDropdown user={userData} />
            ) : (
              <Link
                href="?auth=login"
                className="flex items-center text-sm font-semibold text-primary"
              >
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <SearchNav handleGetProducts={handleGetProducts} />
            {/* <Button variant="ghost" size="sm" asChild className="text-gray-600">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </Button> */}
            <MobileMenu categories={categories} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden bg-primary md:block">
          <div className="container mx-auto max-w-6xl px-4 xl:px-0">
            <nav className="flex h-16 items-center justify-between">
              {/* Categories on Left */}
              {/* <ClientCategoryMenu categories={categories} /> */}
              <DesktopMenu categories={categories} />

              {/* Other Links on Right */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/offers"
                  className="flex items-center space-x-1 text-sm text-primary-foreground transition-colors hover:text-accent"
                >
                  <Gift className="size-4" />
                  <span>Offers</span>
                </Link>
                <Link
                  href="/brands"
                  className="flex items-center space-x-1 text-sm text-primary-foreground transition-colors hover:text-accent"
                >
                  <Award className="size-4" />
                  <span>Brands</span>
                </Link>
                <Link
                  href="/outlets"
                  className="flex items-center space-x-1 text-sm text-primary-foreground transition-colors hover:text-accent"
                >
                  <MapPin className="size-4" />
                  <span>Outlets</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center space-x-1 text-sm text-primary-foreground transition-colors hover:text-accent"
                >
                  <Phone className="size-4" />
                  <span>Contact</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
