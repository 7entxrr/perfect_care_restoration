import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { companyInfo } from "@/data/company";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import { FAQSection } from "@/components/ui/FAQSection";
import { commonFAQs } from "@/data/faq";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "Contact Us | Perfect Care Restoration",
  description: "Get in touch with Perfect Care Restoration for inquiries, bookings, and more.",
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "Contact Us",
        "description": "Get in touch with Perfect Care Restoration for inquiries and bookings.",
        "url": "https://www.perfectcarerestoration.com/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": companyInfo.name,
          "telephone": companyInfo.contact.phone,
          "email": companyInfo.contact.email,
          "address": companyInfo.contact.address
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": commonFAQs.contact.map(item => ({
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
    { name: "Contact", url: "/contact" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Get in Touch"
        subtitle="We are here to help restore your leather — get a quote."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-20 md:py-32 bg-white text-black px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div>
              <div className="mb-12">
                  <div className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                    <LineReveal 
                        lines={[
                            "Let's start a",
                            "conversation."
                        ]}
                    />
                  </div>
                  <FadeInUp delay={0.2}>
                    <p className="text-gray-600 font-sans font-light text-lg leading-relaxed max-w-md">
                        Have questions about our projects or want to schedule a site visit? 
                        Fill out the form or reach out to us directly.
                    </p>
                  </FadeInUp>
              </div>

              <div className="space-y-12">
                <FadeInUp delay={0.3} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center text-black border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Visit Us</h3>
                    <p className="text-gray-600 font-sans font-light">{companyInfo.contact.address}</p>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.4} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center text-black border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Call Us</h3>
                    <p className="text-gray-600 font-sans font-light">
                        <a href={`tel:${companyInfo.contact.phone}`} className="hover:text-black transition-colors border-b border-transparent hover:border-black">
                            {companyInfo.contact.phone}
                        </a>
                    </p>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.5} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center text-black border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Email Us</h3>
                    <p className="text-gray-600 font-sans font-light">
                        <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-black transition-colors border-b border-transparent hover:border-black">
                            {companyInfo.contact.email}
                        </a>
                    </p>
                  </div>
                </FadeInUp>
              </div>
            </div>

            {/* Form */}
            <FadeInUp delay={0.6} className="bg-gray-50 p-8 md:p-12">
              <h3 className="text-2xl font-serif mb-8">Send us a Message</h3>
              <ContactForm />
            </FadeInUp>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-32 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <FadeInUp delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-serif">Visit Our Studio</h3>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <p className="text-gray-600 mt-2">Coordinates: 28.49787, 77.15839</p>
            </FadeInUp>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/20 via-transparent to-black/30" />
            <div className="absolute top-4 left-4 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10">
                <span className="font-serif">{companyInfo.name}</span>
                <span className="text-white/60">•</span>
                <span className="text-sm">Sultanpur Studio</span>
              </div>
            </div>
            <iframe
              src={companyInfo.contact.mapUrl}
              className="w-full h-[420px] md:h-[560px]"
              loading="lazy"
              style={{ filter: "grayscale(20%) contrast(1.05) saturate(1.1)" }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center">
                <span className="relative inline-flex h-16 w-16 items-center justify-center">
                  <span className="absolute inline-flex h-16 w-16 rounded-full bg-primary/30 animate-ping" />
                  <MapPin className="text-primary drop-shadow-xl" size={36} />
                </span>
                <div className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10">
                  <span className="font-serif">{companyInfo.name}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-white/90">
                <div className="text-sm uppercase tracking-widest">Studio Address</div>
                <div className="font-serif text-lg">{companyInfo.contact.address}</div>
              </div>
              <a
                href="https://www.google.com/maps?q=28.49787,77.15839"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={commonFAQs.contact} injectSchema={false} />
    </>
  );
}
