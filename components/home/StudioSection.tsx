"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealTitle, FadeInUp, LineReveal } from "@/components/ui/AnimatedText";
import { MobileStudioSection } from "./MobileStudioSection";

export function StudioSection() {
  return (
    <>
      <div className="block md:hidden">
        <MobileStudioSection />
      </div>
      <div className="hidden md:block">
        <section className="bg-white text-black py-20 px-4 md:px-12">
          {/* Huge Header */}
          <div className="w-full mb-16 md:mb-24 border-b border-gray-100 pb-8">
            <div className="text-[12vw] leading-none font-serif tracking-tight text-center md:text-left">
              <RevealTitle text="PERFECT CARE" />
              <RevealTitle text="RESTORATION" delay={0.2} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left Column: Image */}
            <div className="md:col-span-5 lg:col-span-4">
              <FadeInUp delay={0.4} className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/10160351/pexels-photo-10160351.jpeg"
                  alt="Leather craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </FadeInUp>
            </div>

            {/* Right Column: Text Content */}
            <div className="md:col-span-7 lg:col-span-6 lg:col-start-6 flex flex-col justify-between h-full pt-4">
              <div>
                <FadeInUp delay={0.5}>
                  <span className="text-xs font-bold uppercase tracking-widest mb-8 block">Studio</span>
                </FadeInUp>
                
                <div className="text-xl md:text-2xl leading-relaxed font-sans font-light space-y-8 mb-12">
                  <FadeInUp delay={0.6}>
                    <p>
                      Perfect Care Restoration is a premium leather repair and restoration studio. 
                      We meticulously revive high-end leather goods — from shoes and belts to handbags, jackets, furniture, and auto interiors.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.7}>
                    <p>
                      Our mission is to extend the life of leather through expert recoloring, conditioning, stitching, and refinishing. 
                      Crafted care, sustainable results, luxury preserved.
                    </p>
                  </FadeInUp>
                </div>
              </div>

              <FadeInUp delay={0.8}>
                <Link 
                  href="/about" 
                  className="group inline-flex items-center gap-2 text-lg hover:opacity-70 transition-all"
                >
                  <span>More about Perfect Care Restoration</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeInUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
