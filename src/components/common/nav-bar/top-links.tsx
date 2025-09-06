'use client';
import { cn } from '@/lib/utils';
import { socialLinks } from '@/utils/links';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const TopLinks = () => {
  const [hideTopLinks, setHideTopLinks] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Measure the element height on mount
  useEffect(() => {
    if (navRef.current) {
      setMaxHeight(navRef.current.scrollHeight);
    }
  }, []);

  // Toggle hide state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHideTopLinks(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        maxHeight: hideTopLinks ? 0 : (maxHeight ?? 'none'),
        opacity: hideTopLinks ? 0 : 1,
      }}
      className="w-full overflow-hidden border-b transition-[max-height,opacity] duration-500 ease-in-out"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between py-2">
        <p className="font-bold">Smart Gadget & SmartPhone Collection</p>
        <div className="flex items-center">
          <div className="mr-4 flex justify-center space-x-3">
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
          <div className="px-2">
            Call Us:{' '}
            <Link
              href={'tel:+8801670957108'}
              className="font-bold text-primary"
            >
              01670957108
            </Link>
          </div>
          {/* <Link
            href={'/user/profile'}
            className="border-r px-2 transition-all duration-200 ease-in-out hover:text-primary"
          >
            My Account
          </Link> */}
        </div>
      </nav>
    </nav>
  );
};

export default TopLinks;
