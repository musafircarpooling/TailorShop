
import React, { useState } from 'react';
import { CreditCard, Truck, MapPin, CheckCircle } from 'lucide-react';
import Button from './Button';
import { CartItem } from '../types';
import { formatCurrency } from '../constants';

interface CheckoutViewProps {
  cart: CartItem[];
  onSuccess: (customerData: any) => void;
  onReturnHome: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onSuccess, onReturnHome }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery'
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOrderId = `#ZR-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(newOrderId);
      setIsProcessing(false);
      setIsComplete(true);
      onSuccess(formData);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="w-24 h-24 bg-elegantGold rounded-full flex items-center justify-center mx-auto mb-8 shadow-gold animate-bounce">
          <CheckCircle size={48} className="text-white" />
        </div>
        <h2 className="text-4xl luxury-heading text-royal mb-4">Order Confirmed!</h2>
        <p className="text-gray-500 mb-2">Thank you for choosing Zardozi Royale.</p>
        <p className="text-royal font-bold mb-12">Order ID: {orderId}</p>
        
        <div className="max-w-md mx-auto glass-card rounded-3xl p-8 text-left mb-12 border-2 border-dashed border-elegantGold/30">
          <h3 className="font-bold text-royal uppercase tracking-widest text-xs mb-6">Delivery Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Recipient</span>
              <span className="font-bold text-royal">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Address</span>
              <span className="font-bold text-royal text-right">{formData.address}, {formData.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Amount</span>
              <span className="font-bold text-elegantGold">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={onReturnHome}>
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full bg-white border-2 border-royal/10 rounded-xl px-5 py-4 font-semibold text-royal focus:outline-none focus:border-elegantGold focus:ring-4 focus:ring-elegantGold/10 transition-all placeholder:text-gray-300";
  const labelClasses = "block text-royal font-bold text-xs uppercase tracking-[1px] mb-2";

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl luxury-heading text-royal mb-12">Finalize Your Order</h2>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Shipping Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-elegantGold" />
              <h3 className="font-bold text-royal uppercase tracking-widest text-sm">Shipping Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Ali Khan" 
                  className={inputClasses} 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>Contact Number</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="+92 300 1234567" 
                  className={inputClasses} 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClasses}>Shipping Address</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Apt 4B, Emerald Heights, Gulberg III" 
                  className={inputClasses} 
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>City</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Lahore" 
                  className={inputClasses} 
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>Postal Code</label>
                <input 
                  required 
                  type="text" 
                  placeholder="54000" 
                  className={inputClasses} 
                  value={formData.postalCode}
                  onChange={e => setFormData({...formData, postalCode: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CreditCard className="text-elegantGold" />
              <h3 className="font-bold text-royal uppercase tracking-widest text-sm">Payment Method</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <input type="radio" name="payment" id="cod" className="peer hidden" defaultChecked />
                <label htmlFor="cod" className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-royal/10 rounded-2xl cursor-pointer peer-checked:border-royal peer-checked:bg-royal/5 transition-all">
                  <Truck className="text-royal" size={32} />
                  <span className="font-bold text-royal text-sm uppercase">Cash on Delivery</span>
                </label>
              </div>
              <div className="relative opacity-50">
                <input type="radio" name="payment" id="card" className="peer hidden" disabled />
                <label htmlFor="card" className="flex flex-col items-center gap-4 p-6 bg-white border-2 border-royal/10 rounded-2xl cursor-pointer peer-checked:border-royal transition-all">
                  <CreditCard className="text-royal" size={32} />
                  <span className="font-bold text-royal text-sm uppercase">Online Payment</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="glass-card rounded-[32px] p-8 shadow-soft h-fit">
          <h3 className="font-bold text-royal uppercase tracking-widest text-xs mb-8">Final Summary</h3>
          <div className="space-y-4 mb-12">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.name} x{item.quantity}</span>
                <span className="font-bold text-royal">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery Charges</span>
              <span className="font-bold text-royal">{formatCurrency(500)}</span>
            </div>
            <div className="pt-6 border-t border-royal/10 flex justify-between items-center">
              <span className="text-royal font-bold">Payable Amount</span>
              <span className="text-elegantGold text-2xl font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
          <Button 
            type="submit" 
            variant="secondary" 
            fullWidth 
            disabled={isProcessing}
            className={isProcessing ? 'animate-pulse' : ''}
          >
            {isProcessing ? 'Confirming Royal Order...' : 'Confirm Order'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutView;
