"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  mobileMode?: boolean;
}

export function Navbar({ onNavigate, mobileMode = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMobileNav = (sectionId: string) => {
    if (mobileMode && onNavigate) {
      onNavigate(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight"
          onClick={(e) => {
            if (mobileMode) {
              e.preventDefault();
              handleMobileNav("hero");
            }
          }}
        >
          ШТАБ
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Услуги
          </Link>
          <Link href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
            Портфолио
          </Link>
          <Link href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
            Процесс
          </Link>
          <Link href="#contacts" className="text-muted-foreground hover:text-foreground transition-colors">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" className="hidden md:flex">
            Обсудить проект
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-40"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6 items-center justify-center h-full pb-32">
              <button 
                onClick={() => handleMobileNav("services")}
                className="text-3xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Услуги
              </button>
              <button 
                onClick={() => handleMobileNav("portfolio")}
                className="text-3xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Портфолио
              </button>
              <button 
                onClick={() => handleMobileNav("process")}
                className="text-3xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Процесс
              </button>
              <button 
                onClick={() => handleMobileNav("contacts")}
                className="text-3xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Контакты
              </button>
              <Button className="w-full max-w-xs mt-8" size="lg" onClick={() => handleMobileNav("contacts")}>
                Обсудить проект
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
