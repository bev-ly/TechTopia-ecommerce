"use client";

import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    isInitialized
  } = useCart();

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  if (!isInitialized) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex p-4 border rounded-lg">
                  <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="ml-4 flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const toggleItemSelection = (itemId: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.size === cart.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cart.map(item => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const calculateSelectedTotal = () => {
    return cart.reduce((total, item) => {
      return selectedItems.has(item.id) ? total + (item.price * item.quantity) : total;
    }, 0);
  };

  const getSelectedItems = () => {
    return cart.filter(item => selectedItems.has(item.id));
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) return;
    
    sessionStorage.setItem('checkoutItems', JSON.stringify(getSelectedItems()));
    router.push('/checkout');
  };

  const selectedTotal = calculateSelectedTotal();
  const hasSelectedItems = selectedItems.size > 0;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Your Shopping Cart
          </h1>
          {cart.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex justify-center mb-6">
              <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center">
                  <input 
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    className="h-5 w-5 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500 mr-3"
                    aria-label="Select all items"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select all items
                  </span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {cart.map((item) => {
                    const colorMatch = item.name.match(/\(([^)]+)\)$/);
                    const colorName = colorMatch ? colorMatch[1] : null;
                    const displayName = item.name.replace(/\([^)]*\)$/, '').trim();
                    
                    return (
                      <div key={item.id} className="p-4 sm:p-6 flex">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => toggleItemSelection(item.id)}
                            className="h-5 w-5 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500 mr-3 mt-1"
                            aria-label={`Select ${displayName}`}
                          />
                          <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <Image
                              src={item.image}
                              alt={displayName}
                              fill
                              className="object-contain p-2"
                              sizes="100vw"
                            />
                          </div>
                        </div>
                        <div className="ml-4 sm:ml-6 flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-800 dark:text-white line-clamp-2">
                                {displayName}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Brand: {item.brand}
                              </p>
                              {colorName && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  Color: {colorName}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors h-6 w-6 flex items-center justify-center"
                              aria-label={`Remove ${displayName}`}
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="mt-4 flex-1 flex items-end justify-between">
                            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-1 text-center w-12">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <p className="text-lg font-bold text-cyan-600 dark:text-cyan-500">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  href="/products"
                  className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400 flex items-center transition-colors"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors flex items-center"
                >
                  <X size={16} className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Subtotal ({selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-medium">
                      ${selectedTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Shipping
                    </span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Tax
                    </span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                      Estimated Total
                    </span>
                    <span className="text-lg font-bold">
                      ${selectedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={!hasSelectedItems}
                  className={`w-full text-center px-6 py-3 ${
                    hasSelectedItems 
                      ? 'bg-cyan-600 hover:bg-cyan-700 cursor-pointer' 
                      : 'bg-gray-300 cursor-not-allowed'
                  } text-white rounded-lg transition-colors duration-200 font-medium`}
                >
                  Proceed to Checkout
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                  By placing your order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}