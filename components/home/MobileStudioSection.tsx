"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealTitle, FadeInUp } from "@/components/ui/AnimatedText";

export function MobileStudioSection() {
  return (
    <section className="bg-white text-black py-12 px-6">
      {/* Header for Mobile: Smaller font size */}
      <div className="w-full mb-10 border-b border-gray-100 pb-4">
        <div className="text-[18vw] leading-[0.9] font-serif tracking-tighter">
          <RevealTitle text="PERFECT CARE" />
          <RevealTitle text="RESTORATION" delay={0.2} />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Text Content First on Mobile */}
        <div className="flex flex-col">
          <FadeInUp delay={0.3}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block opacity-60">Studio</span>
          </FadeInUp>
          
          <div className="text-lg leading-relaxed font-sans font-light space-y-6 mb-8">
            <FadeInUp delay={0.4}>
              <p>
                Working with us is a true creative partnership. Our clients understand what their spaces 
                need to feel like, and to uncover that, we take the time to truly understand them.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.5}>
              <p>
                These relationships allow us to anticipate what each person needs at every moment in the 
                design process.
              </p>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.6}>
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-2 text-base font-medium border-b border-black pb-1 w-fit"
            >
              <span>More about us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeInUp>
        </div>

        {/* Image at the Bottom for Mobile */}
        <FadeInUp delay={0.7} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src="https://images.pexels.com/photos/28387105/pexels-photo-28387105.jpeg"
            alt="Leather repair workshop"
            fill
            className="object-cover"
          />
        </FadeInUp>
      </div>
    </section>
  );
}
