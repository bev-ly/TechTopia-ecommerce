"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const CartButton = () => {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        href="/cart"
        className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 relative"
      >
        <ShoppingCart />
        <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          0
        </span>
      </Link>
    </motion.div>
  );
};

export default CartButton;