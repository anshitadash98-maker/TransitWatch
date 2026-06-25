import { useEffect, useRef, useState } from "react";
import { ROUTES, FLEET } from "../data/network";
import { buildRouteGeometry, pointAtFraction, etaMinutes } from "../data/geometry";

// Precompute geometry per route once.
const GEOMETRY = Object.fromEntries(
  ROUTES.map((r) => [r.id, buildRouteGeometry(r.stops)])
);

function initialBuses() {
  return FLEET.map((b) => ({ ...b }));
}

/**
 * useLiveFleet simulates a real-time GPS feed.
 *
 * In production this hook's setInterval body would instead be a
 * Socket.IO `on("position-update")` handler receiving the same
 * shaped payload from a Flask-SocketIO backend — the rest of the
 * app (map, popups, ETA panel) would not need to change.
 */
export default function useLiveFleet() {
  const [buses, setBuses] = useState(initialBuses);
  const frameRef = useRef();

  useEffect(() => {
    let last = performance.now();

    function tick(now) {
      const dt = (now - last) / 1000;
      last = now;

      setBuses((prev) =>
        prev.map((b) => {
          if (b.status === "maintenance") return b;
          let next = b.offset + b.speed * dt * (b.status === "delayed" ? 0.5 : 1);
          if (next >= 1) next = 0; // loop back to depot
          return { ...b, offset: next };
        })
      );

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const enriched = buses.map((b) => {
    const route = ROUTES.find((r) => r.id === b.routeId);
    const geometry = GEOMETRY[b.routeId];
    const pos = pointAtFraction(geometry, b.offset);
    const eta = etaMinutes(geometry, b.offset);
    const currentStop = route.stops[pos.segmentIndex];
    const nextStop = route.stops[pos.segmentIndex + 1] || route.stops[pos.segmentIndex];
    return {
      ...b,
      route,
      lat: pos.lat,
      lng: pos.lng,
      currentStop,
      nextStop,
      etaMin: eta,
    };
  });

  return enriched;
}
