import { motion } from "framer-motion";
import { useState } from "react";

const skills = [
  { name: "QGIS", level: 98, icon: "🗺️" },
  { name: "ArcGIS", level: 85, icon: "🌐" },
  { name: "AutoCAD", level: 92, icon: "📐" },
  { name: "Revit", level: 78, icon: "🏗️" },
];

const additionalSkills = [
  { name: "Urban Planning", level: 95, icon: "🏙️" },
  { name: "Regional Planning", level: 88, icon: "📊" },
  { name: "Zonal Planning", level: 85, icon: "📋" },
  { name: "Ward Planning", level: 82, icon: "🗂️" },
  { name: "Infrastructure Planning", level: 90, icon: "🛣️" },
  { name: "GIS Mapping", level: 88, icon: "🧭" },
]

const SkillCard = ({ name, level, icon, index }: { name: string; level: number; icon: string; index: number }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
      }}
      className="glass-card p-6 group cursor-pointer skill-card-glow"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" style={{ transform: "translateZ(20px)" }}>{icon}</span>
          <span className="font-medium text-foreground">{name}</span>
          <span className="font-mono text-xs text-primary ml-auto">{level}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "circOut", delay: 0.3 + index * 0.06 }}
            className="h-full rounded-full skill-bar-gradient"
          />
        </div>
      </div>
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, hsl(195 80% 55% / 0.1), hsl(280 60% 55% / 0.1))",
          boxShadow: "inset 0 0 30px hsl(195 80% 55% / 0.05), 0 0 20px hsl(195 80% 55% / 0.1)"
        }}
      />
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      {/* Blueprint overlay */}
      <div className="absolute inset-0 grid-background opacity-10 pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-primary/10 -top-20 -right-20 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">02 / Skills</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Technical <span className="text-gradient">Matrix</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Core <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalSkills.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
