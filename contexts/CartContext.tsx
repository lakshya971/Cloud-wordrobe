"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  vendor: string;
  type: 'rent' | 'buy';
  duration?: string;
  availableForRent?: boolean;
  availableForBuy?: boolean;
  rating?: number;
  reviews?: number;
  location?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, type: 'rent' | 'buy', quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isInCart: (id: number, type: 'rent' | 'buy') => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any, type: 'rent' | 'buy', quantity: number = 1) => {
    const price = type === 'rent' ? product.rentPrice : product.buyPrice;
    
    if (!price) {
      toast.error(`${type === 'rent' ? 'Rental' : 'Purchase'} not available for this item`);
      return;
    }

    // Create unique ID based on product ID and type
    const cartItemId = parseInt(`${product.id}${type === 'rent' ? '1' : '2'}`);
    
    const existingItem = cartItems.find(item => item.id === cartItemId);
    
    if (existingItem) {
      updateQuantity(cartItemId, existingItem.quantity + quantity);
      toast.success('Quantity updated in cart');
    } else {
      const newItem: CartItem = {
        id: cartItemId,
        name: product.name,
        image: product.image,
        price: price,
        originalPrice: product.buyPrice || price,
        quantity: quantity,
        vendor: product.vendor,
        type: type,
        duration: type === 'rent' ? '3 days' : undefined,
        availableForRent: product.availableForRent,
        availableForBuy: product.availableForBuy,
        rating: product.rating,
        reviews: product.reviews,
        location: product.location,
      };
      
      setCartItems(prev => [...prev, newItem]);
      toast.success(`Added to cart for ${type === 'rent' ? 'rent' : 'purchase'}`);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isInCart = (id: number, type: 'rent' | 'buy') => {
    const cartItemId = parseInt(`${id}${type === 'rent' ? '1' : '2'}`);
    return cartItems.some(item => item.id === cartItemId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
