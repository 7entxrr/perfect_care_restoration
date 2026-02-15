"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import { Schema } from "@/components/seo/Schema";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  className?: string;
  injectSchema?: boolean;
}

export function FAQSection({ 
  title = "Frequently Asked Questions", 
  subtitle = "Common questions about our services and projects.", 
  items,
  className = "",
  injectSchema = true
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className={`py-20 md:py-32 bg-gray-50 ${className}`}>
      {injectSchema && (
        <Schema id={`faq-schema-${title.toLowerCase().replace(/\s+/g, '-')}`} data={faqSchema} />
      )}
      
      <div className="container mx-auto px-4 md:px-12 max-w-5xl">
        <div className="mb-16 text-center">
            <div className="text-3xl md:text-5xl font-serif leading-tight mb-4 text-black flex justify-center">
                <LineReveal lines={[title]} />
            </div>
            <FadeInUp delay={0.2}>
                <p className="text-gray-600 font-sans font-light text-lg">
                    {subtitle}
                </p>
            </FadeInUp>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <FadeInUp key={index} delay={0.1 * index} className="border-b border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`text-xl font-serif transition-colors duration-300 ${openIndex === index ? 'text-black' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <span className={`ml-4 p-2 rounded-full transition-colors duration-300 ${openIndex === index ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 text-gray-600 font-sans font-light leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
