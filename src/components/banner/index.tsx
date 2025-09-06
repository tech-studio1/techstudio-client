import React from 'react';

const Banner = ({ image, alt }: { image: string; alt?: string }) => {
  return (
    <div className="mb-10 px-2 xl:px-0">
      <picture>
        <img src={image} alt={alt ? alt : ''} className="size-full" />
      </picture>
    </div>
  );
};

export default Banner;
