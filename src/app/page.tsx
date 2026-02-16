"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Services } from "@/components/layout/Services";
import { Process } from "@/components/layout/Process";
import { Portfolio } from "@/components/layout/Portfolio";
import { Testimonials } from "@/components/layout/Testimonials";
import { FAQ } from "@/components/layout/FAQ";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/preloader";
import { BackToTop } from "@/components/ui/back-to-top";
import { BeamParticles } from "@/components/ui/beam-particles";
import dynamic from "next/dynamic";

const CustomCursorDynamic = dynamic(() => import("@/components/ui/custom-cursor").then(mod => mod.CustomCursor), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 cursor-none relative">
      <Preloader />
      <ScrollProgress />
      <CustomCursorDynamic />
      <BackToTop />
      
      {/* Interactive Beam Particles (Huly-style) */}
      <BeamParticles />

      {/* Noise Texture */}
      <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: "url('/noise.png')" }}>
      </div>

      <Navbar />

      <Hero />
      <div className="relative z-10 bg-background/60 backdrop-blur-sm">
        <Services />
        <Process />
        <Portfolio />
        {/* <Testimonials /> */}
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
