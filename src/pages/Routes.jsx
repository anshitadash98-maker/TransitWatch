import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Gauge, ChevronRight, X } from "lucide-react";
import GlassCard from "../components/GlassCard";
import LiveMap from "../components/LiveMap";
import useLiveFleet from "../hooks/useLiveFleet";
import { ROUTES } from "../data/network";

export default function Routes() {
  const [query, setQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const buses = useLiveFleet();

  const filtered = ROUTES.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.label.toLowerCase().includes(query.toLowerCase())
  );

  const routeBuses = selectedRoute ? buses.filter((b) => b.routeId === selectedRoute.id) : buses;

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">NETWORK</p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mb-6">Route Explorer</h1>

        <div className="relative max-w-md">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search route name or destination"
            className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-dim outline-none focus:border-amber/40 transition-colors"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        <div className="flex flex-col gap-4">
          {filtered.map((route, i) => (
            <motion.button
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              onClick={() => setSelectedRoute(route)}
              className="text-left"
            >
              <GlassCard
                className={`p-5 transition-colors ${
                  selectedRoute?.id === route.id ? "bg-white/[0.06] border-amber/30" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: route.color }}
                    />
                    <div>
                      <h3 className="font-display font-semibold text-ink">{route.name}</h3>
                      <p className="text-xs text-ink-dim mt-0.5">{route.label}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-ink-dim" />
                </div>
                <div className="flex items-center gap-5 mt-4 text-xs text-ink-dim font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} /> {route.stops.length} stops
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Gauge size={13} /> {route.distanceKm} km
                  </span>
                </div>
              </GlassCard>
            </motion.button>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-3 relative">
          {selectedRoute && (
            <div className="absolute top-6 right-6 z-[500] glass-strong rounded-xl p-4 max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-semibold text-ink">{selectedRoute.name}</h3>
                <button onClick={() => setSelectedRoute(null)} className="text-ink-dim hover:text-ink">
                  <X size={15} />
                </button>
              </div>
              <p className="text-xs text-ink-dim mb-3">{selectedRoute.label}</p>
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {selectedRoute.stops.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2 text-xs text-ink-dim">
                    <span className="font-mono w-4">{i + 1}</span>
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          <LiveMap
            buses={routeBuses}
            onlyRouteIds={selectedRoute ? [selectedRoute.id] : null}
            height="640px"
            center={
              selectedRoute
                ? [selectedRoute.stops[0].lat, selectedRoute.stops[0].lng]
                : [20.295, 85.82]
            }
            zoom={selectedRoute ? 13 : 12.3}
          />
        </div>
      </div>
    </div>
  );
}
