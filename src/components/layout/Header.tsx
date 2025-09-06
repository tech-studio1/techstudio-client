import { Suspense } from 'react';
import HeaderContent from './HeaderContent';
import { handleGetCategoryTree } from '@/app/actions/category';
import { auth } from '@/services/auth';
import { handleMyId } from '@/app/actions/user';

function HeaderLoader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto p-4">
        <div className="text-center text-muted-foreground">
          <p>Loading...</p>
        </div>
      </div>
    </header>
  );
}

async function HeaderWithData() {
  try {
    const [categories, session] = await Promise.all([
      handleGetCategoryTree(),
      auth(),
    ]);

    // Fetch user data if session exists
    let userData = null;
    if (session?.token) {
      userData = await handleMyId(session.token);
    }

    return (
      <HeaderContent
        categories={categories}
        session={session}
        userData={userData || null}
      />
    );
  } catch (error) {
    console.error('Failed to fetch header data:', error);
    return <HeaderContent categories={[]} session={null} userData={null} />;
  }
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderLoader />}>
      <HeaderWithData />
    </Suspense>
  );
}
