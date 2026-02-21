
import React from 'react';
import { Home, ShoppingBag, Scissors, ShoppingCart, UserCog } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, cartCount }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'tailoring', icon: Scissors, label: 'Bespoke' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', count: cartCount },
    { id: 'admin', icon: UserCog, label: 'Admin' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-royal/10 pb-6 pt-3 px-6 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-royal scale-110' : 'text-gray-400 hover:text-royal/60'
          }`}
        >
          <div className="relative">
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            {tab.count !== undefined && tab.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-luxuryOrange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {tab.count}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <div className="w-1 h-1 bg-elegantGold rounded-full mt-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
