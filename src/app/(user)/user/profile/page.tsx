import { handleMyId } from '@/app/actions/user';
import Fullloader from '@/components/common/loader/fullloader';
import UserProfileModule from '@/modules/user/profile';
import { auth } from '@/services/auth';
import { Suspense } from 'react';

export default async function ProfilePage() {
  const session = await auth();
  const token = session?.token;
  const userData = await handleMyId(token ? token : '');

  return (
    <Suspense fallback={<Fullloader />}>
      <UserProfileModule data={userData} />
    </Suspense>
  );
}
