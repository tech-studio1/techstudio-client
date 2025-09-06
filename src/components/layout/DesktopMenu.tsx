'use client';

import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { CategoryItem } from './CategoryItem';
import { Category } from '@/app/actions/category';

interface DesktopMenuProps {
  categories: Category[];
  onCategoryClick?: () => void;
}

export default function DesktopMenu({
  categories,
  onCategoryClick,
}: DesktopMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex h-16 items-end">
      <button
        className="flex w-64 items-center gap-6 space-x-2 rounded-t-lg bg-white px-4 py-2 text-black transition-colors duration-200 hover:bg-secondary hover:text-white"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Menu size={20} />
        <span className="">All Categories</span>
      </button>

      <div
        className={`absolute left-0 top-full z-50 w-64 origin-top rounded-b-lg bg-white shadow-lg transition-all duration-200 ease-in-out ${
          isOpen
            ? 'scale-y-100 opacity-100'
            : 'pointer-events-none scale-y-0 opacity-0'
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {categories.map((category: Category, idx: number) => (
          <CategoryItem
            key={idx}
            id={category.id}
            slug={category.slug}
            title={category.title}
            status={category.status}
            created_at={category.created_at}
            description={category.description}
            updated_at={category.updated_at}
            sub_categories={category?.sub_categories}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
    </div>
  );
}
