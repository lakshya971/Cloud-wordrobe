'use client';

import React, { useState } from 'react';
import Loader from '../../components/ui/loader';
import SimpleLoader from '../../components/ui/simple-loader';
import DelayedLoader from '../../components/ui/delayed-loader';
import HamsterLoader from '../../components/ui/hamster-loader';
import AnimatedLoader from '../../components/ui/animated-loader';

export default function LoaderDemoPage() {
  const [colorTheme, setColorTheme] = useState('#ff8c00');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cloud Wardrobe Loaders</h1>
          <p className="text-lg text-gray-600">A showcase of all available loader components</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Standard Loaders */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Standard Loader - Spinner</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <Loader variant="spinner" size="md" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Standard Loader - Hamster</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <Loader variant="hamster" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Simple Loader</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <SimpleLoader />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Hamster Loader</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <HamsterLoader />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Delayed Loader</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <DelayedLoader message="This will disappear..." minDelay={5000} />
            </div>
          </div>
          
          {/* New Animated Loaders */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Animated Loader - Ripple</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <AnimatedLoader variant="ripple" text="Loading..." color={colorTheme} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Animated Loader - Wave</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <AnimatedLoader variant="wave" text="Processing..." color={colorTheme} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Animated Loader - Progress</h2>
            <div className="flex justify-center items-center h-40 border border-gray-100 rounded-lg">
              <AnimatedLoader variant="progress" text="Please wait..." color={colorTheme} />
            </div>
          </div>
          
          {/* Color Theme Customizer */}
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Animated Loader Color</h2>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <input 
                  type="color" 
                  value={colorTheme}
                  onChange={(e) => setColorTheme(e.target.value)}
                  className="w-full h-12 cursor-pointer" 
                />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="flex justify-center">                  <AnimatedLoader variant="ripple" color={colorTheme} text="" />
                </div>
                <div className="flex justify-center">
                  <AnimatedLoader variant="wave" color={colorTheme} text="" />
                </div>
                <div className="flex justify-center">
                  <AnimatedLoader variant="progress" color={colorTheme} text="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
