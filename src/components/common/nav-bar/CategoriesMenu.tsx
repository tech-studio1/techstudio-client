import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { categories } from './categoryData';
import { CategoryItem } from './CategoryItem';

interface CategoryItemProps {
  created_at: string;
  description: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
  sub_categories?: CategoryItemProps[];
}

export const CategoriesMenu: React.FC<any> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-1">
      <button
        className="flex items-center gap-6 space-x-2 rounded-t-lg bg-white px-4 py-2 text-black transition-colors duration-200 hover:bg-secondary hover:text-white"
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
        {data.map((category: CategoryItemProps, idx: number) => (
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
};
