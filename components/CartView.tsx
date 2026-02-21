
import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../constants';
import Button from './Button';

interface CartViewProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const CartView: React.FC<CartViewProps> = ({ items, onRemove, onUpdateQuantity, onCheckout, onContinueShopping }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-creamDark rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={40} className="text-royal/20" />
        </div>
        <h2 className="text-3xl luxury-heading text-royal mb-4">Your Bag is Empty</h2>
        <p className="text-gray-500 mb-12">Browse our collection and find something extraordinary.</p>
        <Button onClick={onContinueShopping}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onContinueShopping} className="p-2 hover:bg-royal/5 rounded-full transition-all">
          <ArrowLeft size={24} className="text-royal" />
        </button>
        <h2 className="text-4xl luxury-heading text-royal">Shopping Bag</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 shadow-soft">
              <div className="w-full sm:w-32 aspect-[3/4] rounded-xl overflow-hidden shrink-0">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-royal text-lg">{item.name}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-luxuryOrange transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Size:</span>
                  <span className="text-xs font-bold text-royal bg-royal/5 px-3 py-1 rounded-full">{item.size}</span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center gap-4 bg-white border border-royal/10 rounded-xl p-1">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2 hover:bg-royal/5 rounded-lg transition-all"><Minus size={14} /></button>
                    <span className="font-bold text-royal w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2 hover:bg-royal/5 rounded-lg transition-all"><Plus size={14} /></button>
                  </div>
                  <p className="text-luxuryOrange font-bold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-[32px] p-8 shadow-soft">
            <h3 className="font-bold text-royal uppercase tracking-widest text-xs mb-8">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-royal">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charges</span>
                <span className="font-bold text-royal">{formatCurrency(shipping)}</span>
              </div>
              <div className="pt-4 border-t border-royal/10 flex justify-between items-center">
                <span className="text-royal font-bold">Total</span>
                <span className="text-elegantGold text-2xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button variant="secondary" fullWidth onClick={onCheckout}>Proceed to Checkout</Button>
          </div>
          <div className="bg-elegantGold/5 rounded-2xl p-6 border border-elegantGold/20">
            <p className="text-[10px] font-bold text-elegantGold uppercase tracking-[2px] mb-2 text-center">Premium Craftsmanship Guarantee</p>
            <p className="text-[10px] text-royal/60 text-center leading-relaxed">Every piece is hand-checked for the perfect fit and zardozi precision before dispatch.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
