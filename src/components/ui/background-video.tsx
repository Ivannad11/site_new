"use client";

import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

export function BackgroundVideo({ src, className }: BackgroundVideoProps) {
  return (
    <div className={cn("absolute inset-0 -z-20 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-background/80 z-10" /> {/* Overlay for text readability */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
