'use client';

import { createContext, useContext, useState } from 'react';

type CartSheetContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartSheetContext = createContext<CartSheetContextType | undefined>(
  undefined,
);

export function CartSheetProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartSheetContext.Provider value={{ isOpen, openCart, closeCart }}>
      {children}
    </CartSheetContext.Provider>
  );
}

export function useCartSheet() {
  const context = useContext(CartSheetContext);
  if (!context) {
    throw new Error('useCartSheet must be used within a CartSheetProvider');
  }
  return context;
}
