import { Suspense } from 'react';

import LoginModule from '@/modules/login';
import LoaderComponent from '@/components/ui/loader';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session && session?.token) {
    redirect('/');
  }
  return (
    <Suspense fallback={<LoaderComponent />}>
      <div className="flex items-center justify-center bg-background p-4 py-12">
        <LoginModule isModal={false} />
      </div>
    </Suspense>
  );
}
