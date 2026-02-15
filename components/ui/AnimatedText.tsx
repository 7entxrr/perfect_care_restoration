"use client";

import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string | string[];
  el?: React.ElementType;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
  delay?: number;
  duration?: number;
  staggerChildren?: number;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  repeatDelay,
  animation = defaultAnimations,
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const show = () => {
      controls.start("visible");
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeout);
  }, [isInView, controls, repeatDelay]);

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: staggerChildren, delayChildren: delay } },
          hidden: {},
        }}
        aria-hidden
      >
        {textArray.map((line, lineIndex) => (
          <span className="block" key={`${line}-${lineIndex}`}>
            {line.split(" ").map((word, wordIndex) => (
              <span className="inline-block" key={`${word}-${wordIndex}`}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    className="inline-block"
                    variants={animation}
                    transition={{ duration }}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export const FadeInUp = ({
    children,
    className,
    delay = 0,
    duration = 0.8,
    once = true,
    skipAnimation = false
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    skipAnimation?: boolean;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once });
    
    // If skipAnimation is true, render static content immediately
    // Use motion.div even for static content to ensure consistent DOM structure
    // but set initial/animate to the "visible" state directly with no transition
    if (skipAnimation) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }
    
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // Custom ease for "premium" feel
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const RevealTitle = ({
    text,
    className,
    delay = 0,
    skipAnimation = false
}: {
    text: string;
    className?: string;
    delay?: number;
    skipAnimation?: boolean;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: true });
    
    // Split text into words
    const words = text.split(" ");

    // If skipAnimation is true, render static content immediately
    if (skipAnimation) {
        return (
            <span className={cn("overflow-hidden block", className)}>
                <span className={cn("flex flex-wrap gap-x-[0.3em]", (className?.includes("text-center") || className?.includes("justify-center")) && "justify-center")}>
                    {words.map((word, i) => (
                        <span key={i} className="block">
                            {word}
                        </span>
                    ))}
                </span>
            </span>
        );
    }
    
    return (
        <span ref={ref} className={cn("overflow-hidden block", className)}>
            <span className={cn("flex flex-wrap gap-x-[0.3em]", (className?.includes("text-center") || className?.includes("justify-center")) && "justify-center")}>
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{ 
                            duration: 0.8, 
                            delay: delay + (i * 0.05),
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="block"
                    >
                        {word}
                    </motion.span>
                ))}
            </span>
        </span>
    );
}

export const LineReveal = ({
    lines,
    className,
    delay = 0,
    duration = 0.8
}: {
    lines: string[];
    className?: string;
    delay?: number;
    duration?: number;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2, once: true });
    
    return (
        <div ref={ref} className={className}>
            {lines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{ 
                            duration, 
                            delay: delay + (i * 0.1),
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {line}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
