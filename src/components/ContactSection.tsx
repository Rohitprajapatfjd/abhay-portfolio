import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      "service_0u25uia",
      "template_x41lp0c",
      form,
      "QqnmlRIa8-RtGnEbw"
    )
    .then(() => {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    })
    .catch(() => {
      alert("Failed to send message");
    });
  };


  return (
    <section id="contact" className="section-spacing relative">
      <div className="glow-node w-[500px] h-[500px] bg-primary/10 top-0 left-1/2 -translate-x-1/2 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-primary tracking-widest uppercase text-xs mb-4 block">07 / Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Get in <span className="text-gradient">Touch</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10"
          >
            <div className="relative z-10 space-y-6">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    required
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-muted/30 border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder={`Your ${field}`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-muted/30 border border-muted rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Your message"
                />
              </div>
              <button type="submit" className="glass-button-primary w-full text-center">
                Send Message
              </button>
            </div>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {[
              { label: "Email", value: "abhayvarma0316@gmail.com", icon: "✉" },
              { label: "LinkedIn", value: "linkedin.com/in/abhayvarma", icon: "↗" },
              { label: "Phone", value: "+91 8966972941", icon: "✆" },
              { label: "Location", value: " dewas road, Ujjain,India", icon: "◎" },
            ].map((info) => (
              <div key={info.label} className="glass-card p-6">
                <div className="relative z-10 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm">
                    {info.icon}
                  </span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block">{info.label}</span>
                    <span className="text-foreground">{info.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
