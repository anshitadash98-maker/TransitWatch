import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import RouteLine from "../RouteLine";
import LiveMap from "../LiveMap";
import useLiveFleet from "../../hooks/useLiveFleet";

export default function Hero() {
  const buses = useLiveFleet();

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-20">
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-[0.22]"
        >
          <source src="/hero-traffic.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/80 to-night" />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-transparent to-night/60" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
            <span className="text-xs font-mono text-ink-dim tracking-wide">
              12 BUSES LIVE · BHUBANESWAR NETWORK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-semibold text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05] tracking-tight text-ink"
          >
            Track Every Bus.
            <br />
            <span className="text-amber">Connect Every Citizen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-ink-dim max-w-md leading-relaxed"
          >
            Real-time public transport monitoring built for small and
            mid-sized cities — live positions, honest ETAs, and a fleet
            view your transport department can actually run on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-amber text-night font-semibold px-6 py-3.5 rounded-full hover:bg-amber/90 transition-colors group"
            >
              Live Dashboard
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/routes"
              className="inline-flex items-center gap-2 glass text-ink font-medium px-6 py-3.5 rounded-full hover:bg-white/5 transition-colors"
            >
              <MapPin size={16} />
              Explore Routes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <RouteLine width={460} height={70} stops={5} color="#FFB020" className="w-full max-w-[460px] h-[70px] opacity-80" />
          </motion.div>
        </div>

        {/* Right: mini live map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          <div className="glass-strong rounded-3xl p-3 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="text-xs font-mono text-ink-dim tracking-wider">LIVE NETWORK VIEW</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-safe">
                <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
                LIVE
              </span>
            </div>
            <LiveMap
              buses={buses}
              height="420px"
              interactive={false}
              scrollWheelZoom={false}
              showStops={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
