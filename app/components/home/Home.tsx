"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const laptopBrands = [
    { 
      name: "Apple MacBook", 
      href: "/products/apple",
      image: "/apple-logo.png",
      alt: "Apple Logo"
    },
    { 
      name: "Dell XPS", 
      href: "/products/dell",
      image: "/dell.webp",
      alt: "Dell Logo"
    },
    { 
      name: "HP Spectre", 
      href: "/products/hp",
      image: "/hp.webp",
      alt: "HP Logo"
    },
    { 
      name: "Lenovo ThinkPad", 
      href: "/products/lenovo",
      image: "/brands/lenovo-logo.png",
      alt: "Lenovo Logo"
    },
    { 
      name: "Asus ROG", 
      href: "/products/asus",
      image: "/brands/asus-logo.png",
      alt: "Asus Logo"
    },
    { 
      name: "Acer Predator", 
      href: "/products/acer",
      image: "/brands/acer-logo.png",
      alt: "Acer Logo"
    },
  ];

  const featuredLaptops = [
    {
      name: "MacBook Pro 16\" M3 Max",
      description: "12-core CPU, 40-core GPU, 64GB unified memory",
      price: "$3,899",
      href: "/macbook-pro-14in-2024-m4-pro-m4-max-colors.webp",
      image: "/macbook-pro-14in-2024-m4-pro-m4-max-colors.webp"
    },
    {
      name: "Dell XPS 15 (2024)",
      description: "Intel Core i9, 32GB RAM, 1TB SSD, OLED 4K",
      price: "$2,499",
      href: "/products/dell-xps-15-2024",
      image: "/dell.webp"
    },
    {
      name: "HP Spectre x360 14",
      description: "2-in-1 convertible, 13th Gen Intel, 16GB RAM",
      price: "$1,599",
      href: "/products/hp-spectre-x360-14",
      image: "/hp.webp"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            Premium Laptops at TechTopia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Discover the perfect laptop for work, creativity, and gaming from top brands worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Browse Laptops <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {laptopBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={brand.href} className="flex flex-col items-center">
                  <div className="mb-4 h-24 w-24 relative"> {/* Increased size */}
                    <Image 
                      src={brand.image}
                      alt={brand.alt}
                      fill
                      className="object-contain p-2" /* Added padding */
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3} /* Prioritize first few images */
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white">{brand.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Laptops */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Featured Laptops</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredLaptops.map((laptop, index) => (
              <motion.div
                key={laptop.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 relative bg-gray-100 dark:bg-gray-700">
                  <Image 
                    src={laptop.image}
                    alt={laptop.name}
                    fill
                    className="object-contain p-8" /* Increased padding */
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2} /* Prioritize first few images */
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{laptop.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{laptop.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-cyan-600">{laptop.price}</span>
                    <Link 
                      href={laptop.href} 
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      View Details <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our laptop experts can help you find the perfect machine for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-white text-cyan-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              View All Laptops
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}