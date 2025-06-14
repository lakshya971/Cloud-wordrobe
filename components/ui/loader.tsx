'use client';

import React from 'react';
import HamsterLoader from './hamster-loader';

interface LoaderProps {
  variant?: 'spinner' | 'hamster';
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ variant = 'spinner', size = 'md' }) => {
  if (variant === 'hamster') {
    return (
      <div className="flex items-center justify-center">
        <HamsterLoader />
      </div>
    );
  }

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-32 w-32', 
    lg: 'h-48 w-48'
  };
  return (    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-b-2 border-orange-500 ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default Loader;
