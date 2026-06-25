import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Radio, Timer, Route, ShieldCheck, BarChart3, Siren } from "lucide-react";
import GlassCard from "../GlassCard";

const FEATURES = [
  { icon: Radio, title: "Live Tracking", desc: "Sub-second position updates for every vehicle on the network.", color: "#3B9EFF" },
  { icon: Timer, title: "ETA Prediction", desc: "Arrival estimates that account for live traffic, not fixed timetables.", color: "#FFB020" },
  { icon: Route, title: "Route Optimization", desc: "Flag inefficient stretches and suggest better-balanced schedules.", color: "#34D399" },
  { icon: ShieldCheck, title: "Driver Monitoring", desc: "Speed, idle time, and route adherence in one driver scorecard.", color: "#3B9EFF" },
  { icon: BarChart3, title: "Passenger Analytics", desc: "Ridership trends by route, stop, and time of day.", color: "#FFB020" },
  { icon: Siren, title: "Emergency Alerts", desc: "Instant broadcast to drivers and passengers when incidents occur.", color: "#F0506E" },
];

function TiltCard({ feature }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="snap-center shrink-0 w-[280px] md:w-[300px]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <GlassCard className="p-7 h-[230px] flex flex-col hover:bg-white/[0.04] transition-colors">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
            style={{ background: `${feature.color}1A`, border: `1px solid ${feature.color}40` }}
          >
            <feature.icon size={20} style={{ color: feature.color }} />
          </div>
          <h3 className="font-display font-semibold text-lg text-ink mb-2">{feature.title}</h3>
          <p className="text-sm text-ink-dim leading-relaxed">{feature.desc}</p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function FeatureShowcase() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">CAPABILITIES</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink max-w-xl">
          Everything a small transport authority needs, none of the bloat
        </h2>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 px-6 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto">
        {FEATURES.map((f) => (
          <TiltCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  );
}
