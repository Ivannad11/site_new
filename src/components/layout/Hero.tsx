"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { FadeInStagger, fadeInItem } from "@/components/animations/FadeIn";
import Link from "next/link";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid Background Overlay - Now cleaner as video is global */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background/30 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3], 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8"
      >
        <FadeInStagger faster className="space-y-4 max-w-3xl flex flex-col items-center">
          <motion.div variants={fadeInItem} className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Агентство интерактивных решений
          </motion.div>
          
          <motion.h1 variants={fadeInItem} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-sm">
            Превращаем стенд <br className="hidden md:block" />
            в инструмент продаж
          </motion.h1>
          
          <motion.p variants={fadeInItem} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Стратегия, креатив и технологии в одном окне.
            Мы делаем так, чтобы стенды работали на ваш бизнес, а не просто стояли.
          </motion.p>

          <motion.div
            variants={fadeInItem}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4"
          >
            <Button size="lg" className="text-base h-12 px-8 group" id="hero-button-primary" asChild>
              <Link href="#contacts">
                Обсудить проект
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-background/50 backdrop-blur-sm" id="hero-button-secondary" asChild>
              <Link href="#portfolio">
                Смотреть кейсы
              </Link>
            </Button>
          </motion.div>
        </FadeInStagger>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 mt-12 border-t border-border/50 w-full max-w-4xl"
        >
          {[
            { label: "Проектов", value: "50+" },
            { label: "Отраслей", value: "12+" },
            { label: "Вовлечённость", value: "×4" },
            { label: "Бюджет", value: "-30%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-0 right-0 flex justify-center text-muted-foreground"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
