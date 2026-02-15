"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeInUp, RevealTitle } from "@/components/ui/AnimatedText";

const videos = [
  "/hero1.mp4",
  "/hero2.mp4",
  "/hero3.mp4"
];

export function MobileVideoHero() {
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
            {/* Overlay for contrast - slightly darker for mobile text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6">
        
        {/* Spacer for top nav area */}
        <div className="pt-4 h-10"></div>

        {/* Middle / Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
             {/* Content removed */}
        </div>

        {/* Bottom Area */}
        <div className="w-full pb-10">
            {/* Main Title */}
            <div className="text-center mb-8 flex justify-center">
                <div className="text-4xl leading-tight font-serif tracking-tight">
                    <RevealTitle text="RESTORING LEATHER BEAUTIFULLY" delay={1} />
                </div>
            </div>

            {/* Footer-like Row - Stacked for Mobile */}
            <div className="flex flex-col items-center gap-6 border-t border-white/20 pt-6">
                <div className="text-center">
                    <FadeInUp delay={1.5}>
                        <p className="text-sm opacity-80">
                            Premium Leather Repair & Restoration Services
                        </p>
                    </FadeInUp>
                </div>

                <FadeInUp delay={1.6}>
                    <div className="flex items-center gap-2 cursor-pointer group bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                        <span className="text-sm uppercase tracking-widest">Approach</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </FadeInUp>
            </div>
        </div>
      </div>
    </section>
  );
}
