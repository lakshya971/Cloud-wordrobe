'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './loader';

interface PageLoaderProps {
  isLoading?: boolean;
  message?: string;
  variant?: 'spinner' | 'hamster';
  size?: 'sm' | 'md' | 'lg';
  minDelay?: number;
  onComplete?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  message = "Loading...",
  variant = 'spinner',
  size = 'lg',
  minDelay = 1500,
  onComplete
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [loadingStates, setLoadingStates] = useState([
    { text: 'Initializing...', active: true },
    { text: 'Loading content...', active: false },
    { text: 'Preparing interface...', active: false },
    { text: 'Almost ready...', active: false }
  ]);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    // Simulate progressive loading states
    const stateInterval = setInterval(() => {
      setCurrentStateIndex(prev => {
        if (prev < loadingStates.length - 1) {
          setLoadingStates(states => 
            states.map((state, index) => ({
              ...state,
              active: index === prev + 1
            }))
          );
          return prev + 1;
        }
        return prev;
      });
    }, minDelay / 4);

    // Minimum loading time
    const timer = setTimeout(() => {
      if (!isLoading) {
        setShowLoader(false);
        if (onComplete) onComplete();
      }
    }, minDelay);

    return () => {
      clearInterval(stateInterval);
      clearTimeout(timer);
    };
  }, [isLoading, minDelay, onComplete, loadingStates.length]);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <Loader variant={variant} size={size} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Cloud Wardrobe
        </h2>
        
        <div className="space-y-2">
          {loadingStates.map((state, index) => (
            <p 
              key={index}
              className={`text-sm transition-all duration-300 ${
                state.active 
                  ? 'text-orange-600 font-medium animate-pulse' 
                  : index < currentStateIndex 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-400'
              }`}
            >
              {state.text}
            </p>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
          <div 
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStateIndex + 1) / loadingStates.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
