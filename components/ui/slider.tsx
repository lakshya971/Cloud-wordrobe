'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center group',
      className
    )}
    style={{
      WebkitTapHighlightColor: 'transparent',
    }}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 shadow-inner transform-gpu">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-75 ease-linear will-change-transform transform-gpu" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-3 border-white bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg ring-offset-background transition-transform duration-75 ease-linear will-change-transform transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 hover:shadow-xl hover:shadow-orange-200/50 active:scale-95 cursor-grab active:cursor-grabbing group-hover:shadow-xl" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
