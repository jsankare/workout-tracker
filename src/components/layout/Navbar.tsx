import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, BarChart2, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const { logout } = useAuthStore();

  const navItems = [
    { to: '/dashboard', icon: Dumbbell, label: 'Workouts' },
    { to: '/stats', icon: BarChart2, label: 'Stats' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-surface fixed bottom-0 left-0 w-full md:w-20 md:h-screen md:top-0">
      <div className="flex md:flex-col justify-around md:justify-start items-center h-full py-2 md:py-8">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors ${
                isActive ? 'text-primary bg-surface-light' : 'text-gray-400 hover:text-primary hover:bg-surface-light'
              }`
            }
          >
            <div className="flex flex-col items-center">
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1 md:hidden">{label}</span>
            </div>
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="p-3 text-gray-400 hover:text-red-400 hover:bg-surface-light rounded-lg transition-colors mt-auto"
        >
          <div className="flex flex-col items-center">
            <LogOut className="w-6 h-6" />
            <span className="text-xs mt-1 md:hidden">Logout</span>
          </div>
        </button>
      </div>
    </nav>
  );
};