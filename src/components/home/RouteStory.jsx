import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveMap from "../LiveMap";
import useLiveFleet from "../../hooks/useLiveFleet";

const STEPS = [
  { n: "01", title: "Bus leaves the depot", desc: "GPS comes online and the vehicle is registered against its assigned route." },
  { n: "02", title: "Reaches a stop", desc: "Position is matched to the nearest stop on the route's geometry." },
  { n: "03", title: "ETA updates live", desc: "Arrival times recalculate continuously based on current speed and traffic." },
  { n: "04", title: "Passenger boards", desc: "Commuters track the exact vehicle from the stop, no more guessing." },
];

export default function RouteStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const buses = useLiveFleet();
  const activeIndex = useTransform(scrollYProgress, [0.15, 0.85], [0, STEPS.length - 1]);

  return (
    <section ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">HOW IT WORKS</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink max-w-xl">
            From depot to doorstep, watched the whole way
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="glass-strong rounded-3xl p-3 lg:sticky lg:top-28">
            <LiveMap buses={buses} height="440px" />
          </div>

          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-5 glass rounded-2xl p-6"
              >
                <span className="font-mono text-2xl font-semibold text-amber/70 shrink-0">{step.n}</span>
                <div>
                  <h3 className="font-display font-semibold text-ink text-lg mb-1.5">{step.title}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
