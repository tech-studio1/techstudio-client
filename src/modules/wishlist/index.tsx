import React from 'react';
import WishlistGrid from './wishlist-grid';
import SimilarProducts from './similar-product';

const WishlistModule = () => {
  return (
    <div>
      <WishlistGrid data={[]} />
      <SimilarProducts data={[]} />
    </div>
  );
};

export default WishlistModule;
