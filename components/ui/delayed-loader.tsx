'use client';

import React, { useEffect, useState } from 'react';
import Loader from './loader';

interface DelayedLoaderProps {
  variant?: 'spinner' | 'hamster';
  size?: 'sm' | 'md' | 'lg';
  minDelay?: number; // minimum delay in milliseconds
  message?: string;
  className?: string;
}

const DelayedLoader: React.FC<DelayedLoaderProps> = ({ 
  variant = 'spinner',
  size = 'md',
  minDelay = 1500, // Default 1.5 seconds minimum
  message,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDelay);

    return () => clearTimeout(timer);
  }, [minDelay]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader variant={variant} size={size} />
      {message && (
        <p className="mt-4 text-lg text-gray-600 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default DelayedLoader;
