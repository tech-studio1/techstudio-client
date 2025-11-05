'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/product-types';
import { trackAddToCart } from '@/lib/gtm';

interface Variant {
  color_code: string;
  color_name: string;
  compareAtPrice: number;
  costPerItem: number;
  price: number;
  quantity: number;
  medias: string[];
  sku: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedVariant: Variant;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product & { selectedVariant: Variant },
    quantity: number,
  ) => void;
  removeFromCart: (productId: string, variantColorName: string) => void;
  updateQuantity: (
    productId: string,
    variantColorName: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'techstudio-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever items change (after initialization)
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isInitialized]);

  const addToCart = (
    product: Product & { selectedVariant: Variant },
    quantity: number,
  ) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.id === product.id &&
          item.selectedVariant.color_name ===
            product.selectedVariant.color_name,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id &&
          item.selectedVariant.color_name === product.selectedVariant.color_name
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
    trackAddToCart(product, quantity);
  };

  const removeFromCart = (productId: string, variantColorName: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedVariant.color_name === variantColorName
          ),
      ),
    );
  };

  const updateQuantity = (
    productId: string,
    variantColorName: string,
    quantity: number,
  ) => {
    if (quantity < 1) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId &&
        item.selectedVariant.color_name === variantColorName
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    // Explicitly clear localStorage to ensure cart is cleared immediately
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.selectedVariant.compareAtPrice * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
