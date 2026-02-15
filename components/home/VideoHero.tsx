"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedText, FadeInUp, RevealTitle } from "@/components/ui/AnimatedText";

const videos = [
  "https://www.pexels.com/download/video/11408836/",
  "https://www.pexels.com/download/video/8262625/",
  "https://www.pexels.com/download/video/9464485/",
  "https://www.pexels.com/download/video/6654773/",
  "https://www.pexels.com/download/video/6649435/"
];

export function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Video Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              src={videos[currentIndex]}
            />
            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12">
        
        {/* Spacer for top nav area */}
        <div className="pt-4 h-10"></div>

        {/* Middle / Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-20 md:mt-0">
             {/* Content removed */}
        </div>

        {/* Bottom Area */}
        <div className="w-full">
            {/* Main Title */}
            <div className="text-center mb-8 md:mb-12 flex justify-center">
                <div className="text-5xl md:text-[8vw] leading-none font-serif tracking-tight">
                    <RevealTitle text="RESTORING LEATHER BEAUTIFULLY" delay={1} />
                </div>
            </div>

            {/* Footer-like Row */}
            <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-6">
                <div className="mb-4 md:mb-0 max-w-xs">
                    <FadeInUp delay={1.5}>
                        <p className="text-sm md:text-base opacity-80">
                            Premium Leather Repair & Restoration Services
                        </p>
                    </FadeInUp>
                </div>

                <FadeInUp delay={1.6}>
                    <Link href="/approach" className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-sm md:text-base uppercase tracking-widest group-hover:underline underline-offset-4 transition-all">Approach</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </FadeInUp>
            </div>
        </div>
      </div>
    </section>
  );
}
