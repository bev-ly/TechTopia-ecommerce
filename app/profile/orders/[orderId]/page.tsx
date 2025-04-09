// app/profile/orders/[orderId]/page.tsx
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import { Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { orders } = useCart();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Order not found
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Link
              href="/profile/orders"
              className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  const getStatusIcon = () => {
    switch (order.status) {
      case 'processing': return <Clock className="text-yellow-500" size={24} />;
      case 'shipped': return <Truck className="text-blue-500" size={24} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={24} />;
      default: return <Clock className="text-yellow-500" size={24} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <Link 
          href="/profile" 
          className="inline-flex items-center text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400 mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Orders
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Order #{order.id.slice(-6)}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Placed on {formatDate(order.date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Order Items
            </h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-32 w-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </h3>
                    {item.brand && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Brand: {item.brand}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-lg font-bold text-cyan-600 dark:text-cyan-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-800 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-gray-800 dark:text-white">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tax</span>
                  <span className="text-gray-800 dark:text-white">
                    ${(order.total * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <span className="font-bold text-gray-800 dark:text-white">Total</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    ${(order.total * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}