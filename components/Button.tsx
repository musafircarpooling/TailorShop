
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-xl font-bold uppercase tracking-[1px] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm";
  
  const variants = {
    primary: "bg-royal text-white hover:bg-opacity-90 hover:scale-[1.03] shadow-lg shadow-purple-900/20",
    secondary: "bg-luxuryOrange text-white hover:bg-opacity-90 hover:scale-[1.03] shadow-lg shadow-orange-500/20",
    outline: "border-2 border-royal text-royal hover:bg-royal hover:text-white",
    ghost: "text-royal hover:bg-royal/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
