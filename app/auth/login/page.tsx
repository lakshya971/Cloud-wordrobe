"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedButton from '@/components/ui/animated-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        // Use AuthContext login method
        login(data.token, data.user);
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center space-x-2">
                  <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Cloud Wardrobe
                  </span>
                </Link>
              </div>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <p className="text-muted-foreground">
                    Sign in to your account to continue shopping
                  </p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                          }
                        />
                        <label htmlFor="rememberMe" className="text-sm">
                          Remember me
                        </label>
                      </div>
                      <Link 
                        href="/auth/forgot-password" 
                        className="text-sm text-orange-500 hover:text-orange-600"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-center">
                      <AnimatedButton 
                        color="#f97316"
                        type="submit"
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </AnimatedButton>
                    </div>
                  </form>

                  <div className="mt-6">
                    <Separator className="my-4" />
                    
                    <p className="text-center text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link 
                        href="/auth/register" 
                        className="text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Links */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>
                  By signing in, you agree to our{' '}
                  <Link href="/terms" className="text-orange-500 hover:text-orange-600">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-orange-500 hover:text-orange-600">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}