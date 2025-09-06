export type Variant = {
  color_code: string;
  color_name: string;
  compareAtPrice: number;
  costPerItem: number;
  price: number;
  quantity: number;
  medias: string[];
  sku: string;
};

export type Product = {
  category: string;
  category_details: {
    created_at: string;
    description: string;
    id: string;
    medias: string[];
    sequence: number;
    slug: string;
    status: string;
    title: string;
    updated_at: string;
  };
  brand_details: {
    created_at: string;
    id: string;
    medias: string[];
    sequence: number;
    slug: string;
    status: string;
    title: string;
    updated_at: string;
  };
  description: string;
  features: string[];
  medias: string[];
  id: string;
  pricing: {
    compareAtPrice: number;
    costPerItem: number;
    price: number;
  };
  slug: string;
  specs: {
    key: string;
    value: string;
  }[];
  status: string;
  title: string;
  variants: Variant[];
};
