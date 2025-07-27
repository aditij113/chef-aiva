import React from 'react';

interface LoadingSpinnerProps {
    title?: string;
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="w-16 h-16 border-8 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="mt-6 text-xl font-bold text-gray-700">{title || 'Chef Aiva is thinking...'}</p>
      <p className="text-base text-gray-500">{message || 'Please wait a moment.'}</p>
    </div>
  );
};

export default LoadingSpinner;