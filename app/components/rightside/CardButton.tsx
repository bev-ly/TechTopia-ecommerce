"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";


const CartButton = () => {
  const { itemCount } = useCart();

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        href="/cart"
        className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 relative"
      >
        <ShoppingCart />
        {itemCount > 0 && (
          <motion.span
            key={itemCount}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};

export default CartButton;