"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

type Laptop = {
  id: string;
  name: string;
  price: number;
  specs: string[];
  image: string;
  description: string;
  brand?: string;
};

export default function ProductList({ brand }: { brand: string }) {
  const { addToCart } = useCart();
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

  // Commented out API fetch example - will use mock data instead
  // const [laptops, setLaptops] = useState<Laptop[]>([]);
  // const [loading, setLoading] = useState(true);
  // 
  // useEffect(() => {
  //   async function fetchLaptops() {
  //     try {
  //       const response = await fetch(`/api/laptops?brand=${brand}`);
  //       const data = await response.json();
  //       setLaptops(data);
  //     } catch (error) {
  //       console.error("Failed to fetch laptops:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   
  //   fetchLaptops();
  // }, [brand]);

  // Mock data - replace with your actual laptop data

  const brandLaptops: Laptop[] = [
    {
      id: `${brand}-1`,
      name: `${brandName} Pro 16"`,
      price: 1599,
      specs: ["16-inch Retina display", "M2 Pro chip", "16GB RAM", "1TB SSD"],
      image: `/laptops/${brand}-pro-16.jpg`,
      description: "Professional-grade laptop for power users and creatives",
      brand: brandName
    },
    {
      id: `${brand}-2`,
      name: `${brandName} Air 13"`,
      price: 999,
      specs: ["13-inch display", "M1 chip", "8GB RAM", "256GB SSD"],
      image: `/laptops/${brand}-air-13.jpg`,
      description: "Ultra-portable laptop for everyday use",
      brand: brandName
    },
    {
      id: `${brand}-3`,
      name: `${brandName} Workstation`,
      price: 2499,
      specs: ["17-inch 4K display", "Intel i9", "32GB RAM", "2TB SSD"],
      image: `/laptops/${brand}-workstation.jpg`,
      description: "High-performance workstation for professionals",
      brand: brandName
    }
  ];

  const handleAddToCart = (laptop: Laptop) => {
    addToCart({
      id: laptop.id,
      name: laptop.name,
      price: laptop.price,
      image: laptop.image,
      brand: laptop.brand || brandName
    });
  };

  return (
    <div className="container mx-auto px-6">
      
      <div className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          {brandName} Laptops
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Premium {brandName} laptops for work, creativity, and gaming
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brandLaptops.map((laptop, index) => (
          <motion.div
            key={laptop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700">
              <Image
                src={laptop.image}
                alt={laptop.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 3}
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {laptop.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {laptop.description}
              </p>
              <ul className="mb-4">
                {laptop.specs.map((spec, i) => (
                  <li key={i} className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    • {spec}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-cyan-600">
                  ${laptop.price.toLocaleString()}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(laptop)}
                  className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors"
                  aria-label={`Add ${laptop.name} to cart`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}