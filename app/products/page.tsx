// app/products/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const laptopBrands = [
    { 
      name: "Apple MacBook", 
      href: "/products/apple",
      image: "/brands/apple-logo.png",
      alt: "Apple Logo",
      description: "Premium performance with M-series chips"
    },
    { 
      name: "Dell XPS", 
      href: "/products/dell",
      image: "/brands/dell-logo.png",
      alt: "Dell Logo",
      description: "Sleek design with powerful performance"
    },
    { 
      name: "HP Spectre", 
      href: "/products/hp",
      image: "/brands/hp-logo.png",
      alt: "HP Logo",
      description: "Elegant 2-in-1 convertible laptops"
    },
    { 
      name: "Lenovo ThinkPad", 
      href: "/products/lenovo",
      image: "/brands/lenovo-logo.png",
      alt: "Lenovo Logo",
      description: "Business-class durability and security"
    },
    { 
      name: "Asus ROG", 
      href: "/products/asus",
      image: "/brands/asus-logo.png",
      alt: "Asus Logo",
      description: "High-performance gaming laptops"
    },
    { 
      name: "Acer Predator", 
      href: "/products/acer",
      image: "/brands/acer-logo.png",
      alt: "Acer Logo",
      description: "Powerful gaming and productivity machines"
    },
    { 
        name: "MSI", 
        href: "/products/msi",
        image: "/brands/msi-logo.png", //  this image
        alt: "MSI Logo",
        description: "High-performance gaming and creator laptops"
      },
      { 
        name: "Razer", 
        href: "/products/razer",
        image: "/brands/razer-logo.png", //  this image
        alt: "Razer Logo",
        description: "Premium gaming laptops with Chroma RGB"
      },
      { 
        name: "Microsoft Surface", 
        href: "/products/microsoft",
        image: "/brands/microsoft-logo.png", //  this image
        alt: "Microsoft Logo",
        description: "Innovative 2-in-1 devices with Windows 11"
      },
      { 
        name: "Samsung Galaxy Book", 
        href: "/products/samsung",
        image: "/brands/samsung-logo.png", // this image
        alt: "Samsung Logo",
        description: "Thin, light, and powerful Windows laptops"
      }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center"
        >
          Browse All Laptop Brands
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12"
        >
          Select a brand to explore their laptop lineup
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {laptopBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={brand.href} className="block h-full">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-24 w-24 mb-4">
                      <Image
                        src={brand.image}
                        alt={brand.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {brand.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {brand.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}