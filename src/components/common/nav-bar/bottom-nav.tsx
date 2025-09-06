'use client';

import * as React from 'react';
import { CategoriesMenu } from './CategoriesMenu';
import { NavigationMenus } from './navigation-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { handleLogOut } from '@/app/actions/auth';
import { useRouter } from 'nextjs-toploader/app';
import { useToast } from '@/hooks/use-toast';

export function BottomNav({ data }: { data: any }) {
  // console.log(isLoggedIn);
  const isLoggedIn = false;
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

      router.push('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'signout failed',
        description: 'Unable to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <nav className="w-full bg-primary">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex justify-between px-2 pt-2 2xl:px-0">
          <CategoriesMenu data={data} />
          <NavigationMenus />
          {/* {isLoggedIn === true ? (
            <Button
              variant={'secondary'}
              className="rounded-none font-semibold"
              onClick={actionLogOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant={'secondary'}
              className="rounded-none font-semibold"
              asChild
            >
              <Link href={'/login'}>Sign in</Link>
            </Button>
          )} */}
        </div>
      </div>
    </nav>
  );
}
