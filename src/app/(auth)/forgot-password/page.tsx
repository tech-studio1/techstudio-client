import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const session = await auth();
  if (session && session?.token) {
    redirect('/');
  }
  return <div>Forgot Password</div>;
};

export default page;
