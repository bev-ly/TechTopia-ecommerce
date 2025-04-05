"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Truck, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const foundOrder = orders.find((o: Order) => o.id === id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        router.push('/profile/orders');
      }
    } else {
      router.push('/profile/orders');
    }
    setLoading(false);
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'processing':
        return <Clock className="text-yellow-500" size={24} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      default:
        return <Clock className="text-yellow-500" size={24} />;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'processing':
        return 'Your order is being processed';
      case 'shipped':
        return 'Your order has been shipped';
      case 'delivered':
        return 'Your order has been delivered';
      default:
        return 'Order received';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <Link href="/profile/orders" className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 mb-4 inline-block">
          &larr; Back to Orders
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Order #{order.id}
            </h1>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {getStatusIcon()}
            <div>
              <h3 className="font-medium text-gray-800 dark:text-white">
                {getStatusText()}
              </h3>
              {order.trackingNumber && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tracking number: {order.trackingNumber}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600 dark:text-gray-300 mr-2">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-800 dark:text-white">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Payment Information
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-800 dark:text-white">
                    ${order.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-gray-800 dark:text-white">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="font-bold text-gray-800 dark:text-white">Total</span>
                  <span className="font-bold text-gray-800 dark:text-white">
                    ${order.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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