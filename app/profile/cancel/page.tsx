// app/profile/cancel/page.tsx
"use client";

import { useCart } from '@/app/context/CartContext';
import type { CartItem } from '@/app/context/CartContext'; // Add this import
import Link from 'next/link';
import { X, ArrowLeft, Trash2, RotateCw } from 'lucide-react';
import Image from 'next/image';

export default function CancelPage() {
  const { cancelledOrders, deleteCancelledOrder, reorderItems } = useCart();
  
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

  const handleDelete = (orderId: string) => {
    if (confirm('Are you sure you want to delete this cancelled order?')) {
      deleteCancelledOrder(orderId);
    }
  };

  const handleReorder = (items: CartItem[]) => {
    reorderItems(items);
    alert('Items have been added to your cart!');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <X className="text-red-600 dark:text-red-300" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Cancelled Orders
              </h1>
            </div>
            <Link
              href="/profile"
              className="flex items-center text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Profile
            </Link>
          </div>

          {cancelledOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You haven't cancelled any orders yet.
              </p>
              <Link href="/profile" className="flex items-center text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400">
  <ArrowLeft size={16} className="mr-1" />
  Back to Profile
</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cancelledOrders.map((order) => (
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
                      <X className="text-red-500" size={16} />
                      <span className="text-sm font-medium">
                        Cancelled
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
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Total paid
                        </p>
                        <p className="text-lg font-bold text-gray-800 dark:text-white">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleReorder(order.items)}
                          className="flex items-center text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400"
                        >
                          <RotateCw size={16} className="mr-1" />
                          Reorder
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="flex items-center text-sm text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}