'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, PackageSearch } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
            <PackageSearch className="size-10 text-muted-foreground" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            No orders yet
          </h3>

          <p className="mb-6 max-w-md text-sm text-muted-foreground">
            You haven&apos;t placed any orders yet. Start shopping to see your
            orders here.
          </p>

          <Link href="/">
            <Button className="gap-2">
              <ShoppingBag className="size-4" />
              Start Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
