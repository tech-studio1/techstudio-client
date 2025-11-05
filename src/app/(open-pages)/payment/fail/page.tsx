'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PaymentFailPage() {
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
            <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-red-100">
              <XCircle className="size-12 text-red-600" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Payment Failed
            </h1>

            <p className="mb-6 text-gray-600">
              Unfortunately, your payment could not be processed. Please try
              again or use a different payment method.
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

            <div className="mb-6 w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your order has been created but payment
                is pending. You can try to complete the payment again or contact
                our support team.
              </p>
            </div>

            <div className="flex w-full gap-3">
              <Button
                onClick={() => router.push('/checkout')}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Try Again
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
