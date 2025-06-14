"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  ShoppingBag,
  UserPlus,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Zap,
  Sparkles,
  TrendingUp,
  Gift,
  MapPin,
  Phone,
  Mail,
  Clock,
  Filter,
  Star,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your order has been shipped!", read: false, type: "order", time: "2 min ago" },
    { id: 2, message: "New arrivals in your favorite category", read: false, type: "promotion", time: "1 hour ago" },
    { id: 3, message: "Rental reminder: Return due tomorrow", read: true, type: "reminder", time: "3 hours ago" },
    { id: 4, message: "Flash sale: 50% off on designer wear", read: false, type: "sale", time: "5 hours ago" },
  ]);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const { getCartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setIsScrolled(currentScrollY > 10);
      
      // Header visibility logic
      if (currentScrollY < 10) {
        // Always show header at the top
        setIsHeaderVisible(true);
      } else if (isMenuOpen || isSearchFocused) {
        // Always show header when mobile menu is open or search is focused
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY || Math.abs(currentScrollY - lastScrollY) > 50) {
        // Scrolling up or significant scroll change - show header
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [lastScrollY, isMenuOpen, isSearchFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false); // Close mobile menu if open
      toast.success(`Searching for "${searchQuery.trim()}"`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleClearAllNotifications = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    toast.success('All notifications marked as read');
  };

  const navItems = [
    { 
      href: '/', 
      label: 'Home',
      description: 'Discover trending fashion'
    },
    { 
      href: '/shop', 
      label: 'Shop',
      description: 'Browse our collection'
    },
    { 
      href: '/rent', 
      label: 'Rent',
      description: 'Designer pieces on rent'
    },
    { 
      href: '/track', 
      label: 'Track Order',
      description: 'Track your shipment'
    },
    { 
      href: '/dashboard', 
      label: 'Rental Hub',
      description: 'AI-powered rental management'
    },
    { 
      href: '/vendors', 
      label: 'Become a Vendor',
      description: 'Start your business'
    },
    { 
      href: '/about', 
      label: 'About',
      description: 'Our story'
    },
    { 
      href: '/contact', 
      label: 'Contact',
      description: 'Get in touch'
    },
  ];

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)'
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
      >
        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">CloudWardrobe</span>
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4">
              <div className="flex items-center gap-1">
                {[
                  { href: '/shop', label: 'Shop' },
                  { href: '/rent', label: 'Rent' },
                  { href: '/vendors', label: 'Vendors' },
                  { href: '/track', label: 'Track Orders' },
                  { href: '/about', label: 'About' },
                  { href: '/contact', label: 'Contact' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-gray-50 text-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:block relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] pl-9 h-9"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Heart className="h-[18px] w-[18px]" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>

                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <ShoppingCart className="h-[18px] w-[18px]" />
                    {getCartItemsCount() > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                        {getCartItemsCount()}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Auth Menu */}
                <DropdownMenu open={isAuthMenuOpen} onOpenChange={setIsAuthMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                      {isAuthenticated ? (
                        <User className="h-[18px] w-[18px]" />
                      ) : (
                        <UserPlus className="h-[18px] w-[18px]" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    {isAuthenticated ? (
                      <>
                        <DropdownMenuLabel>
                          <div className="flex flex-col gap-1">
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>My Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/orders" className="flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            <span>My Orders</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout} className="text-red-600">
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <div className="px-2 py-1.5 text-sm text-gray-500">
                          Sign in or create an account
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/auth/login" className="cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            Customer Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/auth/vendor-login" className="cursor-pointer">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Vendor Login
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/auth/register" className="cursor-pointer">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Register as Customer
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/auth/vendor-register" className="cursor-pointer">
                            <Store className="h-4 w-4 mr-2" />
                            Register as Vendor
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-[18px] w-[18px]" />
                  ) : (
                    <Menu className="h-[18px] w-[18px]" />
                  )}
                </Button>
              </div>
            </div>
          </nav>
        </div>

        {/* Contact Bar - Moved below navbar */}
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-sm text-gray-600">
              <div className="flex items-center divide-x divide-gray-200">
                <div className="flex items-center gap-2 pr-4">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4">
                  <Mail className="h-3.5 w-3.5" />
                  <span>support@cloudwardrobe.com</span>
                </div>
                <div className="hidden lg:flex items-center gap-2 pl-4">
                  <Clock className="h-3.5 w-3.5" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Header Spacer */}
      <div className="h-[3.75rem]" />
    </AnimatePresence>
  );
}