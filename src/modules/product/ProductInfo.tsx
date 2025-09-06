'use client';
import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Product, Variant } from '@/lib/product-types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCartSheet } from '@/context/cart-sheet-context';
import FeatureList from './products-features';
import { MdAddShoppingCart } from 'react-icons/md';
import { useRouter } from 'nextjs-toploader/app';
import { Button } from '@/components/ui/button';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RiMessengerLine } from 'react-icons/ri';
interface ProductInfoProps {
  product: Product;
  selectedVariant: Variant;
  setSelectedVariant: (variant: Variant) => void;
}

export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
}: ProductInfoProps) {
  const router = useRouter();
  const { openCart } = useCartSheet();
  const { addToCart, clearCart } = useCart();
  const { toast } = useToast();
  // console.log(product);
  // Create a default variant if variants array is empty
  const defaultVariant = {
    color_code: '',
    color_name: 'Default',
    compareAtPrice: product?.pricing?.compareAtPrice || 0,
    costPerItem: product?.pricing?.price || 0,
    price: product?.pricing?.price || 0,
    quantity: 1,
    sku: '',
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedVariant }, 1);
    openCart();
    // toast({ description: `${product?.title} added to cart` });
  };
  const handleBuyNow = () => {
    clearCart();
    addToCart({ ...product, selectedVariant }, 1);
    router.push('/checkout');
    // toast({ description: `${product?.title} added to cart` });
  };
  const handleWhatsApp = () => {
    // Construct the product URL
    const productUri = `https://www.techstudio.com.bd/product/${product?.slug}`;

    // Define a structured preset message using template literals
    const message = encodeURIComponent(
      `Hello,
  
  I would like to enquire about the following product:
  ${productUri}
  
  Could you please provide more details?
  
  Thank you!`,
    );

    // WhatsApp phone number
    const phoneNumber = '1670957108';

    // Construct the WhatsApp URL with the structured message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappURL, '_blank');
  };

  const handleMessenger = () => {
    // Construct the product URL
    const productUri = `https://www.techstudio.com.bd/product/${product?.slug}`;

    // Encode the pre-filled message
    const message = encodeURIComponent(
      `Product Inquiry: ${productUri}`, // Removed newline for better URL encoding
    );

    // Use the 'text' parameter instead of 'ref'
    const messengerURL = `https://m.me/techstudio.com.bd?text=${message}`;

    // Open the Messenger URL in a new tab
    window.open(messengerURL, '_blank');
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold capitalize text-gray-900">
          {product.title.toLowerCase()}
        </h1>
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-indigo-600">
              ৳ {selectedVariant.compareAtPrice.toFixed(2)}
            </p>
            {selectedVariant.compareAtPrice !== selectedVariant.price && (
              <p className="text-lg text-gray-500 line-through">
                ৳ {selectedVariant.price.toFixed(2)}
              </p>
            )}
          </div>
          {/* <p className="mt-2 text-sm text-gray-500">
            Free shipping on orders over ৳ 100
          </p> */}
        </div>
      </div>

      {/* Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Color Options</h2>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={cn(
                        'group relative h-12 w-12 rounded-full border-2 p-1 transition-all',
                        selectedVariant.color_name === variant.color_name
                          ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                          : 'border-gray-200 hover:border-gray-300',
                      )}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      <span
                        className="block size-full rounded-full"
                        style={{ backgroundColor: variant.color_code }}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{variant.color_name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}

      <FeatureList features={product?.features as Array<string>} />

      <div className="flex gap-4">
        <Button
          disabled={product?.status !== 'ACTIVE'}
          id="buy-now"
          variant={'secondary'}
          className="h-12 w-1/2 px-6 py-3 font-semibold"
          onClick={handleBuyNow}
        >
          <MdAddShoppingCart className="size-5" />
          <span>Buy Now</span>
        </Button>
        <Button
          disabled={product?.status !== 'ACTIVE'}
          id="product-page-to-cart"
          onClick={handleAddToCart}
          className={cn('h-12 w-1/2 px-6 py-3 font-semibold')}
        >
          <ShoppingCart className="size-5" />
          <span>Add to Cart</span>
        </Button>
        {/* <button className="rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
          <Heart className="size-5 text-gray-600" />
        </button>
        <button className="rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
          <Share2 className="size-5 text-gray-600" />
        </button> */}
      </div>
      <div className="flex gap-4">
        <Button
          className="h-12 w-1/2 bg-[#0084ff] px-6 py-3 font-semibold hover:bg-[#0084ff]/80"
          onClick={handleMessenger}
        >
          <RiMessengerLine />
          <span>Messenger</span>
        </Button>
        <Button
          className="h-12 w-1/2 bg-[#25d366] px-6 py-3 font-semibold hover:bg-[#25d366]/80"
          onClick={handleWhatsApp}
        >
          <IoLogoWhatsapp />
          <span>WhatsApp</span>
        </Button>
      </div>
      {/* Stock Status */}
      {/* <div className="text-sm text-gray-600">
        {selectedVariant.quantity > 0 ? (
          <p>In Stock: {selectedVariant.quantity} units available</p>
        ) : (
          <p className="text-red-500">Currently Out of Stock</p>
        )}
      </div> */}
    </div>
  );
}
