import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardStats from "../components/dashboard/DashboardStats";
import FleetHealth from "../components/dashboard/FleetHealth";
import { ETAPanel, AlertsPanel } from "../components/dashboard/SidePanels";
import LiveMap from "../components/LiveMap";
import useLiveFleet from "../hooks/useLiveFleet";

export default function Dashboard() {
  const buses = useLiveFleet();
  const [selectedBusId, setSelectedBusId] = useState(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 px-5 md:px-8 pt-24 pb-10 max-w-[1600px] mx-auto w-full">
        <div className="mb-6">
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-ink">Dashboard</h1>
          <p className="text-sm text-ink-dim mt-1">Live overview of the transit network — updates every frame.</p>
        </div>

        <div className="mb-6">
          <DashboardStats buses={buses} />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-5">
          <div className="glass-strong rounded-2xl p-3">
            <LiveMap
              buses={buses}
              height="600px"
              selectedBusId={selectedBusId}
              onSelectBus={setSelectedBusId}
            />
          </div>

          <div className="flex flex-col gap-5">
            <FleetHealth buses={buses} selectedBusId={selectedBusId} onSelect={setSelectedBusId} />
            <ETAPanel buses={buses} />
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
