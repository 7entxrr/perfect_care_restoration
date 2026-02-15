"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    location: string;
    description: string;
    status: string;
    image: string;
    type: string;
  };
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          {project.status}
        </div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wide">
          {project.type}
        </div>
        <h3 className="text-xl font-normal mb-2 text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center text-gray-500 mb-4 text-sm">
          <MapPin size={16} className="mr-1" />
          {project.location}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-6">
          {project.description}
        </p>
        <div className="w-full text-center py-2 border border-border rounded-lg text-sm font-medium hover:bg-foreground hover:text-white transition-colors cursor-pointer">
            View Details
        </div>
      </div>
    </motion.div>
  );
}
