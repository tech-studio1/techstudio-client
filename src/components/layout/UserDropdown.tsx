'use client';

import { User, LogOut, Package, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { handleLogOut } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

interface UserDropdownProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    created_at: string;
    updated_at: string;
    mobile?: {
      country_code: string;
      formatted_number: string;
      is_primary: true;
      mobile: string;
    }[];
  };
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      await handleLogOut();
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const displayName =
    user.full_name || `${user.first_name} ${user.last_name}` || 'User';

  const initials =
    user.first_name && user.last_name
      ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
      : displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Mobile: {user?.mobile?.[0]?.formatted_number || 'N/A'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="flex items-center">
            <UserCircle className="mr-2 size-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href="/user/orders" className="flex items-center">
            <Package className="mr-2 size-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleLogoutClick}
        >
          <LogOut className="mr-2 size-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
