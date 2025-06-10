'use client';

import React, { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
  minDelay?: number; // minimum delay in milliseconds
  variant?: 'spinner' | 'hamster';
  size?: 'sm' | 'md' | 'lg';
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
  isLoading, 
  children, 
  message = "Loading...",
  className = "",
  minDelay = 1200,
  variant = 'spinner',
  size = 'md'
}) => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setMinTimeElapsed(false);
      
      const timer = setTimeout(() => {
        setMinTimeElapsed(true);
      }, minDelay);

      return () => clearTimeout(timer);
    } else if (minTimeElapsed) {
      setShowLoader(false);
    }
  }, [isLoading, minDelay, minTimeElapsed]);

  if (showLoader) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}>
        <Loader variant={variant} size={size} />
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{message}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
