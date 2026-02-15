"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LineReveal, FadeInUp } from "@/components/ui/AnimatedText";

const articles = [
  {
    id: 1,
    date: "Nov 12, 2025",
    title: "More Is More: Why Maximalism Is Making a Bold Return in Hospitality Design",
    image: "https://images.pexels.com/photos/9453448/pexels-photo-9453448.jpeg"
  },
  {
    id: 2,
    date: "Oct 21, 2025",
    title: "Miami Design: How the City Became a Global Capital of Culture, Cuisine, and Creativity",
    image: "https://images.pexels.com/photos/30750480/pexels-photo-30750480.jpeg"
  },
  {
    id: 3,
    date: "Oct 20, 2025",
    title: "The White Lotus Effect: Are Travelers Searching for Bigger Adventures?",
    image: "https://images.pexels.com/photos/9267588/pexels-photo-9267588.jpeg"
  }
];

export function BlogSection() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-12">
      
      {/* Large Statement Header */}
      <div className="max-w-6xl mb-24">
        <div className="text-3xl md:text-5xl lg:text-[4rem] leading-[1.1] font-serif tracking-tight uppercase">
            <LineReveal 
                lines={[
                    "Our blog is a bright, ever-evolving",
                    "platform where our ideas, our culture",
                    "and our perspective live and breathe."
                ]}
                delay={0.2}
            />
        </div>
      </div>

      {/* Subheader / Controls */}
      <FadeInUp delay={0.4} className="flex justify-between items-end border-b border-gray-200 pb-6 mb-12">
        <span className="text-sm font-medium">Latest blog articles</span>
        <Link 
            href="/blog" 
            className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
        >
            See all blog articles <ArrowRight size={16} />
        </Link>
      </FadeInUp>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
            <FadeInUp key={article.id} className="group cursor-pointer flex flex-col h-full" delay={0.5 + (index * 0.1)}>
                {/* Image Container */}
                <div className="relative w-full aspect-square overflow-hidden mb-6">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow">
                    <span className="text-gray-400 text-xs mb-3 block">{article.date}</span>
                    <h3 className="text-xl md:text-2xl leading-snug font-normal group-hover:underline decoration-1 underline-offset-4" style={{ fontFamily: 'var(--font-italiana)' }}>
                        {article.title}
                    </h3>
                </div>
            </FadeInUp>
        ))}
      </div>

    </section>
  );
}
