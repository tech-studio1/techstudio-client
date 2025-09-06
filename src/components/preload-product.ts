import { handleGetProducts } from '@/app/actions/products';
import 'server-only';

export const preloadProducts = ({
  page,
  limit,
  search,
  category,
  sort_by_price,
  sort_by_relevance,
  filter_lte,
  filter_gte,
  brands,
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort_by_price?: string;
  filter_lte?: string;
  sort_by_relevance?: string;
  filter_gte?: string;
  brands?: string | string[];
}) => {
  void handleGetProducts({
    page,
    limit,
    search,
    category,
    sort_by_price,
    sort_by_relevance,
    filter_lte,
    filter_gte,
    brands,
  });
};
