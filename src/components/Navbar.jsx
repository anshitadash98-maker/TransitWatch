import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bus, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/routes", label: "Routes" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber/10 border border-amber/30">
            <Bus size={18} className="text-amber" strokeWidth={2.25} />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            Transit<span className="text-amber">Watch</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-amber" : "text-ink-dim hover:text-ink"
                }`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/dashboard"
          className="hidden md:inline-flex items-center gap-2 bg-amber text-night font-semibold text-sm px-4 py-2 rounded-full hover:bg-amber/90 transition-colors"
        >
          Live Dashboard
        </Link>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-strong px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-amber" : "text-ink-dim"}`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
