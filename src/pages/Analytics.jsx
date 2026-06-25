import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import GlassCard from "../components/GlassCard";

const PASSENGER_TREND = [
  { day: "Mon", riders: 9800 }, { day: "Tue", riders: 10200 }, { day: "Wed", riders: 11100 },
  { day: "Thu", riders: 10800 }, { day: "Fri", riders: 13200 }, { day: "Sat", riders: 8600 },
  { day: "Sun", riders: 6400 },
];

const UTILIZATION = [
  { route: "R101", utilization: 78 }, { route: "R102", utilization: 64 },
  { route: "R103", utilization: 52 }, { route: "R104", utilization: 71 },
];

const PEAK_HOURS = [
  { hour: "6am", riders: 420 }, { hour: "8am", riders: 1850 }, { hour: "10am", riders: 920 },
  { hour: "12pm", riders: 1100 }, { hour: "2pm", riders: 880 }, { hour: "4pm", riders: 1020 },
  { hour: "6pm", riders: 1960 }, { hour: "8pm", riders: 740 }, { hour: "10pm", riders: 310 },
];

const DELAY_BREAKDOWN = [
  { name: "On time", value: 68, color: "#34D399" },
  { name: "Minor delay", value: 22, color: "#FFB020" },
  { name: "Major delay", value: 10, color: "#F0506E" },
];

const tooltipStyle = {
  background: "#161D29",
  border: "1px solid #232B38",
  borderRadius: 10,
  fontSize: 12,
  color: "#E8ECF2",
};

export default function Analytics() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-mono text-amber tracking-[0.2em] mb-3">INSIGHTS</p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink">Analytics</h1>
        <p className="text-sm text-ink-dim mt-2">Network performance over the last 7 days.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <p className="text-xs font-mono text-ink-dim tracking-wider mb-5">PASSENGER TRENDS</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={PASSENGER_TREND}>
              <defs>
                <linearGradient id="riders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B9EFF" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B9EFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#232B38" vertical={false} />
              <XAxis dataKey="day" stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="riders" stroke="#3B9EFF" strokeWidth={2} fill="url(#riders)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-xs font-mono text-ink-dim tracking-wider mb-5">BUS UTILIZATION BY ROUTE</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={UTILIZATION}>
              <CartesianGrid stroke="#232B38" vertical={false} />
              <XAxis dataKey="route" stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="utilization" fill="#FFB020" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-xs font-mono text-ink-dim tracking-wider mb-5">PEAK HOURS</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={PEAK_HOURS}>
              <CartesianGrid stroke="#232B38" vertical={false} />
              <XAxis dataKey="hour" stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B96A8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="riders" stroke="#34D399" strokeWidth={2} dot={{ fill: "#34D399", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-xs font-mono text-ink-dim tracking-wider mb-5">DELAY ANALYSIS</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={DELAY_BREAKDOWN}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
              >
                {DELAY_BREAKDOWN.map((d) => (
                  <Cell key={d.name} fill={d.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                formatter={(v) => <span style={{ color: "#8B96A8", fontSize: 12 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
