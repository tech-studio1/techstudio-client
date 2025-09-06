import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';

interface CategoryItemProps {
  created_at: string;
  description: string;
  id: string;
  slug: string;
  status: string;
  title: string;
  updated_at: string;
  sub_categories?: CategoryItemProps[];
  setIsOpen?: any;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  id,
  slug,
  status,
  sub_categories,
  setIsOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {sub_categories && sub_categories.length > 0 ? (
        <div
          className="flex cursor-pointer items-center justify-between px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="capitalize">{title}</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 md:hidden ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <ChevronRight size={16} className="hidden md:block" />
        </div>
      ) : setIsOpen ? (
        <div
          onClick={() => {
            router.push(`/categories/${slug}`);
            setIsOpen(false);
          }}
          className="flex cursor-pointer items-center justify-between px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
        >
          <span className="capitalize">{title}</span>
        </div>
      ) : (
        <Link
          href={`/categories/${slug}`}
          className="flex cursor-pointer items-center justify-between px-4 py-2 transition-colors duration-200 hover:bg-gray-100"
        >
          <span className="capitalize">{title}</span>
        </Link>
      )}

      {sub_categories && sub_categories.length > 0 && (
        <>
          {/* Desktop submenu */}
          <div
            className={`absolute left-full top-0 z-50 hidden w-64 origin-left bg-white shadow-lg transition-all duration-200 ease-in-out md:block ${
              isHovered
                ? 'scale-x-100 opacity-100'
                : 'pointer-events-none scale-x-0 opacity-0'
            }`}
          >
            {sub_categories.map((subCategory) => (
              <CategoryItem
                key={subCategory.id}
                created_at={subCategory.created_at}
                description={subCategory.description}
                id={subCategory.id}
                slug={subCategory.slug}
                status={subCategory.status}
                title={subCategory.title}
                updated_at={subCategory.updated_at}
                sub_categories={subCategory.sub_categories}
                setIsOpen={setIsOpen}
              />
            ))}
          </div>

          {/* Mobile submenu */}
          <div
            className={`bg-gray-50 md:hidden ${isExpanded ? 'block' : 'hidden'}`}
          >
            {sub_categories.map((subCategory) => (
              <div key={subCategory.id} className="pl-4">
                <CategoryItem
                  created_at={subCategory.created_at}
                  description={subCategory.description}
                  id={subCategory.id}
                  slug={subCategory.slug}
                  status={subCategory.status}
                  title={subCategory.title}
                  updated_at={subCategory.updated_at}
                  sub_categories={subCategory.sub_categories}
                  setIsOpen={setIsOpen}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
