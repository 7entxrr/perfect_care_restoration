"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/data/company";

export function Stats() {
  return (
    <section className="py-20 bg-foreground text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {companyInfo.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
