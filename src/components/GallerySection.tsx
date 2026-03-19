import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageOne from "@/assets/imageOne.png";
import imgSecond from "@/assets/imgSecond.jpg";
import imgNine from "@/assets/imgNine.jpg";
import imgFourth from "@/assets/imgFourth.jpg";
import imgFive from "@/assets/imgFive.jpg";
import imgSix from "@/assets/imgSix.jpg";
import imgSeven from "@/assets/imgSeven.jpg";
import imgEight from "@/assets/imgEight.jpg";

const categories = ["All", "GIS Maps", "Urban Zoning", "Corridor Planning", "Road Planning", "Infrastructure", "Regional Planning"];

const placeholders = [
  { id: 1, category: "GIS Maps", label: "Urban Zoning Map", aspect: "4/3", image: imageOne },
  { id: 2, category: "Urban Zoning", label: "GIS Spatial Analysis", aspect: "3/4", image: imgSecond },
  { id: 3, category: "Road Planning", label: "Road Infrastructure Layout", aspect: "4/3", image: imgNine },
  { id: 4, category: "Corridor Planning", label: "Corridor Development Plan", aspect: "16/9", image: imgFourth },
  { id: 5, category: "Infrastructure", label: "Urban Design Visualization", aspect: "4/3", image: imgFive },
  { id: 6, category: "GIS Maps", label: "Regional Planning Map", aspect: "3/4", image: imgSix },
  { id: 7, category: "Regional Planning", label: "Land Use Analysis", aspect: "4/3", image: imgSeven },
  { id: 8, category: "Road Planning", label: "Transit Network Plan", aspect: "16/9", image: imgEight },
];

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeFilter === "All" ? placeholders : placeholders.filter((p) => p.category === activeFilter);

  return (
    <section id="gallery" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">06 / Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Visual <span className="text-gradient">Archive</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wide transition-all duration-300 border ${
                activeFilter === cat
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_12px_hsl(195_80%_55%/0.2)]"
                  : "border-muted text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(item.id)}
                className="glass-card cursor-pointer group break-inside-avoid gallery-card"
                style={{ aspectRatio: item.aspect }}
              >
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.label}</span>
                  <span className="text-xs font-mono text-muted-foreground/50 mt-1">{item.category}</span>
                </div>
                {/* Hover zoom & tilt effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex items-center justify-center p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="glass-card w-full max-w-2xl aspect-video flex items-center justify-center"
            >
              <div className="relative z-10 text-center p-8">
                <img src={placeholders.find((p) => p.id === lightbox)?.image} alt={placeholders.find((p) => p.id === lightbox)?.label} className="text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-xs font-mono text-muted-foreground/50 mt-2">Click anywhere to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
