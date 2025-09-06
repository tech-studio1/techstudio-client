'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { User, Package, Settings, LogOut, Menu, PanelLeft } from 'lucide-react';
import { handleLogOut } from '@/app/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'nextjs-toploader/app';

const navigation = [
  { name: 'Profile', href: '/user/profile', icon: User },
  // { name: 'Orders', href: '/user/orders', icon: Package },
  // { name: 'Manage Account', href: '/user/settings', icon: Settings },
];
const ProfileSidebar = () => {
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const actionLogOut = async () => {
    try {
      const result = await handleLogOut();
      // console.log(result);

      toast({
        title: 'Signed out successfully',
        description: 'You have been securely logged out',
      });
      setIsSheetOpen(false);
      router.push('/');
    } catch (error) {
      setIsSheetOpen(false);
      toast({
        title: 'Signout failed',
        description: 'Unable to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };
  return (
    <>
      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="absolute left-2 top-20 z-50 transition-all duration-300 ease-in-out hover:text-primary md:hidden"
          >
            <PanelLeft className="size-8" />
            <span>Navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader>
            <div className="border-b border-border bg-card p-4">
              <h2 className="text-lg font-bold">Navigation</h2>
            </div>
          </SheetHeader>
          <ScrollArea className="grow">
            <nav className="flex flex-col gap-1 p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className="justify-start gap-2"
                    onClick={() => {
                      router.push(item.href);
                      setIsSheetOpen(false); // Close the sheet after navigation
                    }}
                  >
                    <Icon className="size-5" />
                    {item.name}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                className="mt-auto justify-start gap-2 text-destructive hover:text-destructive"
                onClick={() => actionLogOut()}
              >
                <LogOut className="size-5" />
                Sign out
              </Button>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <div className="hidden flex-col border-r border-border bg-card md:flex md:w-64">
        <ScrollArea className="grow">
          <nav className="flex flex-col gap-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className="justify-start gap-2"
                  onClick={() => router.push(item.href)}
                >
                  <Icon className="size-5" />
                  {item.name}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              className="mt-auto justify-start gap-2 text-destructive hover:text-destructive"
              onClick={() => actionLogOut()}
            >
              <LogOut className="size-5" />
              Sign out
            </Button>
          </nav>
        </ScrollArea>
      </div>
    </>
  );
};

export default ProfileSidebar;
