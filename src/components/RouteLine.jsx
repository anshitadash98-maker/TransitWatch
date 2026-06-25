import { motion } from "framer-motion";

/**
 * RouteLine — the site's signature element. A literal transit line
 * that draws itself in, with a glowing node ("bus") traveling along
 * it on loop. Reused across hero, section dividers, and feature rail
 * so the one visual idea (a line connecting stops) carries the whole
 * site, the way a real route map would.
 */
export default function RouteLine({
  width = 600,
  height = 120,
  stops = 4,
  color = "#FFB020",
  className = "",
}) {
  const points = Array.from({ length: stops }, (_, i) => {
    const x = (width / (stops - 1)) * i;
    const y = height / 2 + Math.sin(i * 1.3) * (height * 0.18);
    return { x, y };
  });

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d={pathD}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeOpacity={0.35}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
        />
      ))}
      <motion.circle
        r={5}
        fill={color}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: `path('${pathD}')`, filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}
