import GlassCard from "../GlassCard";
import { AlertTriangle, Clock3 } from "lucide-react";
import { ALERTS_SEED } from "../../data/network";

export function ETAPanel({ buses }) {
  const upcoming = [...buses]
    .filter((b) => b.status !== "maintenance")
    .sort((a, b) => a.etaMin - b.etaMin)
    .slice(0, 5);

  return (
    <GlassCard className="p-5">
      <p className="text-xs font-mono text-ink-dim tracking-wider mb-4">NEXT ARRIVALS</p>
      <div className="flex flex-col gap-3">
        {upcoming.map((bus) => (
          <div key={bus.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-ink-dim">
              <Clock3 size={14} />
              {bus.nextStop.name}
            </span>
            <span className="font-mono text-amber">{bus.etaMin} min</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

const SEVERITY_COLOR = { high: "#F0506E", medium: "#FFB020", low: "#8B96A8" };

export function AlertsPanel() {
  return (
    <GlassCard className="p-5">
      <p className="text-xs font-mono text-ink-dim tracking-wider mb-4">ALERTS</p>
      <div className="flex flex-col gap-3">
        {ALERTS_SEED.map((a) => (
          <div key={a.id} className="flex gap-3 text-sm">
            <AlertTriangle size={15} style={{ color: SEVERITY_COLOR[a.severity] }} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-ink leading-snug">{a.text}</p>
              <p className="text-xs text-ink-dim mt-1">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
