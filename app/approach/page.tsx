import { PageHeader } from "@/components/ui/PageHeader";
import { FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import Image from "next/image";
import { CTA } from "@/components/home/CTA";
import { FAQSection } from "@/components/ui/FAQSection";
import { commonFAQs } from "@/data/faq";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "Our Approach | Perfect Care Restoration",
  description: "Discover the philosophy and methodology behind Perfect Care Restoration's premium real estate developments.",
};

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "We begin by listening. Understanding your lifestyle, needs, and aspirations is the foundation of our design process. We analyze the site, the context, and the potential to create something truly unique.",
  },
  {
    id: "02",
    title: "Design & Vision",
    description: "Our architects and designers collaborate to translate your vision into a tangible concept. We focus on spatial flow, light, and material harmony to create environments that inspire.",
  },
  {
    id: "03",
    title: "Craftsmanship",
    description: "Execution is where the magic happens. We employ skilled artisans and use premium materials to ensure every detail is perfect. Our construction standards are rigorous and uncompromising.",
  },
  {
    id: "04",
    title: "Handover & Beyond",
    description: "The relationship doesn't end at handover. We provide comprehensive post-possession support to ensure your home remains as perfect as the day you moved in.",
  }
];

export default function ApproachPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Our Approach",
        "description": "Our philosophy, process, and commitment to sustainable luxury.",
        "publisher": {
          "@type": "Organization",
          "name": "Perfect Care Restoration"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": commonFAQs.approach.map(item => ({
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
    { name: "Approach", url: "/approach" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Our Approach"
        subtitle="We don't just build structures; we curate lifestyles."
        backgroundImage="/bailey-alexander-waqb5i0NrX8-unsplash.jpg"
      />

      {/* Philosophy Section */}
      <section className="py-12 md:py-32 bg-white text-black px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
             <div className="relative lg:sticky lg:top-24">
                <div className="text-[12vw] lg:text-[8vw] leading-none font-serif tracking-tighter opacity-10 mb-4 lg:mb-8 select-none">
                    PHILOSOPHY
                </div>
                <div className="text-3xl md:text-5xl font-serif leading-tight">
                    <LineReveal 
                        lines={[
                            "Design that respects",
                            "the past and embraces",
                            "the future."
                        ]}
                    />
                </div>
             </div>
             
             <div className="space-y-8 md:space-y-12 font-sans font-light text-lg md:text-xl leading-relaxed text-gray-800 lg:pt-8">
                <FadeInUp delay={0.2}>
                    <p>
                        At Perfect Care Restoration, we believe that architecture is not just about shelter—it is about shaping human experience. Our approach is rooted in a deep respect for context, culture, and climate.
                    </p>
                </FadeInUp>
                <FadeInUp delay={0.3}>
                    <p>
                        We strive to create spaces that are timeless yet contemporary. By blending traditional craftsmanship with modern technology, we deliver homes that are not only beautiful but also sustainable and enduring.
                    </p>
                </FadeInUp>
                <FadeInUp delay={0.4} className="relative aspect-[4/3] w-full overflow-hidden mt-8 md:mt-12">
                     <Image
                        src="/john-fornander-tVzyDSV84w8-unsplash.jpg"
                        alt="Interior Detail"
                        fill
                        className="object-cover"
                     />
                </FadeInUp>
             </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 md:py-20 bg-gray-50 text-black px-4 md:px-12">
         <div className="max-w-7xl mx-auto">
            <FadeInUp className="mb-12 md:mb-20">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">The Process</h2>
                <div className="h-px w-full bg-gray-200"></div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <FadeInUp key={step.id} delay={index * 0.1} className="group">
                        <div className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-400 group-hover:text-black transition-colors">
                            {step.id}
                        </div>
                        <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                        <p className="font-sans font-light text-gray-600 leading-relaxed text-sm md:text-base">
                            {step.description}
                        </p>
                    </FadeInUp>
                ))}
            </div>
         </div>
      </section>

      <FAQSection items={commonFAQs.approach} injectSchema={false} />

      <div className="relative bg-background z-10">
        <CTA />
      </div>
    </>
  );
}
