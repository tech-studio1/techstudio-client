import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import { InputOTPFormCard } from './_component/otp-card';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const session = await auth();
  // console.log(session?.token);
  if (session && session?.token) {
    redirect('/');
  }
  const { token } = await searchParams;
  if (!token || token === 'undefined') {
    redirect('/signup');
  }
  return (
    <div className="flex items-center justify-center bg-background p-4 py-12">
      <Suspense
        fallback={
          <LoaderCircle className="animate-spin transition-all duration-500 ease-in-out" />
        }
      >
        <InputOTPFormCard token={token ? token.toString() : ''} isModal={false} />
      </Suspense>
    </div>
  );
};

export default page;
