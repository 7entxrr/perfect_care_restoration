
import { projects, Project } from "@/data/projects";
import { PageHeader } from "@/components/ui/PageHeader";
import { FadeInUp, LineReveal, RevealTitle } from "@/components/ui/AnimatedText";
import { NextProjectTransition } from "@/components/projects/NextProjectTransition";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Maximize2, Calendar, MapPin, User, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { companyInfo } from "@/data/company";

// Generate static params for SSG
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  // When arriving from transition, we want to skip entrance animations
  // to prevent "double loading" effect since the transition overlay
  // already showed the content in its final state.
  
  // Note: resolvedSearchParams.fromTransition will be a string "true" if present
  const fromTransition = resolvedSearchParams.fromTransition === "true";

  if (!project) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": project.title,
    "description": project.description,
    "image": project.image,
    "category": project.type,
    "brand": {
      "@type": "Brand",
      "name": companyInfo.name
    },
    "offers": {
      "@type": "Offer",
      "availability": project.status === "Completed" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "priceCurrency": "INR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": companyInfo.reviews.averageRating,
      "reviewCount": companyInfo.reviews.reviewCount,
      "bestRating": companyInfo.reviews.bestRating,
      "worstRating": companyInfo.reviews.worstRating
    }
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` }
  ];

  return (
    <main className="bg-white min-h-screen">
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      {/* 1. Custom Hero Section - Mid-Page Bar Layout */}
      <section className="min-h-[80vh] flex flex-col justify-center pt-32">
          
          {/* Horizontal Bar - Full Viewport Width */}
          <div className="w-full h-[1px] bg-gray-300 mb-8" />
          
          <div className="px-4 md:px-12 max-w-[1920px] mx-auto w-full">
            {/* Content Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
                
                {/* Title (Left Aligned - Cols 1-4) */}
                <div className="md:col-span-4 text-left">
                    <div className="w-full" style={{ fontFamily: 'var(--font-italiana)' }}>
                        <RevealTitle
                          text={project.title}
                          className="text-4xl md:text-6xl lg:text-7xl font-normal uppercase leading-[0.9] text-black text-left"
                          skipAnimation={fromTransition}
                        />
                    </div>
                </div>

                {/* Description (Middle - Cols 5-10) */}
                <div className="md:col-span-6 text-left md:text-left">
                     <div style={{ fontFamily: 'var(--font-italiana)' }}>
                        <FadeInUp 
                            delay={0.2} 
                            className="text-xl md:text-2xl font-light tracking-wide leading-snug"
                            skipAnimation={fromTransition}
                        >
                            {project.description.split('.')[0]}.
                        </FadeInUp>
                     </div>
                </div>

                {/* Type (Right Aligned - Cols 11-12) */}
                <div className="md:col-span-2 pt-2 text-right">
                     <FadeInUp 
                        delay={0.3} 
                        className="text-xs font-bold uppercase tracking-widest text-black"
                        skipAnimation={fromTransition}
                     >
                         {project.type}
                     </FadeInUp>
                </div>
            </div>
          </div>
      </section>

      {/* 2. Main Hero Image */}
      <section className="relative w-full px-4 md:px-12 max-w-[1920px] mx-auto mb-20">
        <FadeInUp 
            delay={0.4} 
            className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-gray-100"
            skipAnimation={fromTransition}
        >
           <Image
             src={project.image}
             alt={project.title}
             fill
             className="object-cover transition-transform duration-[2s] hover:scale-105"
             priority
           />
        </FadeInUp>
      </section>

      {/* 3. Editorial / Details Section */}
      <section className="py-20 px-4 md:px-12 max-w-[1920px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Project Stats (Sticky) */}
            <div className="lg:col-span-4">
               <div className="sticky top-32 space-y-12">
                  <FadeInUp delay={0.4}>
                      <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold mb-12">
                          <ArrowLeft size={16} /> Back to Projects
                      </Link>
                  </FadeInUp>

                  <div className="space-y-8">
                      {project.details?.year && (
                          <FadeInUp delay={0.5} className="border-t border-gray-100 pt-4">
                              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Completion</span>
                              <span className="block text-xl font-serif">{project.details.year}</span>
                          </FadeInUp>
                      )}
                      <FadeInUp delay={0.6} className="border-t border-gray-100 pt-4">
                          <span className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Location</span>
                          <span className="block text-xl font-serif">{project.location}</span>
                      </FadeInUp>
                      {project.details?.features && (
                          <FadeInUp delay={0.7} className="border-t border-gray-100 pt-4">
                              <span className="block text-xs text-gray-400 uppercase tracking-widest mb-4">Key Features</span>
                              <ul className="space-y-2">
                                  {project.details.features.map((f, i) => (
                                      <li key={i} className="text-gray-600 font-light text-sm flex items-center gap-2">
                                          <span className="w-1 h-1 bg-black rounded-full"></span> {f}
                                      </li>
                                  ))}
                              </ul>
                          </FadeInUp>
                      )}
                      
                      <FadeInUp delay={0.8} className="border-t border-gray-100 pt-4">
                          <span className="block text-xs text-gray-400 uppercase tracking-widest mb-4">How it works</span>
                          <div className="text-sm text-gray-600">
                            Send photos for assessment, receive a quote and timeline, ship or visit our studio, and we restore with care.
                          </div>
                      </FadeInUp>
                  </div>
               </div>
            </div>

            {/* Right: Narrative & Gallery */}
            <div className="lg:col-span-8">
                {/* Large Narrative Text */}
                <div className="mb-24">
                    <div className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-gray-900 mb-12">
                        <LineReveal lines={[
                            "Restoring luxury leather",
                            "with precision craftsmanship,",
                            "preserving value and beauty."
                        ]} />
                    </div>
                    <div className="text-gray-600 font-light leading-relaxed text-lg md:text-xl max-w-2xl" style={{ fontFamily: 'var(--font-josefin-sans)' }}>
                         <p className="mb-8">
                             {project.description} Each piece is evaluated, color-matched, and repaired using studio-grade materials and proven techniques.
                         </p>
                         <p>
                             Our care philosophy blends modern chemistry with traditional craftsmanship, resulting in durable finishes and a natural feel in {project.location}.
                         </p>
                    </div>
                </div>

                {/* Gallery Grid */}
                {project.details?.gallery && (
                    <div className="space-y-24">
                        {project.details.gallery.map((img, index) => (
                            <FadeInUp key={index} delay={0.2} className="w-full">
                                <div className={`relative w-full ${index % 2 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'} bg-gray-100 overflow-hidden`}>
                                    <Image 
                                        src={img}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between items-start">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black">0{index + 1}</span>
                                    <p className="text-sm text-gray-500 max-w-xs text-right">
                                        Interior perspective showcasing the premium finishes and spatial design.
                                    </p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                )}
            </div>
         </div>
      </section>

      {/* Next Project Navigation */}
      <section>
          {(() => {
              const nextId = project.id === projects.length ? 1 : project.id + 1;
              const nextProject = projects.find(p => p.id === nextId)!;
              return <NextProjectTransition nextProject={nextProject} />;
          })()}
      </section>
    </main>
  );
}
