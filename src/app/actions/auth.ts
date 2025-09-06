'use server';

import { auth, signIn, signOut } from '@/services/auth';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';

export async function SignIn(body: any) {
  try {
    const res = await signIn('credentials', {
      ...body,
      redirectTo: '/',
      redirect: false,
    });
    // console.log('action', res);
    return res;
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      // Handle specific NextAuth errors
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials. Please check your username and password.', status: false };
        default:
          return { error: error.message || 'Authentication failed', status: false };
      }
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      status: false,
    };
  }
}

type SignUpBody = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  countryCode: string;
};
export const handleSignUp = async (body: SignUpBody) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/signup`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const handleVerifyOtp = async (body: {
  token: string;
  code: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/verify-account`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const handleResendOtp = async (body: { token: string }) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/resend-account-verification-code`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
export const handleLogOut = async () => {
  const session = await auth();
  const token = session?.token;
  const cookieStore = await cookies();
  const sid = cookieStore.get('sid');
  const url = `${process.env.BASE_URL}/authentication/signout`;

  // console.log(auth_token?.value);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log('signout', result);
    if (sid?.value) {
      cookieStore.delete('sid');
    }
    cookieStore.delete('currentLocation');
    cookieStore.delete('town');

    await signOut({ redirectTo: '/', redirect: false });
    // console.log(result);
  } catch (error) {
    // console.log(error);
    throw error;
  }
  // redirect('/auth/login');
};

export const handleAuthLogOut = async () => {
  'use server';
  const cookieStore = await cookies();

  // console.log(auth_token?.value);

  // await signOut({ redirectTo: '/', redirect: false });
  cookieStore.delete('authjs.pkce.code_verifier');
  cookieStore.delete('authjs.session-token');
  // console.log(result);
  return null;
};
export const isUserLoggedIn = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('authjs.session-token');
  if (session && session?.value) {
    return true;
  } else return false;
};
