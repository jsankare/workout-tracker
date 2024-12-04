import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Laptop } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <img 
            src="https://www.svgrepo.com/show/323318/sperm-whale.svg" 
            alt="Whale Logo" 
            className="w-20 h-20 text-[#FF6B35] mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Picard's Workout Tracker
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl">
            Your personal fitness journey starts here. Track your workouts, set goals,
            and achieve greatness with our intuitive workout tracking platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <img 
                src="https://www.svgrepo.com/show/323318/sperm-whale.svg" 
                alt="Whale Logo" 
                className="w-12 h-12 text-[#FF6B35] mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Workout Tracking</h3>
              <p className="text-gray-400">
                Log your exercises, sets, and reps with our intuitive interface.
              </p>
            </div>
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <Users className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">
                Connect with other fitness enthusiasts and share your progress.
              </p>
            </div>
            <div className="bg-[#2A2A2A] p-6 rounded-lg">
              <Laptop className="w-12 h-12 text-[#FF6B35] mb-4" />
              <h3 className="text-xl font-bold mb-2">Offline Access</h3>
              <p className="text-gray-400">
                Keep tracking your workouts even without internet connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};