
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  quantity: number;
};

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
  trackingNumber?: string;
};

type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  cancelledOrders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (items: CartItem[]) => Order;
  cancelOrder: (orderId: string) => void;
  deleteCancelledOrder: (orderId: string) => void;
  reorderItems: (items: CartItem[]) => void;
  cartTotal: number;
  itemCount: number;
  isInitialized: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        const savedOrders = localStorage.getItem('orders');
        const savedCancelledOrders = localStorage.getItem('cancelledOrders');

        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
        if (savedCancelledOrders) setCancelledOrders(JSON.parse(savedCancelledOrders));
      } catch (error) {
        console.error('Failed to load cart data:', error);
        // Reset to empty state if loading fails
        setCart([]);
        setOrders([]);
        setCancelledOrders([]);
      } finally {
        setIsInitialized(true);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('cancelledOrders', JSON.stringify(cancelledOrders));
    }
  }, [cart, orders, cancelledOrders, isInitialized]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (items: CartItem[]) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: 'processing',
      trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`
    };
    
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    // Remove ordered items from cart
    setCart((prevCart) => 
      prevCart.filter((cartItem) => 
        !items.some((orderItem) => orderItem.id === cartItem.id)
      )
    );
    
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prevOrders => {
      const orderToCancel = prevOrders.find(order => order.id === orderId);
      if (orderToCancel) {
        // Create new cancelled order with unique ID
        const cancelledOrder = {
          ...orderToCancel,
          id: `CANCEL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
          status: 'cancelled' as OrderStatus,
          date: new Date().toISOString()
        };
        setCancelledOrders(prev => [...prev, cancelledOrder]);
        return prevOrders.filter(order => order.id !== orderId);
      }
      return prevOrders;
    });
  };
  const deleteCancelledOrder = (orderId: string) => {
    setCancelledOrders((prev) => 
      prev.filter((order) => order.id !== orderId)
    );  
  };

  const reorderItems = (items: CartItem[]) => {
    // Group items by product ID to combine quantities
    const itemsMap = new Map<string, CartItem>();
    
    // First add existing cart items
    cart.forEach((item) => {
      itemsMap.set(item.id, { ...item });
    });
    
    // Then add/update with reordered items
    items.forEach((item) => {
      if (itemsMap.has(item.id)) {
        const existingItem = itemsMap.get(item.id)!;
        itemsMap.set(item.id, {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity
        });
      } else {
        itemsMap.set(item.id, { ...item });
      }
    });
    
    // Update cart with merged items
    setCart(Array.from(itemsMap.values()));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        cancelledOrders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cancelOrder,
        deleteCancelledOrder,
        reorderItems,
        cartTotal,
        itemCount,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}