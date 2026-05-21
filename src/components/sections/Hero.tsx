"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0508 50%, #0a0a0a 100%)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-[45%] h-full diagonal-lines pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(166,25,46,0.25) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] w-full px-6 md:px-12 py-24">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-3xl"
        >
          <motion.div variants={fade} className="eyebrow mb-6">
            South Florida's Premier Luxury Real Estate
          </motion.div>
          <motion.h1 variants={fade} className="display-hero text-white">
            Where <em className="italic-accent">Luxury</em> Meets Precision.
          </motion.h1>
          <motion.p
            variants={fade}
            className="mt-7 max-w-xl text-lg text-vg-pewter leading-relaxed"
          >
            A discreet advisory for the South Florida luxury market — residential,
            commercial, HOA, and an invitation-only Sports & Entertainment division.
          </motion.p>
          <motion.div variants={fade} className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/properties" variant="primary" size="lg">
              Explore Listings
              <ChevronRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Schedule a Consultation
            </ButtonLink>
          </motion.div>
          <motion.div
            variants={fade}
            className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 text-[12px] text-vg-pewter"
          >
            <span className="font-accent font-bold uppercase tracking-[2px]">Miami-Dade</span>
            <span className="font-accent font-bold uppercase tracking-[2px]">Broward</span>
            <span className="font-accent font-bold uppercase tracking-[2px]">Palm Beach</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
