import { motion } from "framer-motion";
import { Bus, Route, Users, Clock } from "lucide-react";
import CountUp from "../CountUp";
import GlassCard from "../GlassCard";

const STATS = [
  { icon: Bus, label: "Active Buses", value: 128, suffix: "", color: "#3B9EFF" },
  { icon: Route, label: "Routes Running", value: 24, suffix: "", color: "#34D399" },
  { icon: Users, label: "Passengers Today", value: 12500, suffix: "", color: "#FFB020" },
  { icon: Clock, label: "Avg Delay", value: 3, suffix: " min", color: "#F0506E" },
];

export default function FleetStats() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl opacity-20"
          style={{
            width: 80 + (i % 3) * 40,
            height: 80 + (i % 3) * 40,
            background: i % 2 === 0 ? "#3B9EFF" : "#FFB020",
            top: `${(i * 17) % 90}%`,
            left: `${(i * 29) % 90}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">MISSION CONTROL</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink">
            The network, right now
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full hover:bg-white/[0.04] transition-colors">
                <stat.icon size={22} style={{ color: stat.color }} className="mb-4" />
                <div className="font-display font-semibold text-3xl md:text-4xl text-ink font-mono">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-ink-dim mt-2">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -24px); }
        }
      `}</style>
    </section>
  );
}
