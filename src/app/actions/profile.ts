'use server';

import { auth } from '@/services/auth';

export const handlePatchMyId = async (body: any) => {
  const session = await auth();
  const token = session?.token;
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/profile`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-shop-ns': 'techstudio',
          'x-shop-db': 'techstudio',
        },
      },
    );
    const result = await response.json();
    if (!result?.success) {
      throw new Error('Something Went Wrong');
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
