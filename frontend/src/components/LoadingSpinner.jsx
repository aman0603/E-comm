import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/2 w-full h-full -translate-x-1/2"
            style={{
              background: "linear-gradient(to right, #1f4037, #99f2c8)",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-300 mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-white mb-2">Loading...</h2>
        <p className="text-white/70">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;