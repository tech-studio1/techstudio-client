'use client';
import { notoSherif } from '@/app/fonts';
import React, { useState, useRef, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const touch = e.touches[0];
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setPosition({ x, y });
  };
  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="grid h-fit gap-4">
      <div className="size-full max-h-[450px] max-w-[500px] rounded-xl bg-white px-2 pb-10 pt-2 shadow">
        <div
          className="mx-auto aspect-square size-fit cursor-zoom-in overflow-hidden rounded-xl"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsZoomed(true)}
          onTouchEnd={() => setIsZoomed(false)}
          onTouchMove={handleTouchMove}
        >
          <picture>
            <img
              ref={imageRef}
              src={mainImage}
              alt={title}
              className="size-full max-h-[420px] max-w-[450px] object-cover object-center transition-transform duration-300"
              style={{
                transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
            />
          </picture>
        </div>
      </div>
      <div className="flex h-fit w-full max-w-[500px] shrink items-center justify-center gap-4 rounded-xl bg-white p-2 shadow">
        {images.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(image)}
            className={`aspect-square size-20 overflow-hidden rounded-lg bg-gray-100 ${
              mainImage === image ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            <picture>
              <img
                src={image}
                alt={`${title} - ${idx + 1}`}
                className="size-full object-cover object-center"
              />
            </picture>
          </button>
        ))}
      </div>
      <div
        className={`h-fit w-full max-w-[500px] gap-4 space-y-4 rounded-xl bg-white p-4 shadow ${notoSherif.className}`}
      >
        <p className="text-base font-bold text-gray-600">
          ঢাকার বাহিরে অর্ডার কনফার্ম করার জন্যে অগ্রিম ১২০ টাকা এডভান্স পেমেন্ট
          করতে হবে। প্রোডাক্টের অবশিষ্ট টাকা আপনি &ldquo;ক্যাশ অন
          ডেলিভারি&ldquo; তে পরিশোধ করবেন।
        </p>
        <p className="text-base font-bold text-gray-600">
          প্রোডাক্ট স্টক অথবা দাম সংক্রান্ত যেকোনো বিষয়ে তথ্য জানতে আমাদের কে
          কল করুন{' '}
          <a className="text-primary" href="tel:+8801670957108">
            (01670957108)
          </a>{' '}
          অথবা আমাদের ফেইসবুক অফিশিয়াল পেইজে মেসেজ করুন।
        </p>
      </div>
    </div>
  );
}
