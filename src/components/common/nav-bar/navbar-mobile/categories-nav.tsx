'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronsUpDown, LogOut, Menu, Triangle } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { categories } from '../categoryData';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { handleGetCategoryTree } from '@/app/actions/category';
import { CategoryItem } from '../CategoryItem';
import { useRouter } from 'nextjs-toploader/app';
import { useToast } from '@/hooks/use-toast';
import { handleLogOut, isUserLoggedIn } from '@/app/actions/auth';

interface CategoryItemProps {
  created_at: string;
  description: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
  sub_categories?: CategoryItemProps[];
}
const CategoriesNavMobile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
  const router = useRouter();
  const { toast } = useToast();
  const actionLogOut = async () => {
    try {
      const result = await handleLogOut();
      // console.log(result);

      toast({
        title: 'Signed out successfully',
        description: 'You have been securely logged out',
      });
      setIsOpen(false);
      router.push('/');
    } catch (error) {
      setIsOpen(false);
      toast({
        title: 'signout failed',
        description: 'Unable to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };
  useEffect(() => {
    const getStatus = async () => {
      const result = await isUserLoggedIn();
      setIsLoggedIn(result);
    };
    getStatus();
  }, [isOpen]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'} className="h-full overflow-auto p-0">
        <SheetHeader className="mt-4">
          <div className="mb-4 ml-2">
            <picture>
              <img src="/FullBlack.svg" alt="" className="h-auto w-40" />
            </picture>
          </div>
          <SheetTitle className="">Categories</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col justify-between space-y-2 p-2">
          {memoizedCategories.map(
            (category: CategoryItemProps, idx: number) => (
              <CategoryItem
                key={idx}
                id={category.id}
                slug={category.slug}
                title={category.title}
                status={category.status}
                created_at={category.created_at}
                description={category.description}
                updated_at={category.updated_at}
                setIsOpen={setIsOpen}
                sub_categories={category?.sub_categories}
              />
            ),
          )}
          {/* {categories.map((i, idx) => (
            <Collapsible key={idx}>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-gray-500">
                <span>{i?.name}</span>
                <span>
                  <ChevronsUpDown className="size-4" />
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {i?.sub_categories.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    className="p-4 transition-colors duration-200 hover:bg-gray-50"
                  >
                    <h3 className="mb-2 font-semibold text-gray-800">
                      {subCategory.name}
                    </h3>
                    <ul className="space-y-1">
                      {subCategory.items.map((item, index) => (
                        <li
                          key={index}
                          className="cursor-pointer text-sm text-gray-600 transition-colors duration-200 hover:text-blue-600"
                        >
                          <Link
                            href={`/categories/${item.replace(' ', '-').toLowerCase()}`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))} */}

          <div className="flex flex-col space-y-2">
            <h3 className="my-4 text-center font-bold">Hot Links</h3>
            {/* <Link href={'/user/profile'}>Profile</Link> */}
            {/* <Link href={'/user/orders'}>Order</Link> */}
            <Link href={'/offers'} onClick={() => setIsOpen(false)}>
              Offers
            </Link>
            <Link href={'/brands'} onClick={() => setIsOpen(false)}>
              Brands
            </Link>
            <Link href={'/outlets'} onClick={() => setIsOpen(false)}>
              Outlets
            </Link>
            {/* <Link href={'/about'} onClick={() => setIsOpen(false)}>
              About US
            </Link> */}
            <Link href={'/contact'} onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
            {/* <Link href={'/retail-request'}>Retail Request</Link> */}
            {/* <Link href={'/submit-ticket'} onClick={() => setIsOpen(false)}>
              Submit Ticket
            </Link> */}
          </div>

          <div className="flex flex-col space-y-2 pb-10">
            <h3 className="my-4 text-center font-bold">Policy</h3>
            <Link href={'/terms'} onClick={() => setIsOpen(false)}>
              Terms of Service
            </Link>
            <Link href={'/privacy-policy'} onClick={() => setIsOpen(false)}>
              Privacy Policy
            </Link>
            <Link href={'/refund-policy'} onClick={() => setIsOpen(false)}>
              Refund Policy
            </Link>
            {/* <Link href={'/emi-policy'} onClick={() => setIsOpen(false)}>EMI Policy</Link> */}
          </div>
        </nav>
        {isLoggedIn && (
          <Button
            variant="ghost"
            className="mt-auto justify-start gap-2 pb-4 text-destructive hover:text-destructive"
            onClick={() => actionLogOut()}
          >
            <LogOut className="size-5" />
            Sign out
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesNavMobile;
