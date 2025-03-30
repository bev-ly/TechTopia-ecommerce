"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";

const UserAuthButton = () => {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Link
        href="/auth"
        className="text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400"
      >
        <User />
      </Link>
    </motion.div>
  );
};

export default UserAuthButton;