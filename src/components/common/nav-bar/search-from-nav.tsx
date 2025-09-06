'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { Product } from '@/lib/product-types';

const FormSchema = z.object({
  searchString: z.string().optional(),
});

interface SearchFromNavProps {
  handleGetProducts: (params: any) => Promise<{
    data: Product[];
    meta: any;
    success: boolean;
  }>;
}

const SearchFromNav = ({ handleGetProducts }: SearchFromNavProps) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const currentQueryRef = useRef<string>('');
  const formRef = useRef<HTMLFormElement>(null); // Ref for form container

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchString: '',
    },
  });

  const searchQuery = form.watch('searchString');

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setIsLoading(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      currentQueryRef.current = query;

      try {
        setIsLoading(true);
        const response = await handleGetProducts({
          page: 1,
          limit: 5,
          search: query,
        });

        if (currentQueryRef.current === query && response.success) {
          setSuggestions(response.data);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        if (currentQueryRef.current === query) {
          setIsLoading(false);
        }
      }
    },
    [handleGetProducts],
  );

  const debouncedFetch = useDebouncedCallback(
    (query: string) => fetchSuggestions(query),
    300,
    { maxWait: 500 },
  );

  useEffect(() => {
    if (searchQuery && !selectedProduct) {
      debouncedFetch(searchQuery);
    } else {
      setSuggestions([]);
    }

    return () => debouncedFetch.cancel();
  }, [searchQuery, selectedProduct, debouncedFetch]);

  const formatQueryString = (query?: string) => {
    return query?.replaceAll(' ', '_').toLowerCase().replaceAll(/[.,]/g, '_');
  };

  const handleSuggestionClick = (product: Product) => {
    setSelectedProduct(product);
    router.push(`/product/${product?.slug}`);
    setSuggestions([]);
    form.reset();
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Cancel any pending suggestions fetch
    debouncedFetch.cancel();
    currentQueryRef.current = '';
    setIsLoading(false);
    setSuggestions([]);

    const queryToUse = selectedProduct?.slug || data.searchString;
    const formattedString = formatQueryString(queryToUse);

    const url =
      formattedString && formattedString?.length > 0
        ? `/search?query=${formattedString}`
        : '/search';

    router.push(url);
    setSelectedProduct(null);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        ref={formRef} // Attach form ref
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex w-full items-center gap-0"
      >
        <FormField
          control={form.control}
          name="searchString"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative flex items-center overflow-hidden rounded-full border-2 border-blue-500 focus-within:border-blue-600 focus-within:ring-0">
                  <Input
                    className="h-10 w-full rounded-r-none border-0 pr-14 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Search Product"
                    autoComplete="off"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedProduct(null);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 h-10 w-20 rounded-l-none bg-gray-100 hover:bg-gray-200"
                  >
                    <Search className="size-7 text-blue-500" strokeWidth={3} />
                  </Button>
                </div>
              </FormControl>

              {/* Suggestions Dropdown */}
              {(suggestions.length > 0 || isLoading) && (
                <div className="absolute top-12 z-50 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                  {isLoading ? (
                    <div className="px-4 py-2 text-gray-500">Searching...</div>
                  ) : (
                    suggestions.map((product) => (
                      <button
                        type="button"
                        key={product.id}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        {/* Product Image */}
                        {product?.medias?.[0] ? (
                          <picture>
                            <img
                              src={product?.medias[0]}
                              alt={product.title}
                              className="size-10 rounded object-cover"
                            />
                          </picture>
                        ) : product?.variants?.[0]?.medias?.[0] ? (
                          <picture>
                            <img
                              src={product?.variants?.[0]?.medias?.[0]}
                              alt={product.title}
                              className="size-10 rounded object-cover"
                            />
                          </picture>
                        ) : (
                          <picture>
                            <img
                              src="/product_place_holder.gif"
                              alt={product.title}
                              className="size-10 rounded object-cover"
                            />
                          </picture>
                        )}
                        <span>{product.title}</span>
                      </button>
                    ))
                  )}
                  <Button
                    variant={'secondary'}
                    type="submit"
                    className="w-full font-semibold"
                  >
                    See More...
                  </Button>
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchFromNav;
