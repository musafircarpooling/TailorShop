
import { Product } from './types';

export const INITIAL_CATEGORIES = ['All', 'Bridal', 'Casual', 'Formal', 'Kids', 'Luxury Pret'];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Velvet Sherwani',
    category: 'Formal',
    price: 85000,
    originalPrice: 95000,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598411037744-8025287f354f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hand-embroidered zardozi work on premium deep purple velvet with subtle gold accents.',
    deliveryDays: '15-20 Days',
    isNew: true
  },
  {
    id: 'p2',
    name: 'Silk Anarkali Suite',
    category: 'Bridal',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80',
    description: 'A masterpiece of Banarasi silk with intricate tilla work and hand-applied pearls.',
    deliveryDays: '30-45 Days'
  }
];

export const formatCurrency = (amount: number) => {
  return `Rs. ${amount.toLocaleString()}`;
};
