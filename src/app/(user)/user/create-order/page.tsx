'use client';

import { PageContainer } from '@/components/layouts/page-container';
import { PageHeader } from '@/components/layouts/page-header';
import OrderForm from '@/components/orders/order-form';

export default function CreateOrderPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Create New Order"
        description="Fill in the details for your order"
      />
      <OrderForm />
    </PageContainer>
  );
}
