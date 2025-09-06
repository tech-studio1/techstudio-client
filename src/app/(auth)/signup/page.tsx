import LoaderComponent from '@/components/ui/loader';
import Signup from '@/modules/signup';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const page = async () => {
  const session = await auth();
  if (session && session?.token) {
    redirect('/');
  }
  return (
    <div className="flex items-center justify-center bg-background p-4 py-12">
      <Suspense fallback={<LoaderComponent />}>
        <Signup isModal={false} />
      </Suspense>
    </div>
  );
};

export default page;
