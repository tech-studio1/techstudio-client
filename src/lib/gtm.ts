// lib/analytics.ts
import { sendGTMEvent } from '@next/third-parties/google';
import { Product, Variant } from './product-types';

export interface EcommerceEvent {
  currency: string;
  value: number;
  items: Product[];
}

export interface PurchaseEvent {
  client_info: {
    billingAddress: {
      address: string;
      area: string;
      city: string;
      district: string;
      firstName: string;
      lastName: string;
      mobile: string;
    };
    paymentMethod: string;
    sameAsBilling: boolean;
    shippingAddress: {
      address: string;
      area: string;
      city: string;
      district: string;
      firstName: string;
      lastName: string;
      mobile: string;
    };
  };
  created_at: string;
  discount_amount: number;
  id: string;
  order_items: {
    costPerItem: {
      compareAtPrice: number;
      costPerItem: number;
      price: number;
    };
    id: string;
    image: string;
    quantity: number;
    title: string;
    variantInfo: {
      color_code: string;
      color_name: string;
      compareAtPrice: number;
      costPerItem: number;
      price: number;
      quantity: number;
      sku: '';
    };
  }[];
  payment_status: string;
  pricing: {
    discount: number;
    items_cost: number;
    shipping: number;
    tax: number;
    total_cost: number;
  };
  status: string;
  updated_at: string;
}

// GA4 eCommerce Event Functions

/**
 * Track when user views a product detail page
 */
export const trackViewItem = (product: Product) => {
  const eventData = {
    event: 'view_item',
    ecommerce: {
      currency: 'BDT',
      value: product?.pricing?.compareAtPrice,
      items: product?.variants?.map((variant) => ({
        item_id: product.id?.split(':')[1],
        item_name: product.title,
        category: product.category_details?.title,
        quantity: 1,
        price: product?.pricing?.compareAtPrice,
        item_brand: product.brand_details?.title || '',
        item_variant: variant?.color_name,
      })),
    },
  };

  // Send to GTM - this handles ALL your tracking tools
  sendGTMEvent(eventData);
};

/**
 * Track when user adds item to cart
 */

interface CartItem extends Product {
  selectedVariant: Variant;
  quantity?: number;
}
export const trackAddToCart = (product: CartItem, quantity: number) => {
  const eventData = {
    event: 'add_to_cart',
    ecommerce: {
      currency: 'BDT',
      value: product?.pricing?.compareAtPrice * quantity,
      items: [
        {
          item_id: product.id?.split(':')[1],
          item_name: product.title,
          category: product.category_details?.title,
          quantity: quantity,
          price: product?.pricing?.compareAtPrice,
          item_brand: product.brand_details?.title || '',
          item_variant: product?.selectedVariant?.color_name,
        },
      ],
    },
  };

  sendGTMEvent(eventData);
};

/**
 * Track when user begins checkout process
 */
export const trackBeginCheckout = (
  cartItems: CartItem[],
  totalValue: number,
  currency = 'BDT',
) => {
  const eventData = {
    event: 'begin_checkout',
    ecommerce: {
      currency,
      value: totalValue,
      items: cartItems.map((item) => ({
        item_id: item.id?.split(':')[1],
        item_name: item.title,
        category: item.category_details?.title,
        quantity: item.quantity,
        price: item?.pricing?.compareAtPrice,
        item_brand: item.brand_details?.title || '',
        item_variant: item.selectedVariant?.color_name || '',
      })),
    },
  };

  sendGTMEvent(eventData);
};

/**
 * Track successful purchase
 */
export const trackPurchase = (
  purchaseData: PurchaseEvent,
  cartItems: CartItem[],
) => {
  const eventData = {
    event: 'purchase',
    ecommerce: {
      transaction_id: purchaseData?.id?.split(':')[1],
      value: purchaseData?.pricing?.total_cost,
      tax: 0,
      shipping: purchaseData?.pricing?.shipping || 0,
      currency: 'BDT',
      coupon: '',
      items: cartItems?.map((item) => ({
        item_id: item.id?.split(':')[1],
        item_name: item.title,
        category: item?.category_details?.title,
        quantity: item?.quantity,
        price: item?.pricing?.compareAtPrice,
        item_brand: item.brand_details?.title || '',
        item_variant: item?.selectedVariant?.color_name || '',
      })),
    },
  };

  sendGTMEvent(eventData);
};

/**
 * Track when user removes item from cart (bonus)
 */
// export const trackRemoveFromCart = (product: Product) => {
//   const eventData = {
//     event: 'remove_from_cart',
//     ecommerce: {
//       currency: 'BDT',
//       value: product?.pricing?.compareAtPrice * quantity,
//       items: [
//         {
//           item_id: product.item_id,
//           item_name: product.item_name,
//           category: product.category,
//           quantity: product.quantity,
//           price: product.price,
//           item_brand: product.item_brand || '',
//           item_category2: product.item_category2 || '',
//           item_category3: product.item_category3 || '',
//           item_variant: product.item_variant || '',
//         },
//       ],
//     },
//   };

//   sendGTMEvent(eventData);

//   console.log('GA4 Event: remove_from_cart', eventData);
// };

/**
 * Track when user views cart (bonus)
 */
// export const trackViewCart = (
//   cartItems: Product[],
//   totalValue: number,
//   currency = 'BDT',
// ) => {
//   const eventData = {
//     event: 'view_cart',
//     ecommerce: {
//       currency,
//       value: totalValue,
//       items: cartItems.map((item) => ({
//         item_id: item.item_id,
//         item_name: item.item_name,
//         category: item.category,
//         quantity: item.quantity,
//         price: item.price,
//         item_brand: item.item_brand || '',
//         item_category2: item.item_category2 || '',
//         item_category3: item.item_category3 || '',
//         item_variant: item.item_variant || '',
//       })),
//     },
//   };

//   sendGTMEvent(eventData);

//   console.log('GA4 Event: view_cart', eventData);
// };
