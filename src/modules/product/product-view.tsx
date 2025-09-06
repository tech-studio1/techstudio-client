// components/product-view.tsx
'use client';

import { Product } from '@/lib/product-types';
import { useEffect, useState } from 'react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import { trackViewItem } from '@/lib/gtm';

export default function ProductView({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || {
      color_code: '',
      color_name: 'Default',
      compareAtPrice: product.pricing.compareAtPrice,
      price: product.pricing.price,
      medias: product.medias,
    },
  );

  // Combine all unique medias from variants and product
  const allMedias =
    // If no images available, use placeholder
    [
      // Selected variant medias first (if they exist)
      ...(selectedVariant.medias || []),
      // Product medias
      ...(product.medias || []),
      // Other variant medias
      ...(product.variants?.flatMap((variant) => variant.medias || []) || []),
    ]
      // Remove duplicates
      .filter((media, index, self) => self.indexOf(media) === index).length > 0
      ? [
          // Selected variant medias first (if they exist)
          ...(selectedVariant.medias || []),
          // Product medias
          ...(product.medias || []),
          // Other variant medias
          ...(product.variants?.flatMap((variant) => variant.medias || []) ||
            []),
        ].filter((media, index, self) => self.indexOf(media) === index)
      : ['/product_place_holder.gif'];

  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ProductGallery images={allMedias} title={product.title} />
      <ProductInfo
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  );
}
