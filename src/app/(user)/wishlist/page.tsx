import WishlistModule from '@/modules/wishlist';
import React from 'react';

const page = () => {
  return (
    <main className="mx-auto max-w-6xl p-2">
      <h1 className="my-10 text-center text-3xl font-bold">Wishlist</h1>
      <WishlistModule />
    </main>
  );
};

export default page;
