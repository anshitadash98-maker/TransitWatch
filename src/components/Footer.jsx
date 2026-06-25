import { Bus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber/10 border border-amber/30">
              <Bus size={16} className="text-amber" />
            </span>
            <span className="font-display font-semibold text-ink">TransitWatch</span>
          </div>
          <p className="text-sm text-ink-dim max-w-xs">
            Real-time public transport tracking for small cities. Built for SIH 2026 — PS25013.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="text-xs font-mono text-ink-dim tracking-wider mb-3">PRODUCT</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/dashboard" className="text-ink-dim hover:text-ink transition-colors">Dashboard</Link>
              <Link to="/routes" className="text-ink-dim hover:text-ink transition-colors">Routes</Link>
              <Link to="/analytics" className="text-ink-dim hover:text-ink transition-colors">Analytics</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-dim tracking-wider mb-3">ABOUT</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-ink-dim hover:text-ink transition-colors">Our Approach</Link>
              <a href="#" className="text-ink-dim hover:text-ink transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-line text-xs text-ink-dim/70">
        © 2026 TransitWatch. Prototype built for Smart India Hackathon.
      </div>
    </footer>
  );
}
