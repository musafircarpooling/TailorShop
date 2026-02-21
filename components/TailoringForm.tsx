
import React, { useState } from 'react';
import { Ruler, CheckCircle, ArrowRight, User, Phone, MapPin, Scissors } from 'lucide-react';
import Button from './Button';

const TailoringForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceType: 'Bespoke Suit',
    fabricPreference: 'Premium Cotton',
    chest: '',
    waist: '',
    length: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const inputClasses = "w-full bg-white border-2 border-royal/10 rounded-xl px-5 py-4 font-semibold text-royal focus:outline-none focus:border-elegantGold focus:ring-4 focus:ring-elegantGold/10 transition-all placeholder:text-gray-400";
  const labelClasses = "block text-royal font-bold text-xs uppercase tracking-[1px] mb-2 px-1";

  return (
    <section className="py-20 bg-creamLight">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-elegantGold font-bold uppercase tracking-[4px] text-sm block mb-4">Master Craftsmanship</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl luxury-heading text-royal">Bespoke Tailoring Service</h2>
          <div className="w-24 h-1 bg-elegantGold mx-auto mt-6 rounded-full" />
        </div>

        <div className="glass-card rounded-[32px] overflow-hidden shadow-2xl">
          {/* Progress Bar */}
          <div className="flex w-full h-2 bg-gray-100">
            <div 
              className="h-full bg-royal transition-all duration-700"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-royal text-white' : 'bg-gray-200 text-gray-400'}`}>1</div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Step 1</p>
                  <p className="text-xs font-bold text-royal">Your Details</p>
                </div>
              </div>
              <div className="w-12 h-[2px] bg-gray-100 hidden sm:block" />
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-royal text-white' : 'bg-gray-200 text-gray-400'}`}>2</div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Step 2</p>
                  <p className="text-xs font-bold text-royal">Measurements</p>
                </div>
              </div>
              <div className="w-12 h-[2px] bg-gray-100 hidden sm:block" />
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 3 ? 'bg-royal text-white' : 'bg-gray-200 text-gray-400'}`}>3</div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Step 3</p>
                  <p className="text-xs font-bold text-royal">Confirmation</p>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-royal/30" size={18} />
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Master Ali" 
                        className={`${inputClasses} pl-12`}
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-royal/30" size={18} />
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="+92 3XX XXXXXXX" 
                        className={`${inputClasses} pl-12`}
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Shipping Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-royal/30" size={18} />
                    <input 
                      type="text" 
                      name="address" 
                      placeholder="DHA Phase 6, Lahore" 
                      className={`${inputClasses} pl-12`}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <Button variant="primary" fullWidth onClick={nextStep}>
                    Next Step <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClasses}>Chest (Inches)</label>
                    <input 
                      type="number" 
                      name="chest" 
                      placeholder="38" 
                      className={inputClasses}
                      value={formData.chest}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Waist (Inches)</label>
                    <input 
                      type="number" 
                      name="waist" 
                      placeholder="32" 
                      className={inputClasses}
                      value={formData.waist}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Length (Inches)</label>
                    <input 
                      type="number" 
                      name="length" 
                      placeholder="40" 
                      className={inputClasses}
                      value={formData.length}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-8">
                  <Button variant="outline" className="w-1/3" onClick={prevStep}>Back</Button>
                  <Button variant="primary" className="flex-1" onClick={nextStep}>Review Order</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-24 h-24 bg-elegantGold/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle size={48} className="text-elegantGold" />
                </div>
                <h3 className="text-3xl luxury-heading text-royal mb-4">Request Received!</h3>
                <p className="text-royal/60 mb-8 max-w-md mx-auto">
                  Our master artisan will review your requirements for the <strong>{formData.serviceType}</strong> and contact you within 24 hours.
                </p>
                <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-elegantGold/30 text-left mb-8">
                  <h4 className="font-bold text-royal uppercase tracking-wider text-xs mb-4">Summary</h4>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-400">Name</span>
                    <span className="font-bold text-royal">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-400">Service</span>
                    <span className="font-bold text-royal">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Status</span>
                    <span className="text-luxuryOrange font-bold">Reviewing</span>
                  </div>
                </div>
                <Button variant="secondary" fullWidth onClick={() => setStep(1)}>
                  Submit Final Order
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TailoringForm;
