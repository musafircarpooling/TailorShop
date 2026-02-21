
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import AccountView from './components/AccountView';
import TailoringForm from './components/TailoringForm';
import AdminView from './components/AdminView';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import { PRODUCTS as INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './constants';
import { MessageCircle } from 'lucide-react';
import { Product, CartItem, Order, OrderStatus, ShopInfo, Deal } from './types';

type Page = 'home' | 'shop' | 'details' | 'cart' | 'checkout' | 'account' | 'tailoring' | 'admin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [shopInfo, setShopInfo] = useState<ShopInfo>({ 
    name: 'Zardozi Royale', 
    logo: '',
    fontFamily: 'Poppins',
    primaryColor: '#4B0082',
    secondaryColor: '#D4AF37',
    accentColor: '#FF6A00'
  });
  const [deals, setDeals] = useState<Deal[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);

  // Global Style Injection
  useEffect(() => {
    const root = document.documentElement;
    if (shopInfo.primaryColor) root.style.setProperty('--color-royal', shopInfo.primaryColor);
    if (shopInfo.secondaryColor) root.style.setProperty('--color-gold', shopInfo.secondaryColor);
    if (shopInfo.accentColor) root.style.setProperty('--color-orange', shopInfo.accentColor);
    if (shopInfo.fontFamily) {
      root.style.setProperty('--font-main', shopInfo.fontFamily);
      // Dynamically load font from Google Fonts
      let link = document.getElementById('dynamic-font-link') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.id = 'dynamic-font-link';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${shopInfo.fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
    }
  }, [shopInfo]);

  // Local storage persistence simulation
  useEffect(() => {
    const savedProducts = localStorage.getItem('zr_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    
    const savedCats = localStorage.getItem('zr_categories');
    if (savedCats) setCategories(JSON.parse(savedCats));

    const savedShop = localStorage.getItem('zr_shop');
    if (savedShop) setShopInfo(JSON.parse(savedShop));

    const savedOrders = localStorage.getItem('zr_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const saveToLocal = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

  const navigateToDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    navigateToPage('cart');
  };

  const completeOrder = (customerData: any) => {
    const newOrder: Order = {
      id: `#ZR-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: customerData.name || 'Ali Khan',
      date: new Date().toLocaleDateString(),
      items: [...cart],
      total: cart.reduce((s, i) => s + (i.price * i.quantity), 0) + 500,
      status: 'Order Placed'
    };
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToLocal('zr_orders', updatedOrders);
    setCart([]);
    navigateToPage('account');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    saveToLocal('zr_orders', updated);
  };

  const addNewProduct = (product: Product) => {
    const updated = [product, ...products];
    setProducts(updated);
    saveToLocal('zr_products', updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveToLocal('zr_products', updated);
  };

  const addCategory = (cat: string) => {
    const updated = [...categories, cat];
    setCategories(updated);
    saveToLocal('zr_categories', updated);
  };

  const deleteCategory = (cat: string) => {
    const updated = categories.filter(c => c !== cat);
    setCategories(updated);
    saveToLocal('zr_categories', updated);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen relative flex flex-col bg-creamLight/50">
      <Header 
        onNavigate={navigateToPage} 
        cartCount={cartCount} 
        shopName={shopInfo.name}
        shopLogo={shopInfo.logo}
      />
      
      <main className="flex-grow pt-20 pb-24">
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            <Hero onCtaClick={() => navigateToPage('tailoring')} />
            
            <section className="py-20 bg-white shadow-inner">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl luxury-heading text-royal mb-4">Latest Couture</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                   {products.slice(0, 4).map(p => (
                     <ProductCard key={p.id} product={p} onClick={() => navigateToDetails(p)} />
                   ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'shop' && (
          <div className="animate-fade-in px-4 py-8">
            <div className="text-center mb-10">
              <h2 className="text-4xl luxury-heading text-royal">The Catalogue</h2>
              <div className="w-16 h-1 bg-elegantGold mx-auto mt-4" />
            </div>

            <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                    ? 'bg-royal text-white shadow-lg' 
                    : 'bg-white text-royal border border-royal/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-12">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => navigateToDetails(product)} 
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'details' && selectedProduct && (
          <div className="animate-fade-in">
            <ProductDetail 
              product={selectedProduct} 
              onAddToCart={addToCart} 
            />
          </div>
        )}

        {currentPage === 'cart' && (
          <CartView 
            items={cart} 
            onRemove={(id) => setCart(cart.filter(i => i.id !== id))} 
            onUpdateQuantity={(id, d) => setCart(cart.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity+d)} : i))}
            onCheckout={() => navigateToPage('checkout')}
            onContinueShopping={() => navigateToPage('shop')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutView 
            cart={cart}
            onSuccess={completeOrder}
            onReturnHome={() => navigateToPage('home')}
          />
        )}

        {currentPage === 'account' && <AccountView externalOrders={orders} />}

        {currentPage === 'tailoring' && <TailoringForm />}

        {currentPage === 'admin' && (
          <AdminView 
            products={products}
            categories={categories}
            orders={orders}
            shopInfo={shopInfo}
            deals={deals}
            onAddProduct={addNewProduct}
            onUpdateProduct={() => {}}
            onDeleteProduct={deleteProduct}
            onUpdateOrderStatus={updateOrderStatus}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
            onUpdateShopInfo={(info) => { setShopInfo(info); saveToLocal('zr_shop', info); }}
            onAddDeal={(deal) => { setDeals([...deals, deal]); }}
            onDeleteDeal={(id) => { setDeals(deals.filter(d => d.id !== id)); }}
          />
        )}
      </main>

      <BottomNav 
        activeTab={currentPage === 'shop' || currentPage === 'details' ? 'shop' : currentPage} 
        onTabChange={navigateToPage} 
        cartCount={cartCount}
      />
      
      <a 
        href="https://wa.me/923000000000" 
        target="_blank" 
        className="whatsapp-float bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center mb-16"
      >
        <MessageCircle size={32} fill="white" />
      </a>
    </div>
  );
};

export default App;
