import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "../GlassCard";

gsap.registerPlugin(ScrollTrigger);

const PAIN_POINTS = [
  { value: 40, label: "of passengers miss their bus due to unpredictable arrival times", color: "#F0506E" },
  { value: 25, label: "of routes run inefficiently with overlapping or underused stops", color: "#FFB020" },
  { value: 15, label: "of fuel is wasted idling and re-routing around avoidable delays", color: "#3B9EFF" },
];

export default function WhySmallCities() {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const bars = barsRef.current;
    bars.forEach((bar, i) => {
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: `${PAIN_POINTS[i].value}%`,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">THE GAP</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink mb-10 max-w-md">
            Why small cities need this most
          </h2>

          <div className="flex flex-col gap-7">
            {PAIN_POINTS.map((p, i) => (
              <div key={p.label}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display font-semibold text-2xl text-ink font-mono">{p.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2 overflow-hidden mb-2">
                  <div
                    ref={(el) => (barsRef.current[i] = el)}
                    className="h-full rounded-full"
                    style={{ background: p.color, width: 0 }}
                  />
                </div>
                <p className="text-sm text-ink-dim leading-relaxed">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="p-8" strong>
          <p className="text-xs font-mono text-ink-dim tracking-wider mb-6">METRO vs SMALL CITY COVERAGE</p>
          <div className="space-y-5">
            {[
              { label: "Metro cities", value: 88, color: "#34D399" },
              { label: "Tier-2 cities", value: 34, color: "#FFB020" },
              { label: "Small cities", value: 9, color: "#F0506E" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-ink-dim">{row.label}</span>
                  <span className="font-mono text-ink">{row.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${row.value}%`, background: row.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-dim mt-7 leading-relaxed border-t border-line pt-5">
            Real-time transit tracking adoption today — most digital transport
            investment goes to metros, leaving small cities to run on paper
            timetables and word of mouth.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
