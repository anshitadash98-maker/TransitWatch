import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ROUTES } from "../data/network";

// Divicon for a bus: small rotated rounded square with route color ring.
function busIcon(color, status) {
  const pulse = status === "online" ? `<span class="lm-pulse" style="background:${color}"></span>` : "";
  return L.divIcon({
    className: "lm-bus-icon",
    html: `
      <div style="position:relative; width:22px; height:22px;">
        ${pulse}
        <div style="
          width:22px;height:22px;border-radius:8px;
          background:${color};
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 0 0 2px rgba(10,14,20,0.9), 0 0 12px ${color}80;
          position:relative; z-index:2;
        ">
          <div style="width:8px;height:8px;background:#0A0E14;border-radius:2px;"></div>
        </div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function stopIcon() {
  return L.divIcon({
    className: "lm-stop-icon",
    html: `<div style="width:7px;height:7px;border-radius:50%;background:#8B96A8;border:1.5px solid #0A0E14;"></div>`,
    iconSize: [7, 7],
    iconAnchor: [3.5, 3.5],
  });
}

export default function LiveMap({
  buses = [],
  center = [20.295, 85.82],
  zoom = 12.5,
  height = "100%",
  showStops = true,
  onSelectBus,
  selectedBusId,
  interactive = true,
  scrollWheelZoom = true,
  onlyRouteIds = null,
}) {
  const visibleRoutes = onlyRouteIds ? ROUTES.filter((r) => onlyRouteIds.includes(r.id)) : ROUTES;

  return (
    <div style={{ height, width: "100%" }} className="rounded-2xl overflow-hidden relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={interactive}
        scrollWheelZoom={scrollWheelZoom}
        dragging={interactive}
        doubleClickZoom={interactive}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {visibleRoutes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.stops.map((s) => [s.lat, s.lng])}
            pathOptions={{ color: route.color, weight: 3, opacity: 0.45 }}
          />
        ))}

        {showStops &&
          visibleRoutes.flatMap((route) =>
            route.stops.map((stop) => (
              <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={stopIcon()}>
                <Tooltip direction="top" offset={[0, -4]}>
                  {stop.name}
                </Tooltip>
              </Marker>
            ))
          )}

        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.lat, bus.lng]}
            icon={busIcon(bus.route.color, bus.status)}
            eventHandlers={{
              click: () => onSelectBus && onSelectBus(bus.id),
            }}
          >
            <Popup>
              <div className="font-mono text-xs">
                <div className="font-display font-semibold text-sm mb-1">{bus.id}</div>
                <div className="text-ink-dim">Route: {bus.route.label}</div>
                <div className="text-ink-dim">Current: {bus.currentStop.name}</div>
                <div className="text-ink-dim">Next: {bus.nextStop.name}</div>
                <div className="text-amber mt-1">ETA: {bus.etaMin} min</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
