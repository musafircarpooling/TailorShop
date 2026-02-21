
import React, { useState } from 'react';
import { ArrowLeft, Clock, ShoppingBag, Ruler, Image as ImageIcon, Check } from 'lucide-react';
import { Product, CartItem } from '../types';
import { formatCurrency } from '../constants';
import Button from './Button';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('M');
  const [showCustom, setShowCustom] = useState(false);
  const [measurements, setMeasurements] = useState({ chest: '', waist: '', length: '', shoulders: '' });

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];

  const handleAddToCart = () => {
    const item: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      measurements: selectedSize === 'Custom' ? measurements : undefined,
      quantity: 1
    };
    onAddToCart(item);
  };

  const inputClasses = "w-full bg-white border-2 border-royal/10 rounded-xl px-4 py-3 font-semibold text-royal focus:outline-none focus:border-elegantGold focus:ring-4 focus:ring-elegantGold/10 transition-all placeholder:text-gray-300 text-sm";
  const labelClasses = "block text-royal font-bold text-[10px] uppercase tracking-[1px] mb-2";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden glass-card">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-royal font-bold text-xs shadow-lg">
                <Clock size={14} className="text-luxuryOrange" />
                {product.deliveryDays} Delivery
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {(product.gallery || [product.image]).map((img, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-24 h-32 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-elegantGold scale-105' : 'border-transparent opacity-70'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <p className="text-royal font-bold uppercase tracking-[4px] text-xs mb-4 opacity-60">{product.category}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl luxury-heading text-royal mb-6 leading-tight">{product.name}</h1>
          <p className="text-elegantGold text-3xl font-bold mb-8">{formatCurrency(product.price)}</p>
          
          <div className="bg-white/50 border border-royal/5 p-6 rounded-2xl mb-10">
            <h4 className="font-bold text-royal mb-2 uppercase text-xs tracking-wider">Description</h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-royal uppercase text-xs tracking-wider">Select Size</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    if (size === 'Custom') setShowCustom(true);
                  }}
                  className={`min-w-[60px] h-[50px] rounded-xl font-bold transition-all flex items-center justify-center ${selectedSize === size ? 'bg-royal text-white shadow-xl scale-110' : 'bg-white border border-royal/10 text-royal hover:border-royal'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {selectedSize === 'Custom' && (
            <div className="bg-royal/5 p-6 rounded-[24px] border border-royal/10 mb-10 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Ruler size={20} className="text-elegantGold" />
                <h4 className="font-bold text-royal uppercase text-xs tracking-wider">Custom Measurements (Inches)</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Chest</label>
                  <input type="number" placeholder="38" className={inputClasses} onChange={e => setMeasurements({...measurements, chest: e.target.value})} />
                </div>
                <div>
                  <label className={labelClasses}>Waist</label>
                  <input type="number" placeholder="32" className={inputClasses} onChange={e => setMeasurements({...measurements, waist: e.target.value})} />
                </div>
                <div>
                  <label className={labelClasses}>Length</label>
                  <input type="number" placeholder="42" className={inputClasses} onChange={e => setMeasurements({...measurements, length: e.target.value})} />
                </div>
                <div>
                  <label className={labelClasses}>Shoulders</label>
                  <input type="number" placeholder="18" className={inputClasses} onChange={e => setMeasurements({...measurements, shoulders: e.target.value})} />
                </div>
              </div>
              <button className="mt-6 w-full py-4 border-2 border-dashed border-elegantGold/50 rounded-xl flex items-center justify-center gap-3 text-elegantGold font-bold text-xs hover:bg-elegantGold/5 transition-all">
                <ImageIcon size={18} /> UPLOAD REFERENCE IMAGE
              </button>
            </div>
          )}

          <div className="mt-auto pt-8 flex gap-4">
            <Button 
              className="flex-1 h-16 bg-gradient-to-r from-royal to-luxuryOrange text-white border-none"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} /> ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
