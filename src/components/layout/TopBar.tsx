'use client';

import { useState, useEffect } from 'react';
import { socialLinks } from '@/utils/links';
import Link from 'next/link';

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`border-b bg-white py-1 text-xs text-foreground transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="hidden sm:block">
          <span className="font-bold">
            Smart Gadget & SmartPhone Collection | 📞 Call:{' '}
            <Link
              href={'tel:+8801670957108'}
              className="font-bold text-primary"
            >
              01670957108
            </Link>
          </span>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <span className="hidden md:inline">Follow us:</span>
          <div className="flex space-x-2">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-black hover:text-primary"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="size-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
