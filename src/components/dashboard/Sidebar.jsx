import { NavLink } from "react-router-dom";
import { LayoutDashboard, Radio, Route, BarChart3, Settings, Bus } from "lucide-react";

const ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/live", label: "Live Tracking", icon: Radio },
  { to: "/routes", label: "Routes", icon: Route },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-line bg-surface/40 min-h-screen pt-24 px-4 pb-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber/10 border border-amber/30">
          <Bus size={16} className="text-amber" />
        </span>
        <span className="font-display font-semibold text-ink text-sm">TransitWatch</span>
      </div>

      <nav className="flex flex-col gap-1">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber/10 text-amber border border-amber/20"
                  : "text-ink-dim hover:text-ink hover:bg-white/5"
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto glass rounded-xl p-4">
        <p className="text-xs font-mono text-ink-dim tracking-wide mb-1">SYSTEM STATUS</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
          <span className="text-sm text-ink">All systems operational</span>
        </div>
      </div>
    </aside>
  );
}
