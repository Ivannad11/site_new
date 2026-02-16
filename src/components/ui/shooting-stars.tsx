"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export const ShootingStars = ({
  minDelay = 4500,
  maxDelay = 10000,
  minSpeed = 10,
  maxSpeed = 30,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}: {
  minDelay?: number;
  maxDelay?: number;
  minSpeed?: number;
  maxSpeed?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}) => {
  const [star, setStar] = useState<{
    x: number;
    y: number;
    angle: number;
    scale: number;
    speed: number;
    distance: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const createStar = () => {
      const { innerWidth, innerHeight } = window;
      const x = Math.random() * innerWidth;
      const y = 0;
      const angle = 45;
      const scale = 1 + Math.random();
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      const distance = 0;

      setStar({ x, y, angle, scale, speed, distance });

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();
  }, [minDelay, maxDelay, minSpeed, maxSpeed, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;
          if (
            newX < -20 ||
            newX > window.innerWidth + 20 ||
            newY < -20 ||
            newY > window.innerHeight + 20
          ) {
            return null;
          }
          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star, isMobile]);

  if (isMobile) return null;

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0 z-0 pointer-events-none", className)}
    >
      {star && (
        <rect
          key={star.distance}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const StarsBackground = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}: {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}) => {
  const [stars, setStars] = useState<
    {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number | null;
    }[]
  >([]);

  useEffect(() => {
    const updateStars = () => {
      const { innerWidth, innerHeight } = window;
      const starCount = Math.floor(innerWidth * innerHeight * starDensity);
      const newStars = new Array(starCount).fill(0).map(() => {
        const x = Math.random() * innerWidth;
        const y = Math.random() * innerHeight;
        const radius = Math.random() * 0.5 + 0.5;
        const opacity = Math.random() * 0.5 + 0.1;
        const twinkleSpeed =
          allStarsTwinkle || Math.random() < twinkleProbability
            ? Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) +
              minTwinkleSpeed
            : null;
        return {
          x,
          y,
          radius,
          opacity,
          twinkleSpeed,
        };
      });
      setStars(newStars);
    };

    updateStars();
    window.addEventListener("resize", updateStars);

    return () => window.removeEventListener("resize", updateStars);
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
  ]);

  useEffect(() => {
    const moveStars = () => {
      setStars((prevStars) => {
        return prevStars.map((star) => {
          if (star.twinkleSpeed) {
            const newOpacity =
              0.5 +
              0.4 *
                Math.sin(
                  (Date.now() / 1000) * star.twinkleSpeed +
                    star.x +
                    star.y
                );
            return { ...star, opacity: newOpacity };
          }
          return star;
        });
      });
    };

    const animationFrame = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className={cn("fixed inset-0 h-full w-full z-0 pointer-events-none", className)}
    >
      <svg className="w-full h-full">
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.radius}
            fill="white"
            fillOpacity={star.opacity}
          />
        ))}
      </svg>
    </div>
  );
};
