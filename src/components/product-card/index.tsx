'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import Rating from '../common/rating';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { FaCartPlus } from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Product, Variant } from '@/lib/product-types';
import { useCartSheet } from '@/context/cart-sheet-context';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

const ProductCard = ({ data }: { data: Product }) => {
  const path = usePathname();
  const { openCart } = useCartSheet();
  const { addToCart, items, updateQuantity } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    data?.variants?.[0] || {
      color_code: '#000000',
      color_name: 'Default',
      price: 0,
      compareAtPrice: 0,
      costPerItem: 0,
      medias: [],
      quantity: 0,
      sku: '',
    },
  );

  // Helper function to get current price values
  const getCurrentPrices = () => {
    return selectedVariant
      ? {
          price: Math.round(Number(selectedVariant.price)),
          compareAtPrice: Math.round(selectedVariant.compareAtPrice),
        }
      : {
          price: Math.round(data.pricing.price),
          compareAtPrice: Math.round(data.pricing.compareAtPrice),
        };
  };

  // const { price, compareAtPrice } = getCurrentPrices();
  const { price, compareAtPrice } = useMemo(() => {
    const base = data?.pricing || { price: 0, compareAtPrice: 0 };
    return selectedVariant
      ? {
          price: Math.max(0, selectedVariant.price),
          compareAtPrice: Math.max(0, selectedVariant.compareAtPrice),
        }
      : {
          price: Math.max(0, base.price),
          compareAtPrice: Math.max(0, base.compareAtPrice),
        };
  }, [selectedVariant, data]);
  const cartItem = items.find(
    (item) =>
      item.id === data.id &&
      item.selectedVariant.color_name === selectedVariant.color_name,
  );

  const handleAddToCart = () => {
    addToCart({ ...data, selectedVariant }, 1);
    openCart();
  };

  const handleUpdateQuantity = (increment: boolean) => {
    if (!cartItem) return;

    const newQuantity = increment
      ? cartItem.quantity + 1
      : Math.max(1, cartItem.quantity - 1);

    updateQuantity(data.id, selectedVariant.color_name, newQuantity);
    openCart();
  };

  const discountPercentage = Math.round(
    ((price - compareAtPrice) / price) * 100,
  );

  useEffect(() => {
    setSelectedVariant(data?.variants?.[0]);
  }, [data?.variants, path]);
  return (
    <div className="relative w-full overflow-hidden rounded bg-white shadow hover:shadow-lg">
      <picture>
        <img
          key={selectedVariant.color_name}
          src={
            // 1. Check selected variant medias
            selectedVariant?.medias && selectedVariant.medias.length > 0
              ? selectedVariant.medias[0]
              : // 2. Check first variant medias
                data?.variants?.[0]?.medias &&
                  data.variants[0].medias.length > 0
                ? data.variants[0].medias[0]
                : // 3. Check second variant medias
                  data?.variants?.[1]?.medias &&
                    data.variants[1].medias.length > 0
                  ? data.variants[1].medias[0]
                  : // 4. Check product medias
                    data?.medias && data.medias.length > 0
                    ? data.medias[0]
                    : // 5. Fallback to placeholder
                      '/product_place_holder.gif'
          }
          alt={data?.title}
          className="h-[172px] w-full lg:h-[160px] xl:h-[185px]"
        />
      </picture>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`/product/${data?.slug}`}
              className="line-clamp-1 px-2 pt-2 text-start text-sm font-bold capitalize hover:text-primary"
            >
              {data?.title?.toLowerCase()}
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className="capitalize">{data?.title?.toLowerCase()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="w-full">
        <div className="flex items-center gap-2 px-2">
          {data?.status === 'ACTIVE' ? (
            <>
              {compareAtPrice !== price && compareAtPrice < price && (
                <p className="text-sm font-bold">৳ {compareAtPrice}</p>
              )}
              <p
                className={cn(
                  'text-sm font-bold',
                  compareAtPrice !== price &&
                    compareAtPrice < price &&
                    'text-gray-400 line-through',
                )}
              >
                ৳ {price}
              </p>
            </>
          ) : data?.status === 'coming soon' ? (
            <p className={cn('text-sm font-bold text-primary')}>Coming Soon</p>
          ) : (
            <p className={cn('text-sm font-bold text-gray-400')}>
              Out of Stock
            </p>
          )}
        </div>

        {/* Variant Selection */}
        <div className="px-2 pt-1">
          <p className="mb-2 text-xs text-gray-500">Select Color:</p>
          <div className="flex flex-wrap gap-2">
            {data.variants.map((variant, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={cn(
                        'h-6 w-6 cursor-pointer rounded-full border-2',
                        // Compare by color name instead of object reference
                        selectedVariant.color_name === variant.color_name
                          ? 'border-primary' // Selected state
                          : 'border-gray-300', // Default border for visibility
                      )}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <div
                        className="size-full rounded-full"
                        style={{
                          backgroundColor: variant.color_code,
                          // Add inner border for white variants
                          ...(variant.color_code.toLowerCase() ===
                            '#ffffff' && {
                            border: '1px solid #e5e7eb',
                            boxSizing: 'border-box',
                          }),
                        }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{variant.color_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-between p-2">
          <Rating rate={5} />
          {data && data?.status === 'ACTIVE' && (
            <div className="flex items-center gap-2 pr-1">
              {cartItem ? (
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger id="product-card-to-cart">
                        <FaCartPlus
                          onClick={() => handleUpdateQuantity(true)}
                          className="size-5 text-primary hover:text-secondary"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add More</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger id="add-more-product-card-to-cart">
                      <ShoppingCart
                        onClick={handleAddToCart}
                        className="size-5 text-primary hover:text-secondary"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-primary p-1 text-xs text-white">
                      <p>Add to Cart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </div>
      </div>
      {compareAtPrice !== price && compareAtPrice < price && (
        <div className="absolute left-2 top-2 rounded-md bg-primary p-2 text-xs font-bold text-white">
          {discountPercentage}% off
        </div>
      )}
    </div>
  );
};

export default ProductCard;
