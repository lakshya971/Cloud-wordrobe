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
  Star
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
    <motion.header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isHeaderVisible 
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' 
          : 'bg-transparent'
      } ${
        isScrolled ? 'shadow-lg border-orange-200/50' : 'border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ 
        y: isHeaderVisible ? 0 : -100,
        opacity: isHeaderVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.1, 0.25, 1.0] // Custom easing for smooth animation
      }}
      style={{
        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="container mx-auto py-4 px-4">
        <div className="flex h-16 items-center gap-5 justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative h-10 w-10 bg-gradient-to-br from-orange-500 via-orange-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-wasted-vindey tracking-wide">
                  Cloud Wardrobe
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Smart Fashion Hub</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-lg relative flex items-center gap-2 ${
                    pathname === item.href
                      ? 'text-orange-600 bg-orange-50 border border-orange-200'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
                
                {/* Hover Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 0, y: 10, scale: 0.9 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 z-50"
                >
                  {item.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
                </motion.div>
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <motion.form 
              onSubmit={handleSearch} 
              className="relative flex-1 group"
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-orange-500 transition-colors" />
              <Input
                placeholder="Search for products, brands, designers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-12 pr-12 h-11 rounded-full border-2 transition-all duration-200 bg-gray-50 focus:bg-white ${
                  isSearchFocused ? 'ring-2 ring-orange-200 border-orange-300 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
              />
              {searchQuery ? (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    className="h-7 w-7 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </motion.div>
              ) : (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-orange-100 rounded-full"
                  >
                    <Filter className="h-3 w-3 text-orange-500" />
                  </Button>
                </div>
              )}
              
              {/* Search Suggestions */}
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50"
                >
                  <div className="text-xs text-gray-500 mb-2">Popular Searches</div>
                  <div className="flex flex-wrap gap-2">
                    {['Designer Sarees', 'Wedding Lehenga', 'Party Wear', 'Casual Shirts', 'Ethnic Wear'].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearch({ preventDefault: () => {} } as any);
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-orange-100 rounded-full text-xs text-gray-700 hover:text-orange-700 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 animate-pulse">
                          {unreadNotifications}
                        </Badge>
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 max-h-96 overflow-y-auto">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {unreadNotifications} new
                    </Badge>
                    {notifications.length > 0 && (
                      <div className="flex space-x-1">
                        {unreadNotifications > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 h-auto"
                          >
                            Mark All Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleClearAllNotifications}
                          className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 h-auto"
                        >
                          Clear All
                        </Button>
                      </div>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 mb-1">No notifications</p>
                    <p className="text-xs text-gray-400">You&apos;re all caught up!</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id} 
                      className={`p-4 flex items-start space-x-3 cursor-pointer ${
                        !notification.read ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.type === 'order' ? 'bg-green-500' :
                        notification.type === 'promotion' ? 'bg-blue-500' :
                        notification.type === 'reminder' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </DropdownMenuItem>
                  ))
                )}
                {notifications.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center py-3">
                      <Link href="/notifications" className="text-orange-500 text-sm font-medium hover:text-orange-600">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-pink-50 group" 
                onClick={() => router.push('/wishlist')}
              >
                <Heart className="h-5 w-5 group-hover:text-pink-500 transition-colors" />
                {wishlistCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-pink-500 text-white">
                      {wishlistCount}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-orange-50 group" 
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
                {getCartItemsCount() > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 animate-bounce">
                      {getCartItemsCount()}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="relative h-10 px-3 hover:bg-gray-50">
                    {isAuthenticated && user ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="hidden sm:flex flex-col items-start">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-muted-foreground">Welcome back!</span>
                        </div>
                        <ChevronDown className="h-4 w-4 hidden sm:block" />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span className="hidden sm:block text-sm font-medium">Account</span>
                        <ChevronDown className="h-4 w-4 hidden sm:block" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {isAuthenticated && user ? (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
                      <User className="mr-3 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard?tab=orders')} className="cursor-pointer">
                      <ShoppingBag className="mr-3 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard?tab=wishlist')} className="cursor-pointer">
                      <Heart className="mr-3 h-4 w-4" />
                      <span>Wishlist</span>
                      <Badge className="ml-auto bg-pink-100 text-pink-700">{wishlistCount}</Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/dashboard?tab=settings')} className="cursor-pointer">
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Get Started</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/auth/login')} className="cursor-pointer">
                      <User className="mr-3 h-4 w-4" />
                      <span>Login</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/auth/register')} className="cursor-pointer">
                      <UserPlus className="mr-3 h-4 w-4" />
                      <span>Create Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push('/shop')} className="cursor-pointer">
                      <ShoppingBag className="mr-3 h-4 w-4" />
                      <span>Browse Products</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/vendors')} className="cursor-pointer">
                      <TrendingUp className="mr-3 h-4 w-4" />
                      <span>Become a Vendor</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
            >
              <div className="py-4 px-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-10 pr-4"
                  />
                </form>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-1 mb-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-all py-3 px-4 rounded-xl flex items-center justify-between group ${
                          pathname === item.href
                            ? 'bg-gradient-to-r from-orange-50 to-pink-50 text-orange-600 border border-orange-200 shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            <span className="text-xs text-gray-500">{item.description}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {pathname === item.href && <Sparkles className="h-4 w-4 text-orange-500" />}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center justify-center space-x-2 h-12 border-2 hover:bg-pink-50 hover:border-pink-200"
                      onClick={() => {
                        router.push('/wishlist');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Heart className="h-5 w-5 text-pink-500" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Wishlist</span>
                        <span className="text-xs text-gray-500">{wishlistCount} items</span>
                      </div>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center justify-center space-x-2 h-12 border-2 hover:bg-orange-50 hover:border-orange-200"
                      onClick={() => {
                        router.push('/cart');
                        setIsMenuOpen(false);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 text-orange-500" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">Cart</span>
                        <span className="text-xs text-gray-500">{getCartItemsCount()} items</span>
                      </div>
                    </Button>
                  </motion.div>
                  {isAuthenticated && user ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="col-span-2"
                    >
                      <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-3 w-full h-12 border-2 hover:bg-gray-50"
                        onClick={() => {
                          router.push('/dashboard');
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-gray-500">View Dashboard</span>
                        </div>
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Button
                          variant="outline"
                          className="h-12"
                          onClick={() => {
                            router.push('/auth/login');
                            setIsMenuOpen(false);
                          }}
                        >
                          Login
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button
                          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 h-12"
                          onClick={() => {
                            router.push('/auth/register');
                            setIsMenuOpen(false);
                          }}
                        >
                          Sign Up
                        </Button>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Floating Quick Access - Shows when header is hidden */}
      <AnimatePresence>
        {!isHeaderVisible && isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-40 flex items-center gap-2"
          >
            {/* Quick Cart Access */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="default"
                size="icon"
                className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
            </motion.div>
            
            {/* Quick Wishlist Access */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="default"
                size="icon"
                className="h-12 w-12 rounded-full bg-pink-500 hover:bg-pink-600 shadow-lg"
                onClick={() => router.push('/wishlist')}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </motion.div>

            {/* Back to Top */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="secondary"
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ChevronDown className="h-5 w-5 rotate-180" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}