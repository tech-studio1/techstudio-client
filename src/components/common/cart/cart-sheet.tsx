'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShoppingCartIcon,
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { useState } from 'react';
import { useCartSheet } from '@/context/cart-sheet-context';
import { useRouter } from 'nextjs-toploader/app';
import { useHydration } from '@/hooks/use-hydration';

export function CartSheet() {
  const { isOpen, openCart, closeCart } = useCartSheet();
  const router = useRouter();
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const isHydrated = useHydration();

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeCart();
        }
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger id="cart" onClick={openCart}>
              <div className="relative">
                <ShoppingCartIcon className="transition-all duration-300 ease-in-out hover:text-primary" />
                {isHydrated && totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-primary p-1 text-xs text-white">
            <p>Cart</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({isHydrated ? totalItems : 0} items)</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedVariant.color_name}`}
              className="flex gap-4 border-b py-4 last:border-0"
            >
              <div className="relative flex size-20 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={
                    item?.selectedVariant &&
                    item?.selectedVariant.medias &&
                    item?.selectedVariant.medias.length > 0
                      ? item?.selectedVariant?.medias[0]
                      : item?.medias && item?.medias.length > 0
                        ? item.medias[0]
                        : '/product_place_holder.gif'
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="font-medium">{item.title}</h3>
                {item.selectedVariant && (
                  <div className="mt-1 flex items-center gap-2">
                    <div
                      className="size-4 rounded-full border"
                      style={{
                        backgroundColor: item.selectedVariant.color_code,
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.selectedVariant.color_name}
                    </span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  ৳ {item.selectedVariant.compareAtPrice}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedVariant.color_name,
                        Math.max(1, item.quantity - 1),
                      )
                    }
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedVariant.color_name,
                        item.quantity + 1,
                      )
                    }
                  >
                    <Plus className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto size-8"
                    onClick={() =>
                      removeFromCart(item.id, item.selectedVariant.color_name)
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>৳ {totalPrice.toFixed(2)}</span>
          </div>

          <Button
            id="checkout"
            disabled={!isHydrated || totalItems === 0}
            className="mt-4 w-full"
            size="lg"
            onClick={() => {
              router.push('/checkout');
              closeCart();
            }}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
