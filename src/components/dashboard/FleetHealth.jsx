import GlassCard from "../GlassCard";
import { Circle } from "lucide-react";

const LABELS = {
  online: { text: "Online", color: "#34D399" },
  delayed: { text: "Delayed", color: "#FFB020" },
  maintenance: { text: "Maintenance", color: "#8B96A8" },
};

export default function FleetHealth({ buses, selectedBusId, onSelect }) {
  return (
    <GlassCard className="p-5">
      <p className="text-xs font-mono text-ink-dim tracking-wider mb-4">FLEET HEALTH</p>
      <div className="flex flex-col gap-1 max-h-[260px] overflow-y-auto">
        {buses.map((bus) => {
          const status = LABELS[bus.status];
          return (
            <button
              key={bus.id}
              onClick={() => onSelect && onSelect(bus.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                selectedBusId === bus.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Circle size={8} fill={status.color} strokeWidth={0} />
                <span className="font-mono text-ink">{bus.id}</span>
                <span className="text-ink-dim text-xs">{bus.route.name}</span>
              </span>
              <span className="text-xs" style={{ color: status.color }}>
                {status.text}
              </span>
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
