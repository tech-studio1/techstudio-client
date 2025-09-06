'use server';

export interface Category {
  id: string;
  title: string;
  slug: string;
  description?: string;
  featured: boolean;
  featured_sequence?: number;
  sequence: number;
  status: 'ACTIVE' | 'INACTIVE';
  medias?: string[];
  parent?: string;
  sub_categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  message: string;
  status: number;
}

export const handleGetCategory = async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/category/categories?limit=100&status=ACTIVE`,
      {
        next: { revalidate: 60 },
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const result = await response.json();
    // console.log(result);
    return result.data;
  } catch (error) {
    // console.log(error);
    throw new Error('Failed to fetch categories');
  }
};

export const handleGetCategoryTree = async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/category/categories/tree`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const result: CategoryResponse = await response.json();

    if (!result.success) {
      throw new Error('API returned unsuccessful response');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
