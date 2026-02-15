"use client";

import { VideoHero } from "@/components/home/VideoHero";
import { MobileVideoHero } from "@/components/home/MobileVideoHero";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

export function ResponsiveHero() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or return a loading spinner / skeleton to avoid hydration mismatch
  }

  return isMobile ? <MobileVideoHero /> : <VideoHero />;
}
