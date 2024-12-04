import React from 'react';
import { Fish } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="block">
          <div className="flex flex-col items-center mb-8">
            <Fish className="w-12 h-12 text-[#FF6B35] mb-4" />
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};