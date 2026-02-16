"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tablet, PenTool, Layout, Users } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";
import { NeonSpotlightButton } from "@/components/ui/neon-spotlight-button";

const services = [
  {
    title: "Интерактивный минимум",
    description: "Интерактивная презентация на планшете, тач-панели или экране. Посетитель не смотрит — он трогает, листает, изучает.",
    price: "от 50 000 ₽ / от 5 дней",
    icon: Tablet,
    colSpan: "md:col-span-1",
  },
  {
    title: "Концепция присутствия",
    description: "Изучаем задачу, аудиторию и площадку. Собираем сценарий и технологии. На выходе — готовый план.",
    price: "от 150 000 ₽",
    icon: PenTool,
    colSpan: "md:col-span-1",
  },
  {
    title: "Проект под ключ",
    description: "Концепция, контент, оборудование, монтаж — всё на нас. Один контакт — готовый результат.",
    price: "от 300 000 ₽",
    icon: Layout,
    colSpan: "md:col-span-2",
  },
  {
    title: "Сезонное партнёрство",
    description: "Ваш штаб на весь сезон — планируем, готовим, адаптируем. Никаких авралов.",
    price: "Индивидуально",
    icon: Users,
    colSpan: "md:col-span-2",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <FadeIn className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Решения для бизнеса</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            От простых интерактивных элементов до комплексных стратегий присутствия на выставках.
          </p>
        </FadeIn>
        
        {/* Desktop Grid */}
        <FadeInStagger className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInItem}
              className={`${service.colSpan} group h-full`}
            >
              <Spotlight className="h-full bg-card/50 backdrop-blur-sm transition-colors flex flex-col">
                <Card className="h-full border-0 bg-transparent shadow-none flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <CardDescription className="text-sm md:text-base flex-grow">
                      {service.description}
                    </CardDescription>
                    <div className="pt-4 text-sm font-medium text-primary">
                      {service.price}
                    </div>
                    <div className="pt-2">
                      <NeonSpotlightButton className="w-full">
                        Подробнее
                      </NeonSpotlightButton>
                    </div>
                  </CardContent>
                </Card>
              </Spotlight>
            </motion.div>
          ))}
        </FadeInStagger>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {services.map((service, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85vw] max-w-[300px] h-full"
            >
              <Spotlight className="h-full bg-card/50 backdrop-blur-sm transition-colors rounded-xl border border-border/50 flex flex-col">
                <Card className="h-full border-0 bg-transparent shadow-none flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <CardDescription className="text-sm flex-grow">
                      {service.description}
                    </CardDescription>
                    <div className="pt-4 text-sm font-medium text-primary">
                      {service.price}
                    </div>
                    <div className="pt-2">
                      <NeonSpotlightButton className="w-full">
                        Подробнее
                      </NeonSpotlightButton>
                    </div>
                  </CardContent>
                </Card>
              </Spotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
