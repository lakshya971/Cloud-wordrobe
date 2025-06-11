"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, DollarSign, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCallback, useMemo, useRef } from 'react';

interface FilterState {
  category: string;
  priceRange: [number, number];
  location: string;
  type: 'all' | 'buy' | 'rent';
  sort: string;
  categories: string[];
  locations: string[];
  brands: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, isVisible, onClose }: FilterSidebarProps) {
  const categories = [
    'Ethnic Wear',
    'Western Wear', 
    'Party Wear',
    'Wedding Collection',
    'Casual Wear',
    'Formal Wear',
    'Accessories',
    'Footwear',
  ];

  const locations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Kolkata',
    'Ahmedabad',
  ];

  const brands = [
    'Fashion Hub',
    'Glamour Collection',
    'Style Street',
    'Bridal Dreams',
    'Urban Style',
    'Corporate Wear',
    'Traditional Elegance',
    'Night Out Fashion',
  ];

  // Optimized handlers using useCallback
  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter((c: string) => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  }, [filters, onFiltersChange]);

  const handleLocationChange = useCallback((location: string, checked: boolean) => {
    const currentLocations = filters.locations || [];
    const newLocations = checked
      ? [...currentLocations, location]
      : currentLocations.filter((l: string) => l !== location);
    
    onFiltersChange({
      ...filters,
      locations: newLocations,
    });
  }, [filters, onFiltersChange]);

  const handleBrandChange = useCallback((brand: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter((b: string) => b !== brand);
    
    onFiltersChange({
      ...filters,
      brands: newBrands,
    });
  }, [filters, onFiltersChange]);

  // Smooth price range change handler
  const handlePriceRangeChange = useCallback((value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    });
  }, [filters, onFiltersChange]);

  const handleTypeChange = useCallback((value: string) => {
    onFiltersChange({
      ...filters,
      type: value as 'all' | 'buy' | 'rent',
    });
  }, [filters, onFiltersChange]);

  const resetFilters = useCallback(() => {
    const defaultPriceRange = filters.type === 'rent' ? [0, 5000] : [0, 10000];
    onFiltersChange({
      category: '',
      priceRange: defaultPriceRange as [number, number],
      location: '',
      type: filters.type, // Keep current type (especially for rent page)
      sort: filters.sort, // Keep current sort
      categories: [],
      locations: [],
      brands: [],
    });
  }, [onFiltersChange, filters.sort, filters.type]);

  const activeFiltersCount = useMemo(() => {
    return (filters.categories?.length || 0) + 
           (filters.locations?.length || 0) + 
           (filters.brands?.length || 0) +
           (filters.type !== 'all' ? 1 : 0);
  }, [filters]);

  const FilterContent = () => (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              disabled={activeFiltersCount === 0}
            >
              Clear All
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Type Filter */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-orange-500" />
            Type
          </h3>
          <RadioGroup
            value={filters.type}
            onValueChange={handleTypeChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="cursor-pointer">All Items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy" className="cursor-pointer">Buy Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rent" id="rent" />
              <Label htmlFor="rent" className="cursor-pointer">Rent Only</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-orange-500" />
            Price Range {filters.type === 'rent' && <span className="text-xs text-muted-foreground">(per day)</span>}
          </h3>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={filters.type === 'rent' ? 5000 : 10000}
              min={0}
              step={filters.type === 'rent' ? 10 : 25}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0].toLocaleString()}</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-xs text-muted-foreground">
                Range: ₹{(filters.priceRange[1] - filters.priceRange[0]).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Tag className="h-4 w-4 text-orange-500" />
            Categories
            {filters.categories?.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.categories.length}
              </Badge>
            )}
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={(filters.categories || []).includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label 
                  htmlFor={`category-${category}`} 
                  className="text-sm cursor-pointer hover:text-orange-500 transition-colors"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-500" />
            Location
            {filters.locations?.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.locations.length}
              </Badge>
            )}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${location}`}
                  checked={(filters.locations || []).includes(location)}
                  onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                />
                <Label 
                  htmlFor={`location-${location}`} 
                  className="text-sm cursor-pointer hover:text-orange-500 transition-colors"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brands/Vendors */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Store className="h-4 w-4 text-orange-500" />
            Vendors
            {filters.brands?.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {filters.brands.length}
              </Badge>
            )}
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={(filters.brands || []).includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label 
                  htmlFor={`brand-${brand}`} 
                  className="text-sm cursor-pointer hover:text-orange-500 transition-colors"
                >
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filters.type !== 'all' && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.type === 'buy' ? 'Buy Only' : 'Rent Only'}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1 hover:bg-transparent"
                      onClick={() => handleTypeChange('all')}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                )}
                {filters.categories?.map((category: string) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1 hover:bg-transparent"
                      onClick={() => handleCategoryChange(category, false)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
                {filters.locations?.map((location: string) => (
                  <Badge key={location} variant="secondary" className="text-xs">
                    {location}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1 hover:bg-transparent"
                      onClick={() => handleLocationChange(location, false)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
                {filters.brands?.map((brand: string) => (
                  <Badge key={brand} variant="secondary" className="text-xs">
                    {brand}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 ml-1 hover:bg-transparent"
                      onClick={() => handleBrandChange(brand, false)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-4">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-background overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <FilterContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}