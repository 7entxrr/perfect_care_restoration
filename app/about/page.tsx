import { PageHeader } from "@/components/ui/PageHeader";
import { companyInfo } from "@/data/company";
import { FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import Image from "next/image";
import { CTA } from "@/components/home/CTA";
import { FAQSection } from "@/components/ui/FAQSection";
import { commonFAQs } from "@/data/faq";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "About Us | Perfect Care Restoration",
  description: "Learn more about Perfect Care Restoration, our vision, legacy, and commitment to quality.",
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "name": "About Us",
        "description": companyInfo.description,
        "publisher": {
          "@type": "Organization",
          "name": companyInfo.name,
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.perfectcarerestoration.com/logo.png"
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": commonFAQs.general.map(item => ({
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
    { name: "About Us", url: "/about" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Who We Are"
        subtitle="Leather repair and restoration crafted with precision."
        backgroundImage="https://images.pexels.com/photos/34279970/pexels-photo-34279970.jpeg"
      />

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-white text-black px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <FadeInUp>
                    <span className="text-xs font-bold uppercase tracking-widest mb-6 block text-gray-400">Our Story</span>
                </FadeInUp>
                <div className="text-3xl md:text-5xl font-serif leading-tight mb-8">
                    <LineReveal 
                        lines={[
                            "Decades of Craftsmanship",
                            "in Leather Restoration"
                        ]}
                    />
                </div>
              <div className="space-y-6 text-gray-600 leading-relaxed font-sans font-light text-lg">
                <FadeInUp delay={0.2}>
                    <p>{companyInfo.description}</p>
                </FadeInUp>
                <FadeInUp delay={0.3}>
                    <p>
                    Founded with a vision to preserve luxury and extend the life of leather, {companyInfo.name} has grown to become a trusted name in repair and restoration.
                    </p>
                </FadeInUp>
                <FadeInUp delay={0.4}>
                    <p>
                    Our journey is defined by meticulous workmanship, ethical care practices, and lasting results that honor the original character of every piece.
                    </p>
                </FadeInUp>
              </div>
            </div>
            <FadeInUp delay={0.5} className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/13525167/pexels-photo-13525167.jpeg"
                alt="Luxury leather bag close-up"
                fill
                className="object-cover"
              />
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50 text-black px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <FadeInUp className="border-t border-gray-200 pt-8">
                    <h3 className="text-3xl font-serif mb-6">Our Vision</h3>
                    <p className="text-gray-600 font-sans font-light text-lg leading-relaxed">
                        {companyInfo.vision} To set new benchmarks in the real estate industry by delivering projects that are a perfect blend of luxury, sustainability, and affordability.
                    </p>
                </FadeInUp>
                <FadeInUp delay={0.2} className="border-t border-gray-200 pt-8">
                    <h3 className="text-3xl font-serif mb-6">Our Mission</h3>
                    <p className="text-gray-600 font-sans font-light text-lg leading-relaxed">
                        To consistently deliver high-quality projects on time. To maintain the highest standards of ethics and transparency in all our dealings. To ensure customer satisfaction is at the heart of everything we do.
                    </p>
                </FadeInUp>
            </div>
        </div>
      </section>

      {/* Stats - Custom Implementation for clean look */}
      <section className="py-20 bg-black text-white px-4 md:px-12">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {companyInfo.stats.map((stat, index) => (
                <FadeInUp key={index} delay={index * 0.1} className="text-center md:text-left">
                    <div className="text-4xl md:text-6xl font-serif mb-2">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest opacity-60">{stat.label}</div>
                </FadeInUp>
            ))}
         </div>
      </section>

      <FAQSection items={commonFAQs.general} injectSchema={false} />

      <div className="relative bg-background z-10">
        <CTA />
      </div>
    </>
  );
}
