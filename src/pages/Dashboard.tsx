import React from 'react';
import { useAuthStore } from '../store/authStore';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
      <p className="text-gray-400">Your workout dashboard is coming soon.</p>
    </div>
  );
};