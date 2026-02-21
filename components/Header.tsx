
import React, { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: any) => void;
  cartCount: number;
  shopName: string;
  shopLogo?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartCount, shopName, shopLogo }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Profile Icon */}
        <button onClick={() => onNavigate('account')} className="p-2 text-royal hover:text-elegantGold transition-colors">
          <User size={22} />
        </button>

        {/* Logo */}
        <div className="text-center">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-royal/5 border border-royal/10 flex items-center justify-center shrink-0">
              {shopLogo ? (
                <img src={shopLogo} alt={shopName} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-royal to-elegantGold opacity-20" />
              )}
            </div>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tighter luxury-heading text-royal">
              {shopName.toUpperCase().split(' ')[0]} <span className="text-elegantGold italic">{shopName.split(' ')[1] || ''}</span>
            </h1>
          </button>
        </div>

        {/* Search Icon */}
        <button className="p-2 text-royal hover:text-elegantGold transition-colors">
          <Search size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
