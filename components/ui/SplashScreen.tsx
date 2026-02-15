"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/logo.png";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep the splash screen visible for roughly 1 second
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] // Cinematic easing (bezier)
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative w-48 h-48 md:w-96 md:h-96 lg:w-[25rem] lg:h-[25rem] animate-pulse">
            <Image
              src={logo}
              alt="Perfect Care Restoration Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
