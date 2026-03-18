import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative px-4 md:px-8 py-12 border-t border-muted overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-5 pointer-events-none" />
      <div className="glow-node w-[300px] h-[300px] bg-primary/5 bottom-0 left-1/2 -translate-x-1/2 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="font-display font-bold text-2xl tracking-tight"
          >
            <span className="text-gradient">AV</span>
          </motion.span>

          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Abhay Varma — Designing Future Cities
          </p>

          <div className="flex gap-6">
            {["About", "Projects", "Gallery", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
