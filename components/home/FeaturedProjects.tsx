"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Square } from "lucide-react";
import { projects } from "@/data/projects";
import { useState } from "react";

export function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 3);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
              <Square size={16} className="fill-primary" />
              <span className="text-sm tracking-widest uppercase">Featured</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
              Signature
              <br />
              <span className="text-primary">Services</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our studio’s most requested leather repair and restoration services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-foreground font-semibold text-lg hover:text-primary transition-colors"
            >
              <span className="relative">
                View All Services
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* View all button for mobile */}
        <div className="mt-12 text-center lg:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function ProjectCard({ project, index, isHovered, onHoverStart, onHoverEnd }: ProjectCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card glow effect */}
      {isHovered && (
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-500 h-full"
      >
        {/* Image container */}
        <div className="relative h-72 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-4 py-2 rounded-full text-xs font-bold ${
              project.status === "Completed" 
                ? "bg-green-500/90 text-white" 
                : "bg-primary text-white"
            }`}>
              {project.status}
            </span>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-white font-medium">Premium</span>
            </div>
          </div>
          <img
            src={project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070"}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              {project.type}
            </span>
            <div className="flex items-center text-amber-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center text-gray-500 mb-4">
            <MapPin size={18} className="mr-2 text-primary" />
            <span className="text-sm">{project.location}</span>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 mb-6">
            {project.features?.slice(0, 3).map((feature: string, i: number) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="block w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center font-medium rounded-xl hover:from-primary hover:to-primary/90 transition-all duration-300 group-hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              View Service Details
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary transform translate-x-8 translate-y-8 rotate-45" />
        </div>
      </motion.div>
    </motion.div>
  );
}
