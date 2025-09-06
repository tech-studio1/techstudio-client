import { auth } from '@/services/auth';
import { handleMyId } from '@/app/actions/user';
import { handleGetCategoryTree } from '@/app/actions/category';
import BottomNavigation from './BottomNavigation';

export default async function BottomNavigationWrapper() {
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
    
    return <BottomNavigation session={session} userData={userData} categories={categories} />;
  } catch (error) {
    console.error('Failed to fetch bottom navigation data:', error);
    return <BottomNavigation session={null} userData={null} categories={[]} />;
  }
}