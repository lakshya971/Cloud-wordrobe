"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { CustomerDashboard } from '@/components/dashboard/customer-dashboard';
import { VendorDashboard } from '@/components/dashboard/vendor-dashboard';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import LoadingWrapper from '@/components/ui/loading-wrapper';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Please log in to access your dashboard');
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <LoadingWrapper
        isLoading={true}
        message="Loading your dashboard..."
        className="min-h-screen"
        variant="spinner"
        size="lg"
        minDelay={1500}
      >
        <div></div>
      </LoadingWrapper>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'customer':
      default:
        return <CustomerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'admin' 
              ? 'Manage your platform from the admin dashboard'
              : user.role === 'vendor'
              ? 'Track your sales and manage your products'
              : 'Manage your orders, rentals, and preferences'
            }
          </p>
        </div>
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
}