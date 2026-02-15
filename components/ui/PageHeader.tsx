"use client";

import { motion } from "framer-motion";
import { RevealTitle, FadeInUp } from "@/components/ui/AnimatedText";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, backgroundImage, className = "" }: PageHeaderProps) {
  if (backgroundImage) {
    return (
      <section className={`relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-background text-foreground ${className}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-20 px-4 md:px-8 text-center text-white">
          <div className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight uppercase mb-6 drop-shadow-lg">
                  <RevealTitle text={title} />
              </div>
              {subtitle && (
                  <FadeInUp delay={0.4}>
                      <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans font-light text-white/90 drop-shadow-md">
                          {subtitle}
                      </p>
                  </FadeInUp>
              )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={`relative pt-32 pb-20 px-4 md:px-12 bg-background border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-[10vw] md:text-[8vw] leading-[0.85] font-serif tracking-tight uppercase mb-8 text-foreground">
          <RevealTitle text={title} />
        </div>
        {subtitle && (
          <FadeInUp delay={0.4} className="max-w-2xl">
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              {subtitle}
            </p>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
