"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Store, Mail, Lock, User, Building, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function VendorRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement vendor registration logic
      // await registerVendor(formData);
      toast.success('Registration successful! Please wait for approval.');
      router.push('/auth/vendor-login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center"
          >
            <Store className="h-12 w-12 text-primary" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Register as a Vendor
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/vendor-login" className="text-primary hover:text-primary/90 font-medium">
              sign in to your vendor account
            </Link>
          </p>
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  name="businessName"
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Business Name"
                />
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  name="ownerName"
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Owner Name"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Email address"
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Phone Number"
                />
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Confirm Password"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              "Registering..."
            ) : (
              <>
                Register as Vendor <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center text-sm">
            <Link href="/auth/register" className="text-gray-600 hover:text-primary">
              Register as customer instead →
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
