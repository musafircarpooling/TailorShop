
import React from 'react';
import { ShoppingBag, Heart, Clock } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../constants';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const hasSale = product.originalPrice && product.originalPrice > product.price;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative glass-card rounded-2xl overflow-hidden shadow-soft transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {hasSale && (
          <span className="absolute top-4 left-4 bg-luxuryOrange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow-lg">
            SALE
          </span>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-royal hover:bg-elegantGold hover:text-white transition-all shadow-md active:scale-90">
            <Heart size={16} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
           <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-royal shadow-sm">
             <Clock size={12} className="text-luxuryOrange" />
             {product.deliveryDays}
           </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-matteBlack/80 to-transparent">
          <button className="w-full bg-elegantGold text-white py-3 rounded-xl font-bold uppercase text-[10px] tracking-[2px] hover:bg-white hover:text-royal transition-all flex items-center justify-center gap-2">
            View Details
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-royal font-bold uppercase text-[9px] tracking-widest mb-1 opacity-60">
          {product.category}
        </p>
        <h3 className="luxury-heading text-base font-bold text-matteBlack mb-1 line-clamp-1 group-hover:text-royal transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-2">
          <p className="text-luxuryOrange font-bold text-base">
            {formatCurrency(product.price)}
          </p>
          {hasSale && (
            <p className="text-gray-400 line-through text-[10px] font-bold">
              {formatCurrency(product.originalPrice!)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
