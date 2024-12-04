import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-2 bg-[#2A2A2A] border rounded-lg',
          'text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent',
          error ? 'border-red-500' : 'border-[#3A3A3A]',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};