"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import UserAuthButton from "../rightside/UserAuthButton";
import CartButton from "../rightside/CardButton";
import SearchBar from "../rightside/SearchButton";

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const laptopBrands = [
    "Apple", "Dell", "HP", "Lenovo", "Asus", 
    "Acer", "MSI", "Razer", "Microsoft", "Samsung"
  ];

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm mb-20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
            >
              <Link href="/">TechTopia</Link>
            </motion.h1>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
              >
                About
              </Link>

              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
                >
                  Products
                  {isCategoriesOpen ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                </button>

                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-1"
                  >
                    {laptopBrands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/products/${brand.toLowerCase()}`}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        {brand}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Side - Search and Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <UserAuthButton />
              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;