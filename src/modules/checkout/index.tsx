'use client';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from 'react';
import CheckoutForm from './checkout-form';
import { Profile } from '../user/profile/user';

const CheckoutModule = ({ data }: { data: Profile }) => {
  const { totalItems } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (totalItems === 0) {
      router.push('/');
    }
  }, [totalItems, router]);

  if (!mounted) return null;

  return <CheckoutForm user={data} />;
};

export default CheckoutModule;
