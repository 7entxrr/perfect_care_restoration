"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { MobileExperience } from "./MobileExperience";

gsap.registerPlugin(ScrollTrigger);

const images = {
  exterior: "/lotus-design-n-print-wRzBarqn3hs-unsplash.jpg",
  doorTexture: "/bailey-alexander-RbbZn_M5fgU-unsplash.jpg", // Using a texture-like image for doors
  interior: "/spacejoy-XM-miHibz64-unsplash.jpg",
  kitchen: "/jason-briscoe-UV81E0oXXWQ-unsplash.jpg",
  bedroom: "/thanos-pal-61TfyNIrWmI-unsplash.jpg",
  bathroom: "/bailey-alexander-cYeCxtKpTTQ-unsplash.jpg",
  detail: "/john-fornander-tVzyDSV84w8-unsplash.jpg"
};

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const exteriorRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const kitchenRef = useRef<HTMLDivElement>(null);
  const bedroomRef = useRef<HTMLDivElement>(null);
  const bathroomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const staircaseRef = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<"none" | "bedroom" | "kitchen">("none");
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    const mq = window.matchMedia("(max-width: 768px)").matches;
    const ua = navigator.userAgent || "";
    return /Mobi|Android/i.test(ua) || mq;
  });
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  
  // Main Scroll Animation (Cinematic Video Transitions)
  useGSAP(() => {
    if (isMobile) return;
    if (!worldRef.current || !exteriorRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000%",
        scrub: 1,
        pin: true,
      },
    });

    gsap.set(interiorRef.current, { zIndex: 10, opacity: 0, scale: 1 });
    gsap.set(exteriorRef.current, { zIndex: 20, opacity: 1, scale: 1 });
    gsap.set([doorLeftRef.current, doorRightRef.current], { zIndex: 30, opacity: 0, y: 20 });
    gsap.set([kitchenRef.current, bedroomRef.current], { zIndex: 40, opacity: 0, scale: 1 });
    gsap.set(bathroomRef.current, { zIndex: 41, opacity: 0, scale: 1 });
    gsap.set(staircaseRef.current, { zIndex: 45, opacity: 0, y: "100%" });

    tl.to(textRef.current, { opacity: 0, scale: 1.1, duration: 1, ease: "power2.in" })
      .to(exteriorRef.current, { scale: 1.4, xPercent: 5, yPercent: -10, duration: 2.5, ease: "power1.inOut" }, "<")
      .to(exteriorRef.current, { opacity: 0, duration: 0.6, ease: "power1.inOut" })
      .to(interiorRef.current, { opacity: 1, duration: 0.8, ease: "power1.out" }, "<")
      .to([doorLeftRef.current, doorRightRef.current], { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(interiorRef.current, { scale: 1.05, duration: 1.5, ease: "none" })
      .to(staircaseRef.current, { opacity: 1, y: "0%", duration: 1.5, ease: "power2.inOut" })
      .to([doorLeftRef.current, doorRightRef.current, interiorRef.current, kitchenRef.current, bedroomRef.current], { opacity: 0, duration: 1.2, ease: "power1.inOut" }, "<")
      .to(staircaseRef.current, { scale: 1.05, duration: 1.5, ease: "none" })
      .to(staircaseRef.current, { opacity: 0, duration: 0.8, ease: "power1.inOut" })
      .to(exteriorRef.current, { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, duration: 1.5, ease: "power2.out" });

  }, { scope: containerRef, dependencies: [isMobile] });

  const handleDoorClick = (room: "bedroom" | "kitchen") => {
    setSelectedRoom(room);
    const showRef = room === "bedroom" ? bedroomRef.current : kitchenRef.current;
    const hideRef = room === "bedroom" ? kitchenRef.current : bedroomRef.current;
    gsap.to(interiorRef.current, { opacity: 0.5, duration: 0.4, ease: "power1.inOut" });
    gsap.set(hideRef, { opacity: 0 });
    gsap.to(showRef, { opacity: 1, duration: 0.6, ease: "power2.out" });
  };

  if (isMobile) {
    return <MobileExperience />;
  }
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      <div ref={worldRef} className="relative w-full h-full">
        
        <div ref={exteriorRef} className="absolute inset-0 w-full h-full z-10 origin-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
          <img src={images.exterior} alt="Exterior" className="w-full h-full object-cover" loading="eager" />
          <div ref={textRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <span className="text-primary font-bold tracking-[0.5em] uppercase mb-4 text-sm md:text-base animate-pulse">Restoration Concept</span>
            <h1 className="text-6xl md:text-[10rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              PERFECT CARE<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary/80">RESTORATION</span>
            </h1>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-50">
            <div ref={doorLeftRef} className="absolute left-0 top-0 w-1/2 h-full bg-[#1a1a1a] border-r border-white/10 overflow-hidden shadow-2xl origin-left cursor-pointer" onClick={() => handleDoorClick("bedroom")}>
                <div className="absolute inset-0 bg-black/40" />
                <img src={images.doorTexture} className="w-[200%] h-full object-cover object-left max-w-none" alt="Door Left" />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-48 bg-gradient-to-b from-amber-200 to-amber-600 rounded-full shadow-lg" />
            </div>
            <div ref={doorRightRef} className="absolute right-0 top-0 w-1/2 h-full bg-[#1a1a1a] border-l border-white/10 overflow-hidden shadow-2xl origin-right cursor-pointer" onClick={() => handleDoorClick("kitchen")}>
                <div className="absolute inset-0 bg-black/40" />
                <img src={images.doorTexture} className="w-[200%] h-full object-cover object-right max-w-none" style={{ transform: "translateX(-50%)" }} alt="Door Right" />
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-48 bg-gradient-to-b from-amber-200 to-amber-600 rounded-full shadow-lg" />
            </div>
        </div>

        <div ref={interiorRef} className="absolute inset-0 w-full h-full origin-center">
          <img src={images.interior} alt="Living Room" className="w-full h-full object-cover brightness-110" loading="eager" />
          <div className="absolute bottom-12 left-12 max-w-2xl z-20">
             <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">Living Space</h2>
          </div>
        </div>

        <div ref={kitchenRef} className={`absolute inset-0 w-full h-full origin-center ${selectedRoom === "kitchen" ? "" : ""}`}>
          <img src={images.kitchen} alt="Kitchen" className="w-full h-full object-cover brightness-110" loading="eager" />
           <div className="absolute bottom-12 right-12 max-w-2xl z-20 text-right">
             <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">Gourmet Kitchen</h2>
          </div>
        </div>

        <div ref={bedroomRef} className={`absolute inset-0 w-full h-full origin-center ${selectedRoom === "bedroom" ? "" : ""}`}>
          <img src={images.bedroom} alt="Bedroom" className="w-full h-full object-cover brightness-110" loading="eager" />
           <div className="absolute bottom-12 left-12 max-w-2xl z-20">
             <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">Master Suite</h2>
          </div>
        </div>

        <div ref={bathroomRef} className="absolute inset-0 w-full h-full origin-center">
          <img src={images.bathroom} alt="Bathroom" className="w-full h-full object-cover brightness-110" loading="eager" />
           <div className="absolute bottom-12 right-12 max-w-2xl z-20 text-right">
             <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">Serenity Bath</h2>
          </div>
        </div>

        <div ref={staircaseRef} className="absolute inset-0 w-full h-full origin-center">
          <img src={images.detail} alt="Staircase" className="w-full h-full object-cover brightness-110" loading="eager" />
          <div className="absolute bottom-12 left-12 max-w-2xl z-20">
             <h2 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter shadow-black drop-shadow-lg">Staircase</h2>
          </div>
        </div>

      </div>
    </div>
  );
}
