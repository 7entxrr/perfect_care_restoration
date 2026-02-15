"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { companyInfo } from "@/data/company";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Define nav links to match the new design
  const centerLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Approach", href: "/approach" },
    { name: "About Us", href: "/about" },
  ];

  const rightLinks = [
    { name: "News", href: "/news" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const allLinks = [...centerLinks, ...rightLinks];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "py-4" : "py-6",
        isOpen
          ? "bg-transparent text-white"
          : scrolled
          ? "bg-white/95 backdrop-blur-md text-black border-b border-black/5"
          : "bg-transparent text-white"
      )}
    >
      <div className="container mx-auto px-8 md:px-12 flex justify-between items-start">
        {/* Left: Brand */}
        <Link href="/" className="text-sm font-bold tracking-widest uppercase relative z-50">
          {companyInfo.name}
        </Link>

        {/* Desktop Nav - Center */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-widest uppercase absolute left-1/2 -translate-x-1/2 top-6">
          {centerLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Nav - Right */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-widest uppercase">
          {rightLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-white z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {allLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-light tracking-widest uppercase"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
