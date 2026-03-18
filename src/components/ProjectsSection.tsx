import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Ujjain – Dewas Corridor Plan",
    description:
      "Regional connectivity and corridor planning project focused on transportation and urban expansion. Coordinated 400+ hectares of zonal planning.",
    tags: ["Corridor Planning", "Regional", "Transportation"],
    coordinates: "22.9676° N, 76.0534° E",
    icon: "🗺️",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="glass-card px-8 py-3 md:px-10 md:py-4 group cursor-pointer"
    >
      <div className="relative z-10">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 grid-background opacity-5 rounded-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-xs text-muted-foreground">{project.coordinates}</span>
          <span className="text-3xl">{project.icon}</span>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

        {/* Animated road path */}
        <motion.div
          className="h-px w-full mb-6 overflow-hidden"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
          style={{ originX: 0 }}
        >
          <div className="h-full road-glow-line" />
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono border border-primary/20 text-primary bg-primary/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3D hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(195 80% 55% / 0.08), transparent 70%)",
          boxShadow: "0 0 40px hsl(195 80% 55% / 0.1)"
        }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="glow-node w-[600px] h-[600px] bg-secondary/10 top-1/2 -translate-y-1/2 -right-60 animate-pulse-glow" />
      <div className="absolute inset-0 grid-background opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">05 / Projects</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Case <span className="text-gradient">Studies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
