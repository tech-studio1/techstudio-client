import NextAuth from 'next-auth';
import { authConfig } from './services/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    // Protect /user, /wishlist, and all their subroutes
    '/user/:path*',
    '/wishlist/:path*',
  ],
};
