import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    period: "Undergraduate",
    title: "B.Tech – Civil Engineering",
    description: "Strong foundation in structural engineering, materials science, and infrastructure design principles.",
  },
  {
    period: "Postgraduate",
    title: "Master's – Urban Planning",
    description: "Advanced studies in urban systems, spatial analysis, and sustainable city development.",
    specializations: ["Regional Planning", "Zonal Planning", "Ward Planning", "Urban Development Planning"],
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);

  return (
    <section id="education" ref={sectionRef} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">03 / Education</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Academic <span className="text-gradient">Path</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-muted/20" />
          <motion.div
            className="absolute left-4 md:left-8 top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, hsl(195 80% 55%), hsl(280 60% 55%))",
              boxShadow: "0 0 8px hsl(195 80% 55% / 0.5)",
            }}
          />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Glowing timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                  className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 12px hsl(195 80% 55% / 0.6), 0 0 24px hsl(195 80% 55% / 0.3)" }}
                />

                <div className="glass-card p-6 md:p-8">
                  <div className="relative z-10">
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">{item.period}</span>
                    <h3 className="font-display text-xl md:text-2xl font-bold mt-2 mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.specializations && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.specializations.map((spec, si) => (
                          <motion.span
                            key={spec}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + si * 0.1 }}
                            className="px-3 py-1 rounded-full text-xs font-mono border border-primary/20 text-primary bg-primary/5"
                          >
                            {spec}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Internship */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">04 / Experience</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Professional <span className="text-gradient">Training</span>
          </h2>

          <div className="glass-card p-6 md:p-10 max-w-3xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-primary/20 text-primary bg-primary/5">
                  3 Months
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-secondary/20 text-secondary bg-secondary/5">
                  Government
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                Town & Country Planning Department
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Worked on GIS-based land use analysis, urban zoning strategies, and regional 
                infrastructure planning using modern geospatial tools.
              </p>

              {/* Animated icons */}
              <div className="flex gap-6 pt-4 border-t border-muted">
                {[
                  { icon: "📍", label: "Map Markers" },
                  { icon: "🗺️", label: "GIS Layers" },
                  { icon: "🛣️", label: "Road Networks" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 md:p-10 max-w-3xl mt-5 md:float-right">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-primary/20 text-primary bg-primary/5">
                  3 Months
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-secondary/20 text-secondary bg-secondary/5">
                  Government
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                2028 Simhastha Road Planning – Ujjain
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Urban infrastructure and road planning project for the Simhastha development. Optimized 14.2km of corridor connectivity with integrated transit planning.
              </p>

              {/* Animated icons */}
              <div className="flex gap-6 pt-4 border-t border-muted">
                {[
                  { icon: "📍", label: "Road Planning" },
                  { icon: "🗺️", label: "GIS Layers" },
                  { icon: "🛣️", label: "Infrastructure" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
