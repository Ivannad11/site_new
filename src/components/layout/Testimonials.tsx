"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FadeIn } from "@/components/animations/FadeIn";

const testimonials = [
  {
    quote:
      "Стенд стал настоящим магнитом на выставке. Мы собрали в 4 раза больше контактов, чем в прошлом году. Интерактив действительно работает!",
    name: "Алексей Смирнов",
    title: "Директор по маркетингу, ФармГрупп",
    avatar: "AS",
  },
  {
    quote:
      "Ребята из ШТАБ полностью взяли на себя техническую часть. Нам осталось только приехать и работать. Идеальное партнерство.",
    name: "Елена Ковалева",
    title: "Event-менеджер, ТехноПолис",
    avatar: "EK",
  },
  {
    quote:
      "Интерактивная карта вилл произвела фурор в Дубае. Инвесторы могли сами 'погулять' по поселку. Продали 5 объектов прямо на стенде.",
    name: "Дмитрий Волков",
    title: "CEO, Luxury Estate",
    avatar: "DV",
  },
  {
    quote:
      "Очень креативный подход к визуализации сложных данных. Наше ПО для визуализации стратегии развития города получило награду выставки.",
    name: "Мария Петрова",
    title: "Зам. руководителя, Департамент Градостроительства",
    avatar: "MP",
  },
  {
    quote:
      "Работаем уже третий сезон. Нравится, что можно адаптировать контент под разные площадки без переделки всего стенда. Экономия бюджета ощутимая.",
    name: "Сергей Иванов",
    title: "Бренд-менеджер, AutoDrive",
    avatar: "SI",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto mb-12">
        <FadeIn className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Отзывы клиентов</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Нам доверяют лидеры рынка.
          </p>
        </FadeIn>
      </div>
      
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10"></div>
      </div>
    </section>
  );
}
