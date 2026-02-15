import { PageHeader } from "@/components/ui/PageHeader";
import { FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Schema } from "@/components/seo/Schema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata = {
  title: "Blog | Perfect Care Restoration",
  description: "Insights, care guides, and restoration stories for luxury leather goods.",
};

const articles = [
  {
    id: 1,
    title: "Leather Care 101: Conditioning, Cleaning, Protection",
    category: "Care",
    date: "Feb 10, 2026",
    image: "https://images.pexels.com/photos/25003973/pexels-photo-25003973.jpeg",
    excerpt: "Practical steps to maintain leather items, prevent cracks, and preserve natural sheen."
  },
  {
    id: 2,
    title: "Restoration vs Repair: Choosing the Right Approach",
    category: "Guides",
    date: "Jan 25, 2026",
    image: "https://images.pexels.com/photos/30750480/pexels-photo-30750480.jpeg",
    excerpt: "When to recolor, refinish, or replace components for long-lasting results."
  },
  {
    id: 3,
    title: "Edge Coat Excellence: Fixing Worn Edges on Bags",
    category: "Craft",
    date: "Jan 12, 2026",
    image: "https://images.pexels.com/photos/13525167/pexels-photo-13525167.jpeg",
    excerpt: "Techniques and materials we use to rebuild and refinish edge coats cleanly."
  },
  {
    id: 4,
    title: "Color Matching Secrets for Luxury Leather",
    category: "Technique",
    date: "Dec 28, 2025",
    image: "https://images.pexels.com/photos/9453448/pexels-photo-9453448.jpeg",
    excerpt: "How we custom-blend dyes to achieve seamless restoration without overcoating."
  },
];

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Perfect Care Restoration Blog",
    "description": "Care guides and restoration insights for luxury leather goods.",
    "url": "https://www.perfectcarerestoration.com/blog",
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "datePublished": article.date,
      "image": article.image,
      "articleSection": article.category,
      "description": article.excerpt
    }))
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ];

  return (
    <>
      <Schema data={schema} />
      <BreadcrumbSchema items={breadcrumbs} />
      <PageHeader
        title="Journal"
        subtitle="Thoughts on design, living, and culture."
      />

      <section className="py-20 px-4 md:px-12 bg-white text-black">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {articles.map((article, index) => (
                    <FadeInUp key={article.id} delay={index * 0.1} className="group cursor-pointer">
                        <div className="relative aspect-[16/10] w-full overflow-hidden mb-6">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                {article.category}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest mb-3">
                            <span>{article.date}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif mb-3 leading-tight group-hover:underline decoration-1 underline-offset-4 transition-all">
                            {article.title}
                        </h3>
                        <p className="text-gray-600 font-sans font-light leading-relaxed mb-4">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                            Read Article <ArrowRight size={16} />
                        </div>
                    </FadeInUp>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
