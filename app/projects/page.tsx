import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/data/projects";
import { CTA } from "@/components/home/CTA";
import { FadeInUp } from "@/components/ui/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FAQSection } from "@/components/ui/FAQSection";
import { commonFAQs } from "@/data/faq";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "Our Projects | Perfect Care Restoration",
  description: "Explore the portfolio of luxury residential and commercial projects by Perfect Care Restoration.",
};

export default function ProjectsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Our Services",
        "description": "Explore our premium leather repair and restoration services.",
        "url": "https://www.perfectcarerestoration.com/projects",
        "hasPart": projects.map(project => ({
          "@type": "Service",
          "name": project.title,
          "url": `https://www.perfectcarerestoration.com/projects/${project.slug}`,
          "image": project.image,
          "description": project.description
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": commonFAQs.projects.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/projects" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Our Services"
        subtitle="Premium leather repair and restoration, crafted to perfection."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-20 bg-white text-black px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {projects.map((project, index) => (
                    <FadeInUp key={project.id} delay={index * 0.1} className="group cursor-pointer">
                        <Link href={`/projects/${project.slug}`}>
                        <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 bg-gray-100">
                             <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
                                {project.status}
                             </div>
                             <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        </div>
                        </Link>
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                    {project.type} — {project.location}
                                </div>
                            <Link href={`/projects/${project.slug}`}>
                                <h3 
                                    className="text-2xl md:text-3xl mb-3 group-hover:underline decoration-1 underline-offset-4 transition-all"
                                    style={{ fontFamily: 'var(--font-italiana)' }}
                                >
                                    {project.title}
                                </h3>
                            </Link>
                            </div>
                            <Link href={`/projects/${project.slug}`} className="p-2 rounded-full border border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                                <ArrowUpRight size={20} />
                            </Link>
                        </div>
                    </FadeInUp>
                ))}
            </div>
        </div>
      </section>

      <FAQSection items={commonFAQs.projects} injectSchema={false} />

      <CTA />
    </>
  );
}
