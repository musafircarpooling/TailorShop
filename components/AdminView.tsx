
import React, { useState, useRef } from 'react';
import { 
  PlusCircle, ImageIcon, CheckCircle, Package, 
  Tag, LayoutGrid, Settings, ShoppingBag, Trash2, Edit2, 
  Upload, ChevronRight, X, Menu
} from 'lucide-react';
import Button from './Button';
import { Product, Order, OrderStatus, ShopInfo, Deal } from '../types';
import { formatCurrency } from '../constants';

interface AdminViewProps {
  products: Product[];
  categories: string[];
  orders: Order[];
  shopInfo: ShopInfo;
  deals: Deal[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onUpdateShopInfo: (info: ShopInfo) => void;
  onAddDeal: (deal: Deal) => void;
  onDeleteDeal: (id: string) => void;
}

const FONTS = [
  'Poppins', 'Playfair Display', 'Inter', 'Montserrat', 'Roboto', 
  'Lato', 'Open Sans', 'Oswald', 'Raleway', 'Merriweather', 
  'Nunito', 'Ubuntu', 'PT Sans', 'PT Serif', 'Cormorant Garamond', 
  'Libre Baskerville', 'Cinzel', 'Marcellus', 'Bodoni Moda', 'Lora'
];

const THEME_PRESETS = [
  { name: 'Royal Purple', primary: '#4B0082', secondary: '#D4AF37', accent: '#FF6A00' },
  { name: 'Emerald Green', primary: '#006400', secondary: '#C0C0C0', accent: '#FFD700' },
  { name: 'Midnight Blue', primary: '#191970', secondary: '#E5E4E2', accent: '#00CED1' },
  { name: 'Ruby Red', primary: '#8B0000', secondary: '#FFD700', accent: '#FF4500' },
  { name: 'Charcoal Gold', primary: '#333333', secondary: '#D4AF37', accent: '#FFFFFF' },
  { name: 'Rose Gold', primary: '#B76E79', secondary: '#E0B0FF', accent: '#FFFFFF' }
];

const AdminView: React.FC<AdminViewProps> = ({ 
  products, categories, orders, shopInfo, deals,
  onAddProduct, onUpdateProduct, onDeleteProduct,
  onUpdateOrderStatus, onAddCategory, onDeleteCategory,
  onUpdateShopInfo, onAddDeal, onDeleteDeal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'orders' | 'products' | 'categories' | 'deals' | 'shop'>('dashboard');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Local state for Shop Settings to allow "Save All Changes" behavior
  const [localShopInfo, setLocalShopInfo] = useState<ShopInfo>(shopInfo);
  
  // Form States
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, originalPrice: 0, category: 'Luxury Pret', deliveryDays: '10-15 Days', description: '', image: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({ title: '', discount: '', image: '' });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const dealInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    onAddProduct({
      ...newProduct as Product,
      id: `p-${Date.now()}`,
      isNew: true
    });
    setNewProduct({ name: '', price: 0, originalPrice: 0, category: 'Luxury Pret', deliveryDays: '10-15 Days', description: '', image: '' });
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveShopSettings = () => {
    onUpdateShopInfo(localShopInfo);
    triggerSuccess();
  };

  const inputClasses = "w-full bg-white border-2 border-royal/10 rounded-xl px-5 py-4 font-semibold text-royal focus:outline-none focus:border-elegantGold transition-all text-sm";
  const labelClasses = "block text-royal font-bold text-[10px] uppercase tracking-[2px] mb-2";

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeSubTab, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setActiveSubTab(id);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeSubTab === id ? 'bg-royal text-white shadow-lg' : 'text-royal/60 hover:bg-royal/5'}`}
    >
      <Icon size={20} />
      <span className="font-bold text-xs uppercase tracking-wider">{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8 mb-24 relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 bg-white shadow-md rounded-xl text-royal flex items-center gap-2"
        >
          <Menu size={20} />
          <span className="font-bold text-xs uppercase tracking-widest">Admin Menu</span>
        </button>
        <div className="text-right">
          <h3 className="font-bold text-royal luxury-heading text-sm">{shopInfo.name}</h3>
          <p className="text-[8px] font-bold text-elegantGold uppercase tracking-[1px]">Admin Portal</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-matteBlack/40 backdrop-blur-sm z-[100] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Admin Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 w-72 lg:w-64 bg-creamLight lg:bg-transparent z-[101] lg:z-0
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out
          flex-shrink-0 p-6 lg:p-0 space-y-2 shadow-2xl lg:shadow-none
        `}>
          <div className="flex justify-between items-center lg:hidden mb-8">
            <h3 className="luxury-heading text-xl text-royal">Menu</h3>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 bg-royal/5 rounded-full text-royal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="glass-card rounded-[32px] p-6 mb-6 text-center hidden lg:block">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-white border-2 border-elegantGold flex items-center justify-center">
              {shopInfo.logo ? <img src={shopInfo.logo} className="w-full h-full object-contain" /> : <Settings className="text-royal/20" />}
            </div>
            <h3 className="font-bold text-royal luxury-heading text-lg">{shopInfo.name}</h3>
            <p className="text-[10px] font-bold text-elegantGold uppercase tracking-[2px]">Admin Portal</p>
          </div>
          
