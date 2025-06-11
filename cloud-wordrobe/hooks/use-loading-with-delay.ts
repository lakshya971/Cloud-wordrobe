'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseLoadingWithDelayOptions {
  minDelay?: number;
  initialLoading?: boolean;
}

export const useLoadingWithDelay = (options: UseLoadingWithDelayOptions = {}) => {
  const { minDelay = 1200, initialLoading = false } = options;
  
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [actualLoading, setActualLoading] = useState(initialLoading);
  const [minTimeElapsed, setMinTimeElapsed] = useState(!initialLoading);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setActualLoading(true);
    setMinTimeElapsed(false);
    
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDelay);

    return () => clearTimeout(timer);
  }, [minDelay]);

  const stopLoading = useCallback(() => {
    setActualLoading(false);
  }, []);

  useEffect(() => {
    if (!actualLoading && minTimeElapsed) {
      setIsLoading(false);
    }
  }, [actualLoading, minTimeElapsed]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    actualLoading
  };
};

export default useLoadingWithDelay;
