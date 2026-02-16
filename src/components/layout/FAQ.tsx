"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/animations/FadeIn";

const faqs = [
  {
    question: "Сколько стоит разработка интерактивного стенда?",
    answer:
      "Стоимость зависит от сложности задачи. Простые решения на базе планшетов начинаются от 50 000 ₽. Комплексные проекты с разработкой уникального ПО и арендой оборудования — от 300 000 ₽. Мы всегда предлагаем несколько вариантов сметы под ваш бюджет.",
  },
  {
    question: "Какие сроки реализации?",
    answer:
      "Базовые интерактивные презентации мы собираем за 5–7 рабочих дней. На разработку сложного ПО и производство контента (3D, видео) обычно требуется от 3 до 6 недель. Рекомендуем обращаться за месяц до выставки.",
  },
  {
    question: "Вы предоставляете оборудование в аренду?",
    answer:
      "Да, у нас свой парк оборудования: сенсорные панели, видеостены, киоски и мощные компьютеры. Мы привозим, монтируем и настраиваем всё под ключ.",
  },
  {
    question: "Что если интернет на выставке будет плохим?",
    answer:
      "Мы всегда предусматриваем автономный режим работы. Все наши решения тестируются на работу без интернета (офлайн), чтобы никакие сбои сети не испортили презентацию.",
  },
  {
    question: "Работаете ли вы с регионами и другими странами?",
    answer:
      "Да, мы работаем по всей России и за рубежом. Наши специалисты выезжают на монтаж и сопровождение мероприятия в любую точку мира (где это возможно).",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <FadeIn className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Частые вопросы</h2>
          <p className="text-muted-foreground text-lg">
            Всё, что вы хотели узнать о работе с нами.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
