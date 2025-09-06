import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { handleCurrentSession, handleMyId } from '@/app/actions/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { identifier, password } = credentials;
          const response = await fetch(
            `${process.env.BASE_URL}/v1/auth/authentication/signin`,
            {
              method: 'POST',
              body: JSON.stringify({ identifier, password }),
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            },
          );
          const result = await response.json();
          // console.log(result);
          
          // Check if authentication was successful
          if (result?.data?.token) {
            const user = await handleCurrentSession(result?.data?.token);
            return { ...result?.data, ...user };
          } else {
            // Authentication failed - return null to trigger CredentialsSignin error
            console.log('Authentication failed:', result?.message || 'Invalid credentials');
            return null;
          }
        } catch (error) {
          console.log('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
