'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get payment details from sessionStorage
    const pendingPayment = sessionStorage.getItem('pendingPayment');

    if (pendingPayment) {
      const data = JSON.parse(pendingPayment);
      setPaymentData(data);

      // Clear the cart since payment was successful
      clearCart();
      // Clear sessionStorage
      sessionStorage.removeItem('pendingPayment');
    }

    setLoading(false);

    // Redirect to home after 10 seconds
    const timeout = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [clearCart, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-md">
        <Card className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="size-12 text-green-600" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Payment Successful!
            </h1>

            <p className="mb-6 text-gray-600">
              Your payment has been processed successfully. Thank you for your
              order!
            </p>

            {paymentData && (
              <div className="mb-6 w-full rounded-lg bg-gray-50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  {paymentData.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-medium text-gray-900">
                        {paymentData.transactionId}
                      </span>
                    </div>
                  )}
                  {paymentData.paymentAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="font-medium text-gray-900">
                        ৳{paymentData.paymentAmount}
                      </span>
                    </div>
                  )}
                  {paymentData.paymentType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Type:</span>
                      <span className="font-medium text-gray-900">
                        {paymentData.paymentType === 'FULL_PAYMENT'
                          ? 'Full Payment'
                          : 'Delivery Fee'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              onClick={() => router.push('/')}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>

            <p className="mt-4 text-xs text-gray-400">
              Redirecting to home in 10 seconds...
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
