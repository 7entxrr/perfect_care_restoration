"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/data/company";
import { ShieldCheck, Clock, Award, Users, CheckCircle, TrendingUp, Home, Heart } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, any> = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  Award: Award,
  Users: Users,
  CheckCircle: CheckCircle,
  TrendingUp: TrendingUp,
  Home: Home,
  Heart: Heart,
};

const features = [
  {
    icon: "Award",
    title: "Award-Winning Excellence",
    description: "Recognized with 12+ international design and construction awards for innovation and quality.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "ShieldCheck",
    title: "100% Legal Compliance",
    description: "Every project fully compliant with all regulations. No hidden clauses, complete transparency.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "Clock",
    title: "Timely Delivery",
    description: "98% on-time delivery record. We value your time as much as our reputation.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: "Users",
    title: "Dedicated Support",
    description: "24/7 customer service and dedicated relationship managers for every client.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "TrendingUp",
    title: "Value Appreciation",
    description: "Our properties appreciate 15-20% faster than market average. Smart investment guaranteed.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: "Home",
    title: "Turnkey Solutions",
    description: "From design to move-in, we handle everything. Your dream home, ready to live in.",
    color: "from-indigo-500 to-violet-500",
  },
];

export function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium mb-6">
            <span className="w-8 h-0.5 bg-primary" />
            <span className="text-sm tracking-widest uppercase">Why Choose Us</span>
            <span className="w-8 h-0.5 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            The{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {companyInfo.name}
              </span>
              <motion.div
                className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </span>
            <br />
            Advantage
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            More than builders, we're dream enablers. Here's what sets us apart in creating
            spaces that become lifelong memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-gray-100">
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 mx-auto shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={36} className="text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-4 text-center text-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-center leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Progress indicator */}
                  <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r ${feature.color}`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Hover effect - floating badges */}
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-3 -right-3"
                    >
                      <div className="bg-gradient-to-r from-primary to-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        ★ Premium
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "25+", label: "Years Experience" },
              { value: "500+", label: "Happy Families" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "₹5000Cr+", label: "Worth Delivered" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}