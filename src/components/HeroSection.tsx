import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Colony from "@/assets/Colony.pdf";
import Corridor from "@/assets/Corridor.pdf";

const CityScene = lazy(() => import("./CityScene"));

const HeroSection = () => {
  return (
    <section className="relative min-h-svh flex items-center px-4 md:px-8 overflow-hidden">
      {/* 3D City Scene */}
      <Suspense fallback={
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid-background opacity-40" />
          <div className="glow-node w-[500px] h-[500px] bg-primary/20 top-1/4 -left-40 animate-pulse-glow" />
        </div>
      }>
        <CityScene />
      </Suspense>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid background overlay */}
      <div className="absolute inset-0 z-[1] grid-background opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-mono text-primary tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block "
          >
            SHRIJI INFRA AND CONSULTANCY
          </motion.span>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-5">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block"
            >
              Abhay
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-gradient block"
            >
              Varma
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-5 leading-relaxed"
          >
            Civil Engineering (B tech) ,Urban Planner (T&CP) <br /> Designing sustainable cities, smarter infrastructure, and future-ready urban environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={Colony}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-primary text-center"
            >
              Explore Colony Layout →
            </a>

            <a
              href={Corridor}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button-ghost text-center"
            >
              Explore Corridor Design →
            </a>

            {/* <a href="#contact" className="glass-button-ghost text-center">
              Contact Me
            </a> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
