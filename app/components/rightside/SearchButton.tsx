"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  mobile?: boolean;
}

const SearchBar = ({ mobile = false }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Search laptops..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 opacity-0"
            readOnly
          />
        </div>
      </div>
    );
  }

  if (mobile) {
    return (
      <>
        <button aria-label="Search"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          <Search />

        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 mx-4">
            <form onSubmit={handleSearchSubmit} className="pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search laptops..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button aria-label="Search"
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search laptops..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button aria-label="Search"
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          <Search size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;