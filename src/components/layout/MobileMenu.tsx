'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, MapPin, Phone, Award, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { CategoryItem } from './CategoryItem';
import { Category } from '@/app/actions/category';

interface MobileMenuProps {
  categories: Category[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MobileMenu = ({ categories, isOpen, onOpenChange }: MobileMenuProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isMenuOpen = isOpen !== undefined ? isOpen : internalOpen;
  const setIsMenuOpen = onOpenChange || setInternalOpen;

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      {/* Only show trigger button if not controlled externally */}
      {isOpen === undefined && (
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="py-2">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="h-full overflow-auto p-6">
          {/* Mobile Navigation */}
          <nav className="space-y-1">
            {/* Mobile Categories */}
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Categories
              </div>

              {categories.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No categories available
                </div>
              ) : (
                categories.map((category: Category, idx: number) => (
                  <CategoryItem
                    key={idx}
                    id={category?.id}
                    slug={category?.slug}
                    title={category?.title}
                    status={category?.status}
                    created_at={category?.created_at}
                    description={category?.description || ''}
                    updated_at={category?.updated_at}
                    setIsOpen={setIsMenuOpen}
                    sub_categories={category?.sub_categories || []}
                  />
                ))
              )}
            </div>

            <Link
              href="/brands"
              className="flex items-center space-x-3 rounded-md p-3 transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <Award className="size-5" />
              <span>Brands</span>
            </Link>
            <Link
              href="/outlets"
              className="flex items-center space-x-3 rounded-md p-3 transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="size-5" />
              <span>Outlets</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-3 rounded-md p-3 transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="size-5" />
              <span>Contact</span>
            </Link>
            <Link
              href="?auth=login"
              className="flex items-center space-x-3 rounded-md p-3 transition-colors hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="size-5" />
              <span>Login</span>
            </Link>

            {/* <Link 
                    
                      href="#" 
                      className="flex items-center space-x-3 p-3 hover:bg-accent rounded-md transition-colors"
                    
                    >
                      <Phone className="size-5 sr-only" />
                      <span className="sr-only">Contact</span>
                    </Link> */}
          </nav>
          <div className="size-24"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
