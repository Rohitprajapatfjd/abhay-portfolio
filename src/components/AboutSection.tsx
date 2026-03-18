import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      {/* Animated blueprint background */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-secondary/10 -bottom-40 -left-20 animate-pulse-glow" />

      {/* Moving light beams */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(195 80% 55% / 0.1), transparent)" }}
        animate={{ x: [0, 200, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">01 / About</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Building the <span className="text-gradient">Future</span> of Cities
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-8 md:p-12 max-w-3xl"
        >
          <div className="relative z-10">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Urban planning professional with strong expertise in civil engineering, GIS mapping, 
              and infrastructure planning. Experienced in corridor planning, regional planning, 
              and city development strategies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Passionate about creating data-driven solutions for sustainable urban environments,
              integrating technology with spatial planning to shape cities that are resilient,
              connected, and human-centric.
            </p>

            {/* Animated stats */}
            {/* <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-muted">
              {[
                { value: "14.2", label: "km Corridors", suffix: "km" },
                { value: "400", label: "Hectares Planned", suffix: "+" },
                { value: "3", label: "Major Projects", suffix: "" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-center"
                >
                  <span className="font-display text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}{stat.suffix}
                  </span>
                  <span className="block text-xs font-mono text-muted-foreground mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
