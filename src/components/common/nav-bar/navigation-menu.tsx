'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const menu: { title: string; href: string; description: string }[] = [
  {
    title: 'Offers',
    href: '/offers',
    description: 'Get exciting offers',
  },
  {
    title: 'Brands',
    href: '/brands',
    description: 'Explore the brands we offer and partner with.',
  },
  // {
  //   title: 'Categories',
  //   href: '/categories',
  //   description: 'Browse our wide range of product categories.',
  // },
  {
    title: 'Outlets',
    href: '/outlets',
    description: 'Discover discounted products and special offers.',
  },
  {
    title: 'Contact Us',
    href: '/contact',
    description: 'Get in touch with us for inquiries and support.',
  },
];
export function NavigationMenus() {
  return (
    <NavigationMenu className="pb-2">
      <NavigationMenuList>
        {menu?.map((i, idx) => (
          <NavigationMenuItem key={idx}>
            <Link href={i?.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent font-bold text-gray-200 hover:text-primary-foreground',
                )}
              >
                {i?.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
