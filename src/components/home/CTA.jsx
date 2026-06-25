import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A0E14" stopOpacity="0" />
              <stop offset="100%" stopColor="#0A0E14" stopOpacity="1" />
            </linearGradient>
          </defs>
          {[...Array(14)].map((_, i) => {
            const x = i * 90;
            const h = 60 + ((i * 37) % 140);
            return (
              <rect
                key={i}
                x={x}
                y={300 - h}
                width={50}
                height={h}
                fill="#161D29"
                opacity="0.8"
              />
            );
          })}
          <rect x="0" y="0" width="1200" height="300" fill="url(#skyFade)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink leading-tight mb-6">
          Ready to modernize public transport?
        </h2>
        <p className="text-ink-dim text-lg mb-10 max-w-xl mx-auto">
          Built for transport departments in small and mid-sized cities —
          deployable on the fleet you already operate.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-amber text-night font-semibold px-7 py-3.5 rounded-full hover:bg-amber/90 transition-colors group"
          >
            Launch Dashboard
            <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 glass text-ink font-medium px-7 py-3.5 rounded-full hover:bg-white/5 transition-colors"
          >
            <Mail size={16} />
            Contact Municipality
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
