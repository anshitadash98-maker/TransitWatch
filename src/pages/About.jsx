import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, Cpu, TrendingUp } from "lucide-react";
import GlassCard from "../components/GlassCard";

const TIMELINE = [
  {
    icon: AlertCircle,
    label: "Problem",
    title: "Small cities run transit blind",
    desc: "No live tracking, no reliable ETAs — commuters wait on guesswork and transport authorities can't see their own fleet.",
    color: "#F0506E",
  },
  {
    icon: Lightbulb,
    label: "Solution",
    title: "One live view, three audiences",
    desc: "A passenger map with honest ETAs, a driver app sending GPS, and an admin dashboard managing the whole network.",
    color: "#FFB020",
  },
  {
    icon: Cpu,
    label: "Technology",
    title: "Built to scale down, not just up",
    desc: "Lightweight enough for a city transport office to actually run — no expensive hardware, works over basic mobile data.",
    color: "#3B9EFF",
  },
  {
    icon: TrendingUp,
    label: "Impact",
    title: "Trust brings riders back",
    desc: "Predictable transit increases ridership, cuts idle fuel waste, and gives planners real usage data for the first time.",
    color: "#34D399",
  },
];

const STACK = {
  Frontend: ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Leaflet"],
  UI: ["Lucide Icons", "Custom glassmorphism system"],
  Charts: ["Recharts"],
};

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">SIH 2026 · PS25013</p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mb-4">
          Real-Time Public Transport Tracking for Small Cities
        </h1>
        <p className="text-ink-dim max-w-2xl leading-relaxed">
          Submitted by the Government of Punjab under Transportation &amp; Logistics.
          TransitWatch is a working prototype of the proposed system — built to show
          the full passenger-to-admin loop, not just a mockup of it.
        </p>
      </div>

      <div className="relative mb-20">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line hidden md:block" />
        <div className="flex flex-col gap-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 relative"
            >
              <span
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10"
                style={{ background: `${item.color}1A`, border: `1px solid ${item.color}40` }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </span>
              <div className="pt-1">
                <p className="text-xs font-mono tracking-wider mb-1.5" style={{ color: item.color }}>
                  {item.label.toUpperCase()}
                </p>
                <h3 className="font-display font-semibold text-xl text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed max-w-xl">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GlassCard className="p-8" strong>
        <p className="text-xs font-mono text-ink-dim tracking-wider mb-6">TECH STACK</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {Object.entries(STACK).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-ink text-sm mb-3">{category}</h4>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <span key={item} className="text-sm text-ink-dim font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
