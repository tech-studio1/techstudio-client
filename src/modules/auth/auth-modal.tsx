// components/auth/AuthModal.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import LoginModule from '../login';
import Signup from '../signup';
import { InputOTPFormCard } from '@/app/(auth)/account-verification/_component/otp-card';

export default function AuthModal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get('auth'); // login | signup | account-verification
  const token = searchParams.get('token');
  const open = !!mode;

  const closeModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('auth');
    url.searchParams.delete('token');
    router.replace(url.pathname + url.search);
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogTitle className="sr-only">Auth</DialogTitle>
      <DialogContent className="max-w-md p-0">
        {mode === 'login' && <LoginModule isModal={true} />}
        {mode === 'signup' && <Signup isModal={true} />}
        {mode === 'account-verification' && token && (
          <InputOTPFormCard token={token} isModal={true} />
        )}
      </DialogContent>
    </Dialog>
  );
}
