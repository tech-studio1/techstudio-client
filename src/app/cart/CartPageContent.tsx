'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHydration } from '@/hooks/use-hydration';

export default function CartPageContent() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const isHydrated = useHydration();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingBag className="size-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some items to your cart to see them here
        </p>
        <Link href="/">
          <Button>
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="md:hidden"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">{isHydrated ? totalItems : 0} items</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearCart}
          disabled={items.length === 0}
        >
          Clear All
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div 
            key={`${item.id}-${item.selectedVariant.color_name}`}
            className="flex gap-4 p-4 border rounded-lg"
          >
            <div className="relative flex size-24 shrink-0 overflow-hidden rounded-md">
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
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
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
                <p className="text-lg font-semibold mt-2">
                  ৳ {item.selectedVariant.compareAtPrice}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedVariant.color_name,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-12 text-center font-medium">
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
                        item.quantity + 1
                      )
                    }
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
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

      {/* Cart Summary - Fixed at bottom on mobile */}
      <div className="sticky bottom-0 bg-background border-t p-4 -mx-4 md:mx-0 md:static md:border md:rounded-lg md:p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({isHydrated ? totalItems : 0} items)</span>
            <span>৳ {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>৳ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/checkout" className="w-full">
            <Button className="w-full" disabled={!isHydrated || totalItems === 0}>
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}