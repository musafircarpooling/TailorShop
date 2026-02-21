
import React from 'react';
import { Package, MapPin, Ruler, User, ArrowRight, LogOut } from 'lucide-react';
import { formatCurrency } from '../constants';
import { Order } from '../types';

interface AccountViewProps {
  externalOrders?: Order[];
}

const AccountView: React.FC<AccountViewProps> = ({ externalOrders }) => {
  const orders = externalOrders || [];

  const getStatusProgress = (status: string) => {
    switch(status) {
      case 'Order Placed': return 10;
      case 'Stitching': return 40;
      case 'Quality Check': return 70;
      case 'Dispatched': return 90;
      case 'Delivered': return 100;
      case 'Cancelled': return 0;
      default: return 0;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 mb-24">
      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-card rounded-[32px] p-8 text-center shadow-soft">
            <div className="w-24 h-24 bg-royal rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-elegantGold">
              <span className="text-3xl font-bold text-white">AK</span>
            </div>
            <h3 className="text-xl luxury-heading text-royal font-bold">Ali Khan</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Premium Member</p>
          </div>

          <nav className="glass-card rounded-[32px] overflow-hidden shadow-soft">
            <button className="w-full flex items-center gap-4 p-6 bg-royal text-white font-bold text-sm uppercase tracking-wider transition-all">
              <Package size={18} /> My Orders
            </button>
            <button className="w-full flex items-center gap-4 p-6 text-royal hover:bg-royal/5 font-bold text-sm uppercase tracking-wider transition-all">
              <Ruler size={18} /> Measurements
            </button>
            <div className="border-t border-royal/10">
              <button className="w-full flex items-center gap-4 p-6 text-luxuryOrange hover:bg-luxuryOrange/5 font-bold text-sm uppercase tracking-wider transition-all">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </nav>
        </div>

        <div className="lg:col-span-3 space-y-12">
          <section>
            <h2 className="text-3xl luxury-heading text-royal mb-8">Order History & Tracking</h2>
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-20 opacity-40">
                   <Package size={48} className="mx-auto mb-4" />
                   <p className="font-bold uppercase tracking-widest text-xs">No orders yet</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="glass-card rounded-[32px] p-8 shadow-soft">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                        <h4 className="text-xl font-bold text-royal">{order.id}</h4>
                      </div>
                      <div className={`flex items-center gap-3 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest ${
                        order.status === 'Cancelled' ? 'bg-red-50 text-red-500' : 'bg-luxuryOrange/10 text-luxuryOrange'
                      }`}>
                        {order.status !== 'Cancelled' && <div className="w-2 h-2 bg-luxuryOrange rounded-full animate-pulse" />}
                        {order.status}
                      </div>
                    </div>

                    {order.status !== 'Cancelled' && (
                      <div className="mb-10">
                        <div className="flex justify-between text-[8px] font-bold text-royal/40 uppercase tracking-widest mb-3">
                          <span>Placed</span>
                          <span>Stitching</span>
                          <span>Quality</span>
                          <span>Delivered</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-royal transition-all duration-1000" style={{ width: `${getStatusProgress(order.status)}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-6 border-t border-royal/5">
                      <p className="text-xs text-gray-500">{order.items.map(i => i.name).join(', ')}</p>
                      <p className="font-bold text-royal">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountView;
