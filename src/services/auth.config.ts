import type { NextAuthConfig } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import { handleCurrentSession, handleMyId } from '@/app/actions/user';

async function refreshAccessToken(sid: any) {
  // console.log(sid);
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/refresh?sid=` + sid,
      {
        method: 'POST',
        headers: {
          'Contet-Type': 'application/json',
        },
      },
    );

    const tokens = await response.json();
    // console.log({ tokens, pp: process.env.BASE_URL, sid });
    if (tokens?.data?.token) {
      const user = await handleCurrentSession(tokens?.data?.token);
      return { ...tokens?.data, ...user };
    } else {
      return { error: 'RefreshAccessTokenError' };
    }
  } catch (error: any) {
    // console.log({ error });
    return {
      error: 'RefreshAccessTokenError',
      message: error?.message,
    };
  }
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const publicPaths = [
        '/login',
        '/signup',
        '/forgot-password',
        '/account-verification',
        '/about',
        '/brands',
        '/categories',
        '/checkout',
        '/customer-support',
        '/delivery-policy',
        '/',
        '/emi-policy',
        '/outlets',
        '/privacy-policy',
        '/product',
        '/refund-policy',
        '/return-policy',
        '/search',
        '/terms',
        '/warranty-policy',
      ];
      const path = nextUrl.pathname;

      // Redirect logged-in users away from public paths
      if (publicPaths.includes(path)) {
        return isLoggedIn
          ? Response.redirect(new URL('/', nextUrl.origin))
          : true;
      }

      // Protect dashboard routes
      if (path.startsWith('/user')) {
        return isLoggedIn;
      }
      // Require authentication for all other routes
      if (!isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl.origin));
      }
      // Allow access to authenticated users
      return true;
    },
    jwt: async ({ token, account, user }: any) => {
      // console.log(`In jwt callback - Token is ${JSON.stringify(user)}`);
      // console.log({ token, account, user });
      if (token?.user?.token) {
        const decodedToken = jwtDecode(token.user?.token);
        token.accessTokenExpires =
          decodedToken && decodedToken?.exp ? decodedToken?.exp * 1000 : 1;
      }

      if (account && user) {
        return {
          ...token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        // console.log("**** returning previous token ******");
        return token;
      }
      // console.log('in JWt callbacl');
      return refreshAccessToken(token?.user?.sid);
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      if (token?.user?.token) {
        session.token = token?.user?.token;
        const finalUser = Object.assign({}, token?.user);
        delete finalUser.token;
        delete finalUser.sid;
        delete finalUser.tokenType;
        session.user = finalUser;
        return session;
      } else {
        return session;
      }
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
