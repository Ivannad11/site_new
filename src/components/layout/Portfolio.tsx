"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/animations/FadeIn";
import { useState } from "react";
import { X } from "lucide-react";

const projects = [
  {
    title: "Фармацевтика",
    category: "Интерактивное приложение",
    description: "Разработали приложение с анимированными персонажами, которое выводится на экран стенда и наглядно подсвечивает проблему ожирения. Это помогло привлечь внимание посетителей и увеличить время пребывания на стенде в 3 раза.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tags: ["Сценарий", "Дизайн", "Разработка", "WebGL", "React"],
    result: "Рост лидов на 45%"
  },
  {
    title: "Девелопмент",
    category: "Интерактивный стенд",
    description: "Создали интерактивную карту виллового посёлка на берегу Волги. Стенд возили в Дубай для демонстрации инвесторам. Карта синхронизирована с CRM и показывает актуальные статусы продаж в реальном времени.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["Выездная презентация", "Стационарное решение", "Touch Table"],
    result: "Продано 5 вилл на выставке"
  },
  {
    title: "Технополис",
    category: "ПО для визуализации",
    description: "Разработали ПО для визуализации построенных объектов, планируемых зон и стратегии развития территории. Объединили тач-панель, стенд и видеостену в единую систему на одном сервере.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["Тач-панель", "Видеостена", "Единая система", "Unity"],
    result: "Сокращение времени презентации в 2 раза"
  },
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted/20">
      <div className="container px-4 md:px-6 mx-auto">
        <FadeIn className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Наши проекты</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Кейсы, которыми мы гордимся.
          </p>
        </FadeIn>

        {/* Desktop Grid */}
        <FadeInStagger className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeInItem}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium border border-white/50 px-4 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors">
                      Подробнее
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm md:text-base line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </FadeInStagger>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex overflow-x-auto gap-4 pb-8 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {projects.map((project, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[85vw] max-w-[320px] h-full"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="overflow-hidden border-border bg-card h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.slice(0, 3).map((tag, j) => (
                      <span key={j} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              layoutId={`project-${selectedProject.title}`}
              className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative h-64 sm:h-80 shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24">
                  <div className="text-white/80 text-sm font-medium mb-1">{selectedProject.category}</div>
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                </div>
              </div>
              
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">О проекте</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  
                  {selectedProject.result && (
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Результат</h4>
                      <p className="text-primary font-medium">{selectedProject.result}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold mb-3">Технологии и задачи</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, j) => (
                        <span key={j} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
