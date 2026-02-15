"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeInUp, RevealTitle } from "@/components/ui/AnimatedText";
import { projects } from "@/data/projects";

export function FeaturedProjectsSection() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="bg-white text-black py-20 px-4 md:px-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-8">
        <div className="text-[12vw] leading-[0.8] font-serif tracking-tight uppercase">
          <RevealTitle text="Featured" />
          <RevealTitle text="Services" delay={0.2} />
        </div>
        <FadeInUp delay={0.4}>
            <Link 
                href="/projects" 
                className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity mb-4 md:mb-2"
            >
                All services <ArrowRight size={16} />
            </Link>
        </FadeInUp>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 h-auto lg:h-[800px]">
        
        {/* Left Column: Large Item */}
        <FadeInUp className="relative w-full h-[500px] lg:h-full group cursor-pointer" delay={0.2}>
             <Link href={`/projects/${featuredProjects[0].slug}`} className="block w-full h-full">
                 <div className="w-full h-full overflow-hidden">
                    <Image
                        src={featuredProjects[0].image}
                        alt={featuredProjects[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                 </div>
                 <div className="flex justify-between items-end mt-3">
                    <h3 className="text-xl font-normal" style={{ fontFamily: 'var(--font-italiana)' }}>{featuredProjects[0].title}</h3>
                    <span className="text-gray-400 text-sm uppercase tracking-wide">{featuredProjects[0].type}</span>
                 </div>
             </Link>
        </FadeInUp>

        {/* Right Column: Grid of 3 Items */}
        <div className="flex flex-col gap-8 lg:gap-8 h-auto lg:h-full mt-8 lg:mt-0">
            
            {/* Top Row: Two Small Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-8 lg:h-1/2">
                {featuredProjects.slice(1, 3).map((project, index) => (
                    <FadeInUp key={project.id} className="relative w-full h-[400px] lg:h-full group cursor-pointer flex flex-col" delay={0.3 + (index * 0.1)}>
                        <Link href={`/projects/${project.slug}`} className="block w-full h-full flex flex-col">
                            <div className="relative w-full flex-1 overflow-hidden">
                                 <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                 />
                            </div>
                            <div className="flex justify-between items-start mt-3">
                                 <h3 className="text-xl font-normal max-w-[70%] leading-tight" style={{ fontFamily: 'var(--font-italiana)' }}>{project.title}</h3>
                                 <span className="text-gray-400 text-xs uppercase tracking-wide text-right">{project.type}</span>
                            </div>
                        </Link>
                    </FadeInUp>
                ))}
            </div>

            {/* Bottom Row: Medium Item */}
            <FadeInUp className="relative w-full h-[400px] lg:h-1/2 group cursor-pointer" delay={0.5}>
                <Link href={`/projects/${featuredProjects[3].slug}`} className="block w-full h-full">
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            src={featuredProjects[3].image}
                            alt={featuredProjects[3].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex justify-between items-end mt-3">
                        <h3 className="text-xl font-normal" style={{ fontFamily: 'var(--font-italiana)' }}>{featuredProjects[3].title}</h3>
                        <span className="text-gray-400 text-sm uppercase tracking-wide">{featuredProjects[3].type}</span>
                    </div>
                </Link>
            </FadeInUp>
        </div>
      </div>

    </section>
  );
}
