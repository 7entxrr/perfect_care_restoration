"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { AnimatedText, FadeInUp } from "@/components/ui/AnimatedText";
import { companyInfo } from "@/data/company";

export function CTA() {
  return (
    <section className="relative py-16 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp delay={0.2}>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
              Begin Your Journey
            </span>
          </FadeInUp>

          <div className="mb-8">
            <AnimatedText
              text="Restore Your Leather To Perfection"
              className="text-4xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1]"
            />
          </div>

          <FadeInUp delay={0.4} className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Bring back the original beauty of your leather goods. Book a repair or get a quote from our restoration experts.
            </p>
          </FadeInUp>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
            <FadeInUp delay={0.6}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background overflow-hidden transition-all duration-300 hover:bg-primary hover:text-primary-foreground min-w-[200px]"
              >
                <span className="relative z-10 font-medium tracking-wide">Schedule Call</span>
                <ArrowRight className="w-4 h-4 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </FadeInUp>

            <FadeInUp delay={0.7}>
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center px-8 py-4 border border-foreground text-foreground overflow-hidden transition-all duration-300 hover:bg-foreground hover:text-background min-w-[200px]"
              >
                <span className="relative z-10 font-medium tracking-wide">View Projects</span>
              </Link>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
            <FadeInUp delay={0.8} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-serif text-lg">Book Appointment</h3>
              <p className="text-sm text-muted-foreground">Select a time that works for you</p>
            </FadeInUp>

            <FadeInUp delay={0.9} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                <Phone className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-serif text-lg">Direct Contact</h3>
              <p className="text-sm text-muted-foreground">{companyInfo.contact.phone}</p>
            </FadeInUp>

            <FadeInUp delay={1.0} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                <ArrowRight className="w-5 h-5 text-foreground -rotate-45" />
              </div>
              <h3 className="font-serif text-lg">Visit Our Office</h3>
              <p className="text-sm text-muted-foreground">Get directions to our studio</p>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
