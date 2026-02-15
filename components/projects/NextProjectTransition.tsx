"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Project } from "@/data/projects";
import Image from "next/image";

interface NextProjectTransitionProps {
  nextProject: Project;
}

export const NextProjectTransition = ({ nextProject }: NextProjectTransitionProps) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  // Safety check to prevent auto-triggering if page loads at bottom
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
      // Force scroll to top on mount to ensure user starts at beginning of project
      // Disable smooth scrolling temporarily to prevent "scroll up" animation
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      
      const timeout = setTimeout(() => {
          document.documentElement.style.scrollBehavior = "";
      }, 100);

      return () => clearTimeout(timeout);
  }, []);

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Transform scroll progress to bar width (0% to 100%)
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Monitor scroll progress to trigger navigation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only enable navigation if we've seen a scroll value < 0.9
    // This confirms the user started from above or scrolled up, 
    // preventing immediate trigger if browser restores scroll to bottom.
    if (latest < 0.9) {
        setHasScrolledIntoView(true);
    }

    if (latest > 0.99 && !isNavigating && hasScrolledIntoView) {
      setIsNavigating(true);
      setTriggerAnimation(true);
      
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        // Ensure smooth scrolling is disabled before navigation starts
        document.documentElement.style.scrollBehavior = "auto";
        router.push(`/projects/${nextProject.slug}?fromTransition=true`);
        // Note: overflow reset happens on new page load naturally, 
        // but we keep it here just in case component unmounts differently
        document.body.style.overflow = "";
      }, 1200);
    }
  });

  // Cleanup overflow on unmount to prevent stuck scroll
  useEffect(() => {
    return () => {
        document.body.style.overflow = "";
        document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    // 300vh height to ensure sufficient scroll duration
    <div ref={containerRef} className="relative w-full h-[300vh] bg-white">
      
      {/* Sticky Content - Sticks to the CENTER of the viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center bg-white overflow-hidden">
        
        {/* Full Viewport Width Progress Bar Container */}
        <div className="w-full h-[1px] bg-gray-200 mb-8 relative overflow-hidden z-20">
            <motion.div
                className="absolute top-0 left-0 h-full bg-black"
                style={{ width }}
            />
        </div>

        {/* Next Project Image - Static Half Visible */}
        <motion.div 
            className="absolute bottom-0 w-full flex justify-center z-10"
            initial={{ y: "71%" }} // Start and stay partially hidden (show less image)
        >
            <div className="w-full max-w-[1920px] px-4 md:px-12">
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-gray-100">
                    <Image
                        src={nextProject.image}
                        alt={nextProject.title}
                        fill
                        className="object-cover" // Fully opaque
                        priority
                    />
                </div>
            </div>
        </motion.div>

        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
                
                {/* Label - Left Aligned */}
                <div className="md:col-span-3 lg:col-span-2 text-left pt-2">
                    <motion.span 
                        className="text-lg md:text-xl font-medium tracking-wide text-black block"
                        animate={triggerAnimation ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                    Next Project
                    </motion.span>
                </div>

                {/* Title - Center/Right Aligned (Smaller Font) */}
                <div className="md:col-span-9 lg:col-span-10 flex justify-center md:justify-center">
                    <motion.div
                        className="text-4xl md:text-6xl lg:text-7xl font-normal uppercase leading-[0.9] text-black text-center"
                        animate={triggerAnimation ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0 }} // Instant hide, handover to overlay
                        style={{ fontFamily: 'var(--font-italiana)' }}
                    >
                        {nextProject.title}
                    </motion.div>
                </div>
                
                {/* Transition Title Animation Overlay */}
                {triggerAnimation && (
                    <motion.div
                        className="fixed inset-0 bg-white z-[9999] flex flex-col justify-start overflow-hidden"
                        initial={{ opacity: 1 }} // Changed to 1 to be visible immediately
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* 1. Replicate Custom Hero Section Text Area (approx 80vh height centered) */}
                        <div className="min-h-[80vh] flex flex-col justify-center pt-32 w-full">
                            {/* Horizontal Bar - Full Viewport Width */}
                            <div className="w-full h-[1px] bg-gray-300 mb-8" />
                            
                            <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                                    
                                    {/* Title - Moves from Center (visually) to Left */}
                                    <div className="md:col-span-4 text-left">
                                        <motion.div
                                            className="text-4xl md:text-6xl lg:text-7xl font-normal text-black uppercase leading-[0.9] text-left"
                                            // Start from roughly center of screen (40vw) and move to 0
                                            initial={{ x: "40vw" }} 
                                            animate={{ x: 0 }}
                                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ fontFamily: 'var(--font-italiana)' }}
                                        >
                                            {nextProject.title}
                                        </motion.div>
                                    </div>

                                    {/* Description - Emerges in Middle */}
                                    <div className="md:col-span-6 text-left md:text-left overflow-hidden">
                                         <motion.div 
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-xl md:text-2xl font-serif font-medium tracking-wide leading-snug block"
                                            style={{ fontFamily: 'var(--font-italiana)' }}
                                         >
                                              {nextProject.description.split('.')[0]}.
                                         </motion.div>
                                    </div>

                                    {/* Type - Emerges on Right */}
                                    <div className="md:col-span-2 pt-2 text-right overflow-hidden">
                                         <motion.div 
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-xs font-bold uppercase tracking-widest text-black block"
                                         >
                                             {nextProject.type}
                                         </motion.div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* 2. Replicate Image Section (Just peeking up from bottom) */}
                        <div className="relative w-full px-4 md:px-12 max-w-[1920px] mx-auto">
                            <motion.div 
                                className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-gray-100"
                                initial={{ y: "0%" }} 
                                animate={{ y: "0%" }}  
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src={nextProject.image}
                                    alt={nextProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>

                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
