// 'use client';

import { ShoppingBag, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-background p-4 py-14">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <ShoppingBag className="size-24 animate-bounce text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground">
            Oops! The page you&apos;re looking for seems to have gone shopping
            elsewhere.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="mr-2 size-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Need help? Contact our{' '}
          <Link
            href="/customer-support"
            className="text-primary hover:underline"
          >
            customer support
          </Link>
        </p>
      </div>
    </div>
  );
}
