'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'nextjs-toploader/app';
import { Button } from '@/components/ui/button';
import { useDebouncedCallback } from 'use-debounce';
import { Product } from '@/lib/product-types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const FormSchema = z.object({
  searchString: z.string().optional(),
});

interface SearchNavProps {
  handleGetProducts: (params: any) => Promise<{
    data: Product[];
    meta: any;
    success: boolean;
  }>;
}

const SearchNav = ({ handleGetProducts }: SearchNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const currentQueryRef = useRef<string>('');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchString: '',
    },
  });

  const searchQuery = form.watch('searchString');

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
    setIsOpen(false);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const queryToUse = selectedProduct?.slug || data.searchString;
    const formattedString = formatQueryString(queryToUse);

    const url =
      formattedString && formattedString.length > 0
        ? `/search?query=${formattedString}`
        : '/search';

    router.push(url);
    setSelectedProduct(null);
    setSuggestions([]);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger>
              <Search className="size-5 text-gray-600 hover:text-primary" />
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-primary p-1 text-xs text-white">
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SheetContent
        side={'top'}
        showClose={false}
        className="z-[9999] px-2 py-4"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="searchString"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="w-full pr-16"
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
                        className="absolute right-0 top-0 h-full w-14"
                      >
                        <Search className="text-primary" strokeWidth={3} />
                      </Button>
                    </div>
                  </FormControl>

                  {/* Suggestions Dropdown */}
                  {(suggestions.length > 0 || isLoading) && (
                    <div className="absolute inset-x-0 z-50 mt-2 overflow-y-auto rounded-lg border bg-white shadow-lg">
                      {isLoading ? (
                        <div className="px-4 py-2 text-gray-500">
                          Searching...
                        </div>
                      ) : (
                        suggestions.map((product) => (
                          <button
                            type="button"
                            key={product.id}
                            className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            onClick={() => handleSuggestionClick(product)}
                          >
                            {product?.variants?.[0]?.medias?.[0] ? (
                              <picture>
                                <img
                                  src={product?.variants?.[0]?.medias?.[0]}
                                  alt={product.title}
                                  className="size-10 rounded object-cover"
                                />
                              </picture>
                            ) : product?.medias?.[0] ? (
                              <picture>
                                <img
                                  src={product.medias[0]}
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
      </SheetContent>
    </Sheet>
  );
};

export default SearchNav;
