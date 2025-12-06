import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }> = ({ 
  className, 
  variant = 'primary', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-blue-200 border border-slate-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-400',
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-bold tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-slate-900/80 border border-slate-800 rounded-xl p-4 backdrop-blur-sm', className)} {...props} />
);

export const ProgressBar: React.FC<{ current: number; max: number; colorClass?: string }> = ({ current, max, colorClass = 'bg-blue-500' }) => {
  const percentage = Math.min((current / max) * 100, 100);
  return (
    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
      <div 
        className={cn('h-full transition-all duration-500 relative', colorClass)} 
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-slate-700' }) => (
  <span className={cn('px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider', color)}>
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input 
    className={cn('bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors', className)} 
    {...props} 
  />
);