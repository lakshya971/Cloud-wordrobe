"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  vendor: string;
  available: boolean;
  category?: string;
  location?: string;
  rating?: number;
  reviews?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    } else {
      // Initialize with default items if no saved wishlist
      const defaultItems: WishlistItem[] = [
        {
          id: 1,
          name: "Designer Ethnic Wear",
          image: "https://images.pexels.com/photos/8838675/pexels-photo-8838675.jpeg?auto=compress&cs=tinysrgb&w=400",
          price: 299,
          originalPrice: 599,
          vendor: "Fashion Hub",
          available: true,
          category: "Ethnic Wear",
          location: "Mumbai",
          rating: 4.8,
          reviews: 124
        },
        {
          id: 2,
          name: "Casual Summer Outfit",
          image: "https://images.pexels.com/photos/5710017/pexels-photo-5710017.jpeg?auto=compress&cs=tinysrgb&w=400",
          price: 199,
          originalPrice: 399,
          vendor: "Style Store",
          available: true,
          category: "Western Wear",
          location: "Delhi",
          rating: 4.6,
          reviews: 67
        },
      ];
      setWishlistItems(defaultItems);
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.find(wishlistItem => wishlistItem.id === item.id);
      if (exists) {
        return prev; // Item already in wishlist
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (itemId: number) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  const wishlistCount = wishlistItems.length;

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
