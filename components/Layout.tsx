import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, History, User } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Hub' },
    { to: '/workouts', icon: Dumbbell, label: 'Train' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050508] text-slate-200 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-1 overflow-y-auto pb-24 z-10 relative">
        <div className="max-w-md mx-auto min-h-full">
           {children}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <NavLink 
                key={item.to} 
                to={item.to}
                className={({ isActive }) => 
                  `flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'text-orange-400 -translate-y-2' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`
                }
              >
                <div className={`relative ${isActive ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]' : ''}`}>
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>}
                </div>
                <span className={`text-[10px] font-bold mt-1 tracking-wide ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;