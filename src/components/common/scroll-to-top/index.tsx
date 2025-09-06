'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-[100px] right-[38px] z-50 hidden rounded-full bg-primary p-3 text-white shadow-lg transition-all duration-300 md:block ${
        showButton ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      } hover:scale-105 hover:bg-primary/90`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
};

export default ScrollToTopButton;
