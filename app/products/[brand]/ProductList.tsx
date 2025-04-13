"use client";

import { ShoppingCart, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

type ColorOption = {
  name: string;
  hex: string;
  image: string;
};

type Laptop = {
  id: string;
  name: string;
  price: number;
  specs: string[];
  images: string[];
  description: string;
  brand?: string;
  colors: ColorOption[];
};

export default function ProductList({ brand }: { brand: string }) {
  const { addToCart } = useCart();
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [showColorModal, setShowColorModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Laptop | null>(null);

  const brandLaptops: Laptop[] = [
    {
      id: `${brand}-1`,
      name: `${brandName} Pro 16"`,
      price: 1599,
      specs: ["16-inch Retina display", "M2 Pro chip", "16GB RAM", "1TB SSD"],
      images: [
        `/laptops/${brand}-apple16.webp`,
        `/laptops/${brand}-pro-16-2.jpg`,
        `/laptops/${brand}-pro-16-3.jpg`,
        `/laptops/${brand}-pro-16-4.jpg`
      ],
      description: "Professional-grade laptop for power users and creatives",
      brand: brandName,
      colors: [
        { name: "Space Gray", hex: "#53565A", image: `/laptops/${brand}-pro-16-space-gray.jpg` },
        { name: "Silver", hex: "#E2E2E2", image: `/laptops/${brand}-pro-16-silver.jpg` },
        { name: "Midnight", hex: "#191E29", image: `/laptops/${brand}-pro-16-midnight.jpg` },
      ]
    },
    {
      id: `${brand}-2`,
      name: `${brandName} Air 13"`,
      price: 999,
      specs: ["13-inch display", "M1 chip", "8GB RAM", "256GB SSD"],
      images: [
        `/laptops/${brand}-air-13-1.jpg`,
        `/laptops/${brand}-air-13-2.jpg`,
        `/laptops/${brand}-air-13-3.jpg`,
        `/laptops/${brand}-air-13-4.jpg`
      ],
      description: "Ultra-portable laptop for everyday use",
      brand: brandName,
      colors: [
        { name: "Gold", hex: "#F5E6C9", image: `/laptops/${brand}-air-13-gold.jpg` },
        { name: "Rose Gold", hex: "#E0BFB8", image: `/laptops/${brand}-air-13-rose-gold.jpg` },
        { name: "Space Gray", hex: "#53565A", image: `/laptops/${brand}-air-13-space-gray.jpg` },
      ]
    },
    {
      id: `${brand}-3`,
      name: `${brandName} Workstation`,
      price: 2499,
      specs: ["17-inch 4K display", "Intel i9", "32GB RAM", "2TB SSD"],
      images: [
        `/laptops/${brand}-workstation-1.jpg`,
        `/laptops/${brand}-workstation-2.jpg`,
        `/laptops/${brand}-workstation-3.jpg`,
        `/laptops/${brand}-workstation-4.jpg`
      ],
      description: "High-performance workstation for professionals",
      brand: brandName,
      colors: [
        { name: "Black", hex: "#000000", image: `/laptops/${brand}-workstation-black.jpg` },
        { name: "Carbon Fiber", hex: "#2B2B2B", image: `/laptops/${brand}-workstation-carbon.jpg` },
      ]
    }
  ];

  const handleAddToCartClick = (laptop: Laptop) => {
    setCurrentProduct(laptop);
    setShowColorModal(true);
  };

  const confirmAddToCart = () => {
    if (!currentProduct || !selectedColor) return;
    
    addToCart({
      id: `${currentProduct.id}-${selectedColor.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: `${currentProduct.name} (${selectedColor.name})`,
      price: currentProduct.price,
      image: selectedColor.image,
      brand: currentProduct.brand || brandName,
      color: selectedColor.name
    });
    
    setShowColorModal(false);
    setSelectedColor(null);
  };

  const nextImage = (laptopId: string) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[laptopId] || 0;
      const laptop = brandLaptops.find(l => l.id === laptopId);
      if (!laptop) return prev;
      
      return {...prev, [laptopId]: (currentIndex + 1) % laptop.images.length};
    });
  };

  const prevImage = (laptopId: string) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[laptopId] || 0;
      const laptop = brandLaptops.find(l => l.id === laptopId);
      if (!laptop) return prev;
      
      return {...prev, [laptopId]: (currentIndex - 1 + laptop.images.length) % laptop.images.length};
    });
  };

  return (
    <div className="container mx-auto px-6">
      {/* Color Selection Modal */}
      {showColorModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Select Color</h3>
              <button aria-label="Close color selection modal"
                onClick={() => {
                  setShowColorModal(false);
                  setSelectedColor(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentProduct.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`p-4 border rounded-lg flex flex-col items-center ${
                    selectedColor?.name === color.name 
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-gray-700' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full mb-2 border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowColorModal(false);
                  setSelectedColor(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddToCart}
                disabled={!selectedColor}
                className={`px-4 py-2 rounded-lg text-white ${
                  selectedColor ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

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
        {brandLaptops.map((laptop, index) => {
          const currentIndex = currentImageIndex[laptop.id] || 0;
          
          return (
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
                  src={laptop.images[currentIndex]}
                  alt={`${laptop.name} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(laptop.id);
                    }}
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(laptop.id);
                    }}
                    className="bg-white/80 hover:bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                  {laptop.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => ({...prev, [laptop.id]: idx}));
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${currentIndex === idx ? 'bg-cyan-600' : 'bg-white/50'}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
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
                    onClick={() => handleAddToCartClick(laptop)}
                    className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors"
                    aria-label={`Add ${laptop.name} to cart`}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}