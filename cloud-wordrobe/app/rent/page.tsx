"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/shop/product-grid';
import { FilterSidebar } from '@/components/shop/filter-sidebar';
import { SearchAndSort } from '@/components/shop/search-and-sort';
import { Button } from '@/components/ui/button';
import { Filter, Calendar, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RentPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000] as [number, number],
    location: '',
    type: 'rent' as 'all' | 'buy' | 'rent', // Only rent items
    sort: 'latest',
    categories: [] as string[],
    locations: [] as string[],
    brands: [] as string[],
  });

  const [searchQuery, setSearchQuery] = useState('');

  const rentalBenefits = [
    {
      icon: Calendar,
      title: 'Flexible Duration',
      description: 'Rent for 3 days to 30 days based on your needs',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All items are cleaned and quality checked before delivery',
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Same day delivery available in major cities',
    },
  ];

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
            Rent Fashion Items
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Access premium fashion without the premium price. Rent designer pieces for special occasions.
          </p>

          {/* Rental Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {rentalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4 text-center">
                    <benefit.icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Sort */}
        <SearchAndSort
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={filters.sort}
          onSortChange={(sort) => setFilters({ ...filters, sort })}
        />

        <div className="flex gap-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="mb-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isVisible={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
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