          <div className="space-y-2">
            <SidebarItem id="dashboard" icon={LayoutGrid} label="Overview" />
            <SidebarItem id="orders" icon={Package} label="Orders" />
            <SidebarItem id="products" icon={ShoppingBag} label="Products" />
            <SidebarItem id="categories" icon={Tag} label="Categories" />
            <SidebarItem id="deals" icon={PlusCircle} label="Deals" />
            <SidebarItem id="shop" icon={Settings} label="Shop Setup" />
          </div>
        </aside>

        {/* Main Admin Content */}
        <main className="flex-1">
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-4 text-green-700 animate-fade-in shadow-sm">
              <CheckCircle size={20} />
              <p className="font-bold text-sm">Action completed successfully!</p>
            </div>
          )}

          {activeSubTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="glass-card p-8 rounded-[32px] text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Total Orders</p>
                <h4 className="text-4xl luxury-heading text-royal">{orders.length}</h4>
              </div>
              <div className="glass-card p-8 rounded-[32px] text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Revenue</p>
                <h4 className="text-4xl luxury-heading text-elegantGold">{formatCurrency(orders.reduce((s,o) => s+o.total, 0))}</h4>
              </div>
              <div className="glass-card p-8 rounded-[32px] text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Inventory</p>
                <h4 className="text-4xl luxury-heading text-royal">{products.length}</h4>
              </div>
            </div>
          )}

          {activeSubTab === 'orders' && (
            <div className="glass-card rounded-[32px] overflow-hidden shadow-xl animate-fade-in">
              <div className="p-6 border-b border-royal/5 flex justify-between items-center">
                <h3 className="luxury-heading text-xl text-royal">Order Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-royal/5 text-[10px] font-bold text-royal/40 uppercase tracking-[2px]">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-royal/5">
                    {orders.map(order => (
                      <tr key={order.id} className="text-sm">
                        <td className="px-6 py-4 font-bold text-royal">{order.id}</td>
                        <td className="px-6 py-4">{order.customerName}</td>
                        <td className="px-6 py-4 font-bold">{formatCurrency(order.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-luxuryOrange/10 text-luxuryOrange'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            className="bg-white border border-royal/10 rounded-lg text-xs p-1 focus:outline-none focus:border-elegantGold"
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Stitching">Stitching</option>
                            <option value="Quality Check">Quality Check</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === 'products' && (
            <div className="space-y-8 animate-fade-in">
              <div className="glass-card p-8 rounded-[32px] shadow-xl">
                <h3 className="luxury-heading text-xl text-royal mb-6">Upload New Design</h3>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Product Name</label>
                      <input required type="text" className={inputClasses} value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Category</label>
                      <select className={inputClasses} value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                        {categories.map(c => c !== 'All' && <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Price (PKR)</label>
                      <input required type="number" className={inputClasses} value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Original Price (PKR) - Optional</label>
                      <input type="number" className={inputClasses} value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: parseInt(e.target.value)})} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Product Image</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-40 border-2 border-dashed border-royal/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-elegantGold hover:bg-elegantGold/5 transition-all overflow-hidden"
                      >
                        {newProduct.image ? (
                          <img src={newProduct.image} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="text-royal/20 mb-2" />
                            <span className="text-xs text-royal/40 font-bold uppercase">Upload Photo</span>
                          </>
                        )}
                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (base64) => setNewProduct({...newProduct, image: base64}))} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>Description</label>
                      <textarea rows={6} className={`${inputClasses} resize-none`} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                    </div>
                  </div>
                  <Button type="submit" variant="primary" fullWidth>Create Stitched Item</Button>
                </form>
              </div>

              <div className="glass-card rounded-[32px] overflow-hidden">
                 <div className="p-6 bg-royal/5"><h4 className="font-bold text-royal uppercase tracking-widest text-xs">Manage Inventory</h4></div>
                 <div className="divide-y divide-royal/5">
                    {products.map(p => (
                      <div key={p.id} className="p-4 flex items-center justify-between hover:bg-royal/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-12 h-16 object-cover rounded-lg" />
                          <div>
                            <h5 className="font-bold text-royal text-sm">{p.name}</h5>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{p.category} • {formatCurrency(p.price)}</p>
                          </div>
                        </div>
                        <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {activeSubTab === 'categories' && (
            <div className="space-y-8 animate-fade-in">
              <div className="glass-card p-8 rounded-[32px] shadow-xl">
                <h3 className="luxury-heading text-xl text-royal mb-6">Manage Categories</h3>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="e.g., Traditional Wear" 
                    className={inputClasses} 
                    value={newCategory} 
                    onChange={e => setNewCategory(e.target.value)}
                  />
                  <Button onClick={() => { if(newCategory){ onAddCategory(newCategory); setNewCategory(''); triggerSuccess(); } }}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(c => c !== 'All' && (
                  <div key={c} className="glass-card p-6 rounded-2xl flex justify-between items-center group">
                    <span className="font-bold text-royal uppercase tracking-widest text-xs">{c}</span>
                    <button onClick={() => onDeleteCategory(c)} className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'deals' && (
            <div className="space-y-8 animate-fade-in">
               <div className="glass-card p-8 rounded-[32px] shadow-xl">
                <h3 className="luxury-heading text-xl text-royal mb-6">Create New Deal</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Deal Title (e.g., Eid Special)" className={inputClasses} value={newDeal.title} onChange={e => setNewDeal({...newDeal, title: e.target.value})} />
                    <input type="text" placeholder="Discount (e.g., 20% OFF)" className={inputClasses} value={newDeal.discount} onChange={e => setNewDeal({...newDeal, discount: e.target.value})} />
                  </div>
                  <div 
                    onClick={() => dealInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-royal/10 rounded-2xl flex items-center justify-center cursor-pointer hover:border-elegantGold transition-all overflow-hidden"
                  >
                    {newDeal.image ? <img src={newDeal.image} className="w-full h-full object-cover" /> : <span className="text-xs text-royal/40 uppercase font-bold">Upload Banner</span>}
                    <input ref={dealInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (base64) => setNewDeal({...newDeal, image: base64}))} />
                  </div>
                  <Button fullWidth onClick={() => { if(newDeal.title && newDeal.image){ onAddDeal({...newDeal, id: Date.now().toString()} as Deal); setNewDeal({title:'', discount:'', image:''}); triggerSuccess(); } }}>
                    Publish Deal
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {deals.map(deal => (
                  <div key={deal.id} className="relative rounded-[24px] overflow-hidden group">
                    <img src={deal.image} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-matteBlack/60 flex flex-col justify-center items-center text-white p-6">
                      <h5 className="luxury-heading text-2xl">{deal.title}</h5>
                      <p className="text-elegantGold font-bold text-xl">{deal.discount}</p>
                      <button onClick={() => onDeleteDeal(deal.id)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-500 rounded-full transition-all">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'shop' && (
            <div className="glass-card p-8 rounded-[32px] shadow-xl animate-fade-in">
              <h3 className="luxury-heading text-xl text-royal mb-6">Store Setup</h3>
              <div className="space-y-8">
                <div>
                  <label className={labelClasses}>Shop Branding</label>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div 
                      onClick={() => logoInputRef.current?.click()}
                      className="w-24 h-24 rounded-[24px] border-2 border-dashed border-royal/10 flex items-center justify-center cursor-pointer hover:border-elegantGold overflow-hidden bg-white shrink-0"
                    >
                      {localShopInfo.logo ? <img src={localShopInfo.logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-royal/20" />}
                      <input ref={logoInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (base64) => setLocalShopInfo({...localShopInfo, logo: base64}))} />
                    </div>
                    <div className="flex-1 w-full">
                      <input 
                        type="text" 
                        placeholder="Shop Name" 
                        className={inputClasses} 
                        value={localShopInfo.name} 
                        onChange={e => setLocalShopInfo({...localShopInfo, name: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClasses}>Global Typography</label>
                    <select 
                      className={inputClasses}
                      value={localShopInfo.fontFamily}
                      onChange={e => setLocalShopInfo({...localShopInfo, fontFamily: e.target.value})}
                    >
                      {FONTS.map(font => (
                        <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                      ))}
                    </select>
                    <p className="mt-2 text-[10px] text-gray-400 italic">Select from 20 premium Google Fonts</p>
                  </div>

                  <div>
                    <label className={labelClasses}>Theme Presets</label>
                    <div className="grid grid-cols-3 gap-2">
                      {THEME_PRESETS.map(theme => (
                        <button
                          key={theme.name}
                          onClick={() => setLocalShopInfo({
                            ...localShopInfo,
                            primaryColor: theme.primary,
                            secondaryColor: theme.secondary,
                            accentColor: theme.accent
                          })}
                          className={`p-2 rounded-xl border-2 transition-all text-[8px] font-bold uppercase ${localShopInfo.primaryColor === theme.primary ? 'border-elegantGold bg-royal/5' : 'border-royal/5 hover:border-royal/20'}`}
                        >
                          <div className="flex gap-1 mb-1 justify-center">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
                          </div>
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClasses}>Primary Color</label>
                    <div className="flex gap-3 items-center">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded-xl border-none cursor-pointer" 
                        value={localShopInfo.primaryColor} 
                        onChange={e => setLocalShopInfo({...localShopInfo, primaryColor: e.target.value})} 
                      />
                      <input type="text" className={`${inputClasses} py-2`} value={localShopInfo.primaryColor} onChange={e => setLocalShopInfo({...localShopInfo, primaryColor: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Secondary Color</label>
                    <div className="flex gap-3 items-center">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded-xl border-none cursor-pointer" 
                        value={localShopInfo.secondaryColor} 
                        onChange={e => setLocalShopInfo({...localShopInfo, secondaryColor: e.target.value})} 
                      />
                      <input type="text" className={`${inputClasses} py-2`} value={localShopInfo.secondaryColor} onChange={e => setLocalShopInfo({...localShopInfo, secondaryColor: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Accent Color</label>
                    <div className="flex gap-3 items-center">
                      <input 
                        type="color" 
                        className="w-12 h-12 rounded-xl border-none cursor-pointer" 
                        value={localShopInfo.accentColor} 
                        onChange={e => setLocalShopInfo({...localShopInfo, accentColor: e.target.value})} 
                      />
                      <input type="text" className={`${inputClasses} py-2`} value={localShopInfo.accentColor} onChange={e => setLocalShopInfo({...localShopInfo, accentColor: e.target.value})} />
                    </div>
                  </div>
                </div>

                <Button fullWidth variant="secondary" onClick={handleSaveShopSettings}>Save All Changes</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminView;
