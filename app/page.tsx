import { ResponsiveHero } from "@/components/home/ResponsiveHero";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { StudioSection } from "@/components/home/StudioSection";
import { FAQSection } from "@/components/ui/FAQSection";
import { commonFAQs } from "@/data/faq";
import { Schema } from "@/components/seo/Schema";
import { companyInfo } from "@/data/company";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.perfectcarerestoration.com/#organization",
        "name": "Perfect Care Restoration",
        "url": "https://www.perfectcarerestoration.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.perfectcarerestoration.com/logo.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": companyInfo.contact.phone,
          "contactType": "customer service"
        },
        "sameAs": [
          companyInfo.social.facebook,
          companyInfo.social.instagram,
          companyInfo.social.linkedin,
          companyInfo.social.twitter
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": companyInfo.reviews.averageRating,
          "reviewCount": companyInfo.reviews.reviewCount,
          "bestRating": companyInfo.reviews.bestRating,
          "worstRating": companyInfo.reviews.worstRating
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.perfectcarerestoration.com/#website",
        "url": "https://www.perfectcarerestoration.com",
        "name": "Perfect Care Restoration",
        "alternateName": ["Perfect Care Restoration", "Perfect Care Restoration Noida"],
        "description": companyInfo.description,
        "publisher": {
          "@id": "https://www.perfectcarerestoration.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.perfectcarerestoration.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
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
      },
      ...["About", "Projects", "Approach", "News", "Blog", "Contact"].map(name => ({
        "@type": "SiteNavigationElement",
        "name": name,
        "url": `https://www.perfectcarerestoration.com/${name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    ]
  };

  return (
    <main>
      <Schema data={schema} />
      <ResponsiveHero />
      <FeaturedProjectsSection />
      <BlogSection />
      <FAQSection items={commonFAQs.general} injectSchema={false} />
      <StudioSection />
    </main>
  );
}
