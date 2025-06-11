"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/shop/product-grid';
import { FilterSidebar } from '@/components/shop/filter-sidebar';
import { SearchAndSort } from '@/components/shop/search-and-sort';
import { RentalSmartSearch } from '@/components/rental/rental-smart-search';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000] as [number, number],
    location: '',
    type: 'all' as 'all' | 'buy' | 'rent',
    sort: 'latest',
    categories: [] as string[],
    locations: [] as string[],
    brands: [] as string[],
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL search params
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search');
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Shop Fashion
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover thousands of fashion items to buy or rent from verified vendors
          </p>
        </motion.div>

        {/* AI-Powered Smart Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <RentalSmartSearch
            onSearchChange={setSearchQuery}
            onSuggestionSelect={(suggestion) => {
              setSearchQuery(suggestion.title);
              // Handle suggestion selection based on type
              if (suggestion.type === 'category') {
                setFilters({ ...filters, category: suggestion.title });
              }
            }}
            className="w-full max-w-3xl"
          />
        </motion.div>

        {/* Search and Sort */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={filters.sort}
          onSortChange={(sort) => setFilters({ ...filters, sort })}
        />

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isVisible={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(filters.categories?.length || 0) + 
                 (filters.locations?.length || 0) + 
                 (filters.brands?.length || 0) + 
                 (filters.type !== 'all' ? 1 : 0) > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {(filters.categories?.length || 0) + 
                     (filters.locations?.length || 0) + 
                     (filters.brands?.length || 0) + 
                     (filters.type !== 'all' ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {/* Product Grid */}
            <ProductGrid
              filters={filters}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}