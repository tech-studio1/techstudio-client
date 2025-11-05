'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PaymentCancelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get payment details from sessionStorage
    const pendingPayment = sessionStorage.getItem('pendingPayment');
    if (pendingPayment) {
      const data = JSON.parse(pendingPayment);
      setPaymentData(data);

      // Don't clear sessionStorage yet - user might want to retry
    }

    setLoading(false);
  }, []);

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
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-orange-100">
              <AlertCircle className="size-12 text-orange-600" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Payment Cancelled
            </h1>

            <p className="mb-6 text-gray-600">
              You have cancelled the payment process. Your order is still
              pending and awaiting payment.
            </p>

            {paymentData && paymentData.transactionId && (
              <div className="mb-6 w-full rounded-lg bg-gray-50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium text-gray-900">
                      {paymentData.transactionId}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6 w-full rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your order has been created but payment
                is pending. You can complete the payment later or choose a
                different payment method.
              </p>
            </div>

            <div className="flex w-full gap-3">
              <Button
                onClick={() => router.push('/checkout')}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                Complete Payment
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="flex-1"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
