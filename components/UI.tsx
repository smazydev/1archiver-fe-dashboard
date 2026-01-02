import React from 'react';

// --- Badge ---
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-50 text-slate-600 border-slate-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles[variant]} inline-flex items-center`}>
      {children}
    </span>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-300",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-200",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 rounded",
    md: "text-sm px-4 py-2 rounded-md",
    lg: "text-base px-6 py-3 rounded-md",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; action?: React.ReactNode }> = ({ 
  children, 
  className = '',
  title,
  action
}) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// --- Stat Card ---
export const StatCard: React.FC<{ label: string; value: string | number; trend?: string; trendUp?: boolean; icon?: React.ReactNode }> = ({ label, value, trend, trendUp, icon }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-slate-900">{value}</span>
          {trend && (
            <span className={`text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
      {icon && <div className="text-slate-400">{icon}</div>}
    </div>
  </div>
);
