"use client";

import Link from "next/link";
import { companyInfo } from "@/data/company";
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, Loader2 } from "lucide-react";
import { LineReveal, FadeInUp } from "@/components/ui/AnimatedText";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      if (!db) {
        console.error("❌ Newsletter disabled: no database configured.");
        setStatus("error");
        return;
      }
      await addDoc(collection(db, "news_update"), {
        email,
        subscribedAt: serverTimestamp(),
      });
      setStatus("success");
      console.log("✅ Subscribed successfully");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("❌ Error subscribing:", error);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-8 md:px-12">
        {/* Top Section: CTA and Brand */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
            <div className="max-w-2xl">
                <div className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                    <LineReveal 
                        lines={[
                            "Let's restore something",
                            "extraordinary together."
                        ]}
                        delay={0.2}
                    />
                </div>
                <FadeInUp delay={0.6}>
                    <Link href="/contact" className="inline-flex items-center gap-3 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity group">
                        Get a Quote
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </FadeInUp>
            </div>
            
            <FadeInUp delay={0.8} className="flex flex-col items-start md:items-end">
                <div className="text-right hidden md:block mb-8">
                     <span className="text-sm font-bold tracking-widest uppercase block mb-2">Perfect Care Restoration</span>
                     <span className="text-sm text-gray-400">Luxury Leather Repair & Restoration</span>
                </div>
            </FadeInUp>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 mb-16">
            {/* Contact */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">Contact</h3>
                <p className="text-sm leading-relaxed mb-4 text-gray-300">
                    {companyInfo.contact.address}
                </p>
                <a href={`tel:${companyInfo.contact.phone}`} className="block text-sm hover:text-white text-gray-300 transition-colors mb-2">
                    {companyInfo.contact.phone}
                </a>
                <a href={`mailto:${companyInfo.contact.email}`} className="block text-sm hover:text-white text-gray-300 transition-colors">
                    {companyInfo.contact.email}
                </a>
            </div>

            {/* Menu */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">Menu</h3>
                <ul className="space-y-4">
                    <li><Link href="/projects" className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link></li>
                    <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                    <li><Link href="/news" className="text-sm text-gray-300 hover:text-white transition-colors">News</Link></li>
                    <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                </ul>
            </div>

            {/* Social */}
            <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">Social</h3>
                <ul className="space-y-4">
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">Instagram <ArrowRight className="w-3 h-3 -rotate-45" /></a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">LinkedIn <ArrowRight className="w-3 h-3 -rotate-45" /></a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">Facebook <ArrowRight className="w-3 h-3 -rotate-45" /></a></li>
                </ul>
            </div>

             {/* Newsletter (Simplified) */}
             <div>
                <h3 className="text-xs font-normal tracking-widest uppercase mb-6 text-gray-500">Newsletter</h3>
                <p className="text-sm text-gray-400 mb-4">Subscribe for latest updates.</p>
                <form onSubmit={handleSubmit} className="flex border-b border-white/20 pb-2 relative">
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address" 
                        required
                        disabled={status === "loading" || status === "success"}
                        className="bg-transparent w-full text-sm outline-none text-white placeholder:text-gray-600 disabled:opacity-50" 
                    />
                    <button 
                        type="submit" 
                        disabled={status === "loading" || status === "success"}
                        className="text-xs uppercase tracking-widest hover:opacity-70 disabled:opacity-50"
                    >
                        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
                    </button>
                </form>
                {status === "success" && <p className="text-green-500 text-xs mt-2">✅ Subscribed successfully!</p>}
                {status === "error" && <p className="text-red-500 text-xs mt-2">❌ Error subscribing. Try again.</p>}
            </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500">
            <p>&copy; {currentYear} Perfect Care Restoration. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
