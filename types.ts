
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  deliveryDays: string;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  measurements?: Record<string, string>;
  quantity: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  basePrice: number;
}

export type OrderStatus = 'Order Placed' | 'Stitching' | 'Quality Check' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

export interface ShopInfo {
  name: string;
  logo: string;
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export interface Deal {
  id: string;
  title: string;
  discount: string;
  image: string;
}
