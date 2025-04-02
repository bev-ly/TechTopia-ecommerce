"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  useEffect(() => {
    // Get selected items from session storage
    const storedItems = sessionStorage.getItem('checkoutItems');
    if (storedItems) {
      const items = JSON.parse(storedItems);
      setCheckoutItems(items);
      calculateTotal(items);
    } else {
      // Redirect back to cart if no items selected
      router.push('/cart');
    }
    setIsLoading(false);
  }, [router]);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCheckoutTotal(total);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-6">
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

  if (checkoutItems.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              No items selected for checkout
            </h2>
            <Link
              href="/cart"
              className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Order Details
                </h2>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="py-4 flex">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                          sizes="100vw"
                        />
                      </div>
                      <div className="ml-4 sm:ml-6 flex-1">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Brand: {item.brand}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-gray-600 dark:text-gray-300">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-lg font-bold text-cyan-600 dark:text-cyan-500">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Shipping Information
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  {/* Add more form fields as needed */}
                </form>
              </div>
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
                    Subtotal ({checkoutItems.length} {checkoutItems.length === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-medium">
                    ${checkoutTotal.toLocaleString()}
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
                    Tax (estimated)
                  </span>
                  <span className="font-medium">
                    ${(checkoutTotal * 0.1).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    Total
                  </span>
                  <span className="text-lg font-bold">
                    ${(checkoutTotal * 1.1).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <button
                className="w-full px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors duration-200"
                onClick={() => {
                  // Handle payment processing here
                  sessionStorage.removeItem('checkoutItems');
                  alert('Order placed successfully!');
                }}
              >
                Place Order
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                By placing your order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}