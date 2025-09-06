import { handleMyId } from '@/app/actions/user';
import LoadingScreen from '@/components/common/loader/loading-screen';
import CheckoutModule from '@/modules/checkout';
import { auth } from '@/services/auth';
import React, { Suspense } from 'react';

const page = async () => {
  const session = await auth();
  const token = session?.token;
  const userData = await handleMyId(token ? token : '');
  return (
    <main>
      <Suspense fallback={<LoadingScreen loading={true} />}>
        <CheckoutModule data={userData} />
      </Suspense>
    </main>
  );
};

export default page;
