import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">BECOME A MALI WARRIOR</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Transform your body and mind with our warrior-inspired workout tracking system.
          Track your progress, conquer your goals, and unleash your inner warrior.
        </p>
        <Link
          to="/workouts"
          className="bg-yellow-500 text-black px-8 py-3 rounded-md flex items-center space-x-2 hover:bg-yellow-400 transition-colors"
        >
          <span>Start Training</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}