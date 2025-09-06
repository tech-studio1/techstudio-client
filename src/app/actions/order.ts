'use server';

import { auth } from '@/services/auth';
import { handleOrderEmail } from './resend';

export const handlePostOrder = async (body: any) => {
  const session = await auth();
  try {
    if (session && session?.token && session?.token.length > 0) {
      const response = await fetch(`${process.env.BASE_URL}/v1/order/orders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${session?.token}`,
          'x-shop-ns': 'techstudio',
          'x-shop-db': 'techstudio',
        },
        body: JSON.stringify(body),
      });
      // console.log(JSON.stringify(response, null, 2));
      const result = await response.json();
      // console.log(JSON.stringify(result, null, 2));
      if (!result?.success) {
        throw new Error('Something Went Wrong');
      }
      if (result?.success) {
        const body2 = {
          ...body,
          orderId: result?.data?.id.split(':')[1] || '',
        };
        const response = await handleOrderEmail(body2);
        // console.log('email', response);
      }
      return result;
    } else {
      console.log('XYZS');
      const response = await fetch(`${process.env.BASE_URL}/v1/order/orders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-shop-ns': 'techstudio',
          'x-shop-db': 'techstudio',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!result?.success) {
        throw new Error('Something Went Wrong');
      }
      if (result && result?.success) {
        const body2 = {
          ...body,
          orderId: result?.data?.id.split(':')[1] || '',
        };
        const response = await handleOrderEmail(body2);
        // console.log('email', response);
      }
      return result;
    }
  } catch (error: any) {
    // console.log(error);
    throw new Error('Failed to create order', error);
  }
};
