import CartPageContent from './CartPageContent';
import { Suspense } from 'react';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<div>Loading cart...</div>}>
          <CartPageContent />
        </Suspense>
      </div>
    </div>
  );
}