import { PageHeader } from "@/components/ui/PageHeader";
import { FadeInUp } from "@/components/ui/AnimatedText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "News & Media | Perfect Care Restoration",
  description: "Latest news, awards, and media coverage for Perfect Care Restoration.",
};

const newsItems = [
  {
    id: 1,
    title: "New Service: Luxury Handbag Recoloring & Refinishing",
    date: "March 7, 2026",
    category: "Services",
    summary: "Premium recoloring and finish renewal for designer handbags now available at our studio."
  },
  {
    id: 2,
    title: "Workshop Expansion: New Stitching & Lining Section",
    date: "April 14, 2026",
    category: "Updates",
    summary: "Enhanced capacity for structural repairs, relining, and handle replacements with dedicated workstations."
  },
  {
    id: 3,
    title: "Care Program: Leather Conditioning & Protection Plans",
    date: "Feb 20, 2026",
    category: "Programs",
    summary: "Annual care plans launched for shoes, bags, and jackets, including periodic conditioning and inspections."
  },
  {
    id: 4,
    title: "On-Site Service: Furniture & Auto Interior Repairs",
    date: "Jan 21, 2026",
    category: "Services",
    summary: "Book on-site leather repairs for sofas, chairs, and car interiors with certified technicians."
  }
];

export default function NewsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Perfect Care Restoration News",
    "description": "Latest updates, press releases, and announcements.",
    "url": "https://www.perfectcarerestoration.com/news",
    "hasPart": newsItems.map(item => ({
      "@type": "NewsArticle",
      "headline": item.title,
      "datePublished": item.date,
      "articleSection": item.category,
      "description": item.summary
    }))
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "News", url: "/news" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Newsroom"
        subtitle="Latest updates and announcements."
      />

      <section className="py-20 px-4 md:px-12 bg-white text-black min-h-screen">
        <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
                {newsItems.map((item, index) => (
                    <FadeInUp key={item.id} delay={index * 0.1} className="group border-b border-gray-100 pb-12 last:border-0">
                        <div className="flex flex-col md:flex-row gap-4 md:items-baseline justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {item.date} — {item.category}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-gray-600 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-gray-600 font-sans font-light leading-relaxed mb-6 max-w-2xl">
                            {item.summary}
                        </p>
                        <Link href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition-all">
                            Read Release <ArrowRight size={14} />
                        </Link>
                    </FadeInUp>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
