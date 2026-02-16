"use client";

import { motion } from "framer-motion";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/animations/FadeIn";

const steps = [
  {
    title: "Брифинг",
    description: "Вы рассказываете о задаче. Мы задаём вопросы про аудиторию, конкурентов и цели.",
  },
  {
    title: "Концепция",
    description: "Сценарий + технологии. Вы видите решение до старта производства.",
  },
  {
    title: "Реализация",
    description: "Контент, сборка, координация. Кто делает 3D, кто код — не ваша забота.",
  },
  {
    title: "Запуск",
    description: "Монтаж, настройка, тест. Вы приходите — всё работает.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <FadeIn className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Как мы работаем</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Прозрачный процесс от идеи до реализации.
          </p>
        </FadeIn>

        {/* Desktop Grid */}
        <FadeInStagger className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-border/50 -z-10" />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden lg:block absolute top-12 left-0 h-0.5 bg-primary -z-10" 
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInItem}
              className="relative flex flex-col items-center text-center space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.1, borderColor: "var(--primary)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center z-10 transition-colors duration-300"
              >
                <span className="text-2xl font-bold text-muted-foreground group-hover:text-primary">0{i + 1}</span>
              </motion.div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">{step.description}</p>
            </motion.div>
          ))}
        </FadeInStagger>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {steps.map((step, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[70vw] max-w-[280px] flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-background border-4 border-muted flex items-center justify-center z-10">
                <span className="text-xl font-bold text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
