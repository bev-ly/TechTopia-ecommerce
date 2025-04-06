// app/profile/page.tsx
"use client";

import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { Truck, CheckCircle, Clock, User, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { orders } = useCart();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Clock className="text-yellow-500" size={16} />;
      case 'shipped': return <Truck className="text-blue-500" size={16} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={16} />;
      default: return <Clock className="text-yellow-500" size={16} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Profile Section */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-full">
                  <User className="text-cyan-600 dark:text-cyan-300" size={24} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  My Profile
                </h1>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Account Details
                  </h3>
                  <p className="text-gray-800 dark:text-white mt-1">
                    user@example.com
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Member Since
                  </h3>
                  <p className="text-gray-800 dark:text-white mt-1">
                    January 2023
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-full">
                  <ShoppingBag className="text-cyan-600 dark:text-cyan-300" size={24} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Order History
                </h1>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
                        <div>
                          <h2 className="font-medium text-gray-800 dark:text-white">
                            Order #{order.id.slice(-6)}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="text-sm font-medium">
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="space-y-4">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-600 mr-4">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          {order.items.length > 3 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              + {order.items.length - 3} more items
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Total paid
                            </p>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <Link
  href={`/profile/orders/${order.id}`}
  className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400"
>
  View details
</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}