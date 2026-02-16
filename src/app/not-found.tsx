"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center cursor-none">
      <CustomCursor />
      
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[12rem] md:text-[20rem] font-bold text-muted/30 select-none leading-none"
        >
          404
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Страница не найдена
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            Похоже, вы зашли слишком далеко. Этой страницы не существует или она была перемещена.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
