"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const images = {
  exterior: "/lotus-design-n-print-wRzBarqn3hs-unsplash.jpg",
  interior: "/spacejoy-XM-miHibz64-unsplash.jpg",
  bedroom: "/thanos-pal-61TfyNIrWmI-unsplash.jpg",
  kitchen: "/jason-briscoe-UV81E0oXXWQ-unsplash.jpg",
  staircase: "/john-fornander-tVzyDSV84w8-unsplash.jpg",
};

export function MobileExperience() {
  const [selected, setSelected] = useState<"bedroom" | "kitchen" | null>(null);

  return (
    <div className="w-full bg-black text-white">
      <section className="relative w-full h-[70vh]">
        <img src={images.exterior} alt="Exterior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-black tracking-tight">PERFECT CARE<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary/80"> RESTORATION</span></h1>
        </div>
      </section>

      <section className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl overflow-hidden">
          <img src={images.interior} alt="Living Room" className="w-full h-auto object-cover" />
        </motion.div>
      </section>

      <section className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 rounded-xl p-4" onClick={() => setSelected("bedroom")}>
            <div className="text-left">
              <div className="text-sm uppercase text-white/70">Door 1</div>
              <div className="text-xl font-semibold">Bedroom</div>
            </div>
          </motion.button>
          <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 rounded-xl p-4" onClick={() => setSelected("kitchen")}>
            <div className="text-left">
              <div className="text-sm uppercase text-white/70">Door 2</div>
              <div className="text-xl font-semibold">Kitchen</div>
            </div>
          </motion.button>
        </div>

        <div className="mt-4">
          {selected === "bedroom" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden">
              <img src={images.bedroom} alt="Bedroom" className="w-full h-auto object-cover" />
            </motion.div>
          )}
          {selected === "kitchen" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden">
              <img src={images.kitchen} alt="Kitchen" className="w-full h-auto object-cover" />
            </motion.div>
          )}
        </div>
      </section>

      <section className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl overflow-hidden">
          <img src={images.staircase} alt="Staircase" className="w-full h-auto object-cover" />
        </motion.div>
      </section>
    </div>
  );
}
