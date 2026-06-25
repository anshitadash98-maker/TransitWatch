import { motion } from "framer-motion";
import { Bus, Users, Gauge, AlertTriangle } from "lucide-react";
import CountUp from "../CountUp";
import GlassCard from "../GlassCard";

export default function DashboardStats({ buses }) {
  const online = buses.filter((b) => b.status === "online").length;
  const delayed = buses.filter((b) => b.status === "delayed").length;

  const cards = [
    { icon: Bus, label: "Active Buses", value: online, color: "#3B9EFF" },
    { icon: Users, label: "Passengers Today", value: 12500, color: "#FFB020" },
    { icon: Gauge, label: "Average Speed", value: 28, suffix: " km/h", color: "#34D399" },
    { icon: AlertTriangle, label: "Delays", value: delayed, color: "#F0506E" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <c.icon size={18} style={{ color: c.color }} />
            </div>
            <div className="font-display font-semibold text-2xl text-ink font-mono">
              <CountUp value={c.value} suffix={c.suffix || ""} />
            </div>
            <p className="text-xs text-ink-dim mt-1">{c.label}</p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
