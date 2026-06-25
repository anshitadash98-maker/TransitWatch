// Seed data for the simulated transit network.
// Modeled on a small-city grid (Bhubaneswar-scale) so the prototype
// reads as plausible for the SIH "small cities" brief.

export const ROUTES = [
  {
    id: "R101",
    name: "Route 101",
    label: "Station ↔ Tech Park",
    color: "#3B9EFF",
    distanceKm: 14.2,
    stops: [
      { id: "S1", name: "Railway Station", lat: 20.2700, lng: 85.8400 },
      { id: "S2", name: "Master Canteen", lat: 20.2750, lng: 85.8450 },
      { id: "S3", name: "Vani Vihar", lat: 20.2900, lng: 85.8350 },
      { id: "S4", name: "Rajmahal Square", lat: 20.2950, lng: 85.8300 },
      { id: "S5", name: "Acharya Vihar", lat: 20.3050, lng: 85.8250 },
      { id: "S6", name: "Infocity", lat: 20.3150, lng: 85.8150 },
      { id: "S7", name: "Tech Park", lat: 20.3250, lng: 85.8080 },
    ],
  },
  {
    id: "R102",
    name: "Route 102",
    label: "Old Town ↔ Airport",
    color: "#34D399",
    distanceKm: 11.6,
    stops: [
      { id: "S8", name: "Old Town", lat: 20.2350, lng: 85.8350 },
      { id: "S9", name: "Lingaraj Temple", lat: 20.2400, lng: 85.8420 },
      { id: "S10", name: "Kalpana Square", lat: 20.2600, lng: 85.8430 },
      { id: "S11", name: "Jaydev Vihar", lat: 20.2980, lng: 85.8170 },
      { id: "S12", name: "Airport Road", lat: 20.2500, lng: 85.8170 },
      { id: "S13", name: "Biju Patnaik Airport", lat: 20.2470, lng: 85.8170 },
    ],
  },
  {
    id: "R103",
    name: "Route 103",
    label: "Bus Stand ↔ Industrial Estate",
    color: "#FFB020",
    distanceKm: 9.8,
    stops: [
      { id: "S14", name: "Baramunda Bus Stand", lat: 20.2950, lng: 85.7950 },
      { id: "S15", name: "Patia Square", lat: 20.3500, lng: 85.8200 },
      { id: "S16", name: "Nandankanan Road", lat: 20.3700, lng: 85.8250 },
      { id: "S17", name: "Industrial Estate", lat: 20.3850, lng: 85.8300 },
    ],
  },
  {
    id: "R104",
    name: "Route 104",
    label: "Khandagiri ↔ City Center",
    color: "#F0506E",
    distanceKm: 8.1,
    stops: [
      { id: "S18", name: "Khandagiri Caves", lat: 20.2620, lng: 85.7780 },
      { id: "S19", name: "Khandagiri Square", lat: 20.2680, lng: 85.7950 },
      { id: "S20", name: "Jagamara", lat: 20.2780, lng: 85.8050 },
      { id: "S21", name: "Vani Vihar", lat: 20.2900, lng: 85.8350 },
      { id: "S22", name: "City Center Mall", lat: 20.2890, lng: 85.8400 },
    ],
  },
];

const STATUS = ["online", "delayed", "maintenance"];

// Each bus is anchored to a route and given a starting offset (0-1)
// along that route's path, plus a direction and speed.
export const FLEET = [
  { id: "B101", routeId: "R101", offset: 0.05, speed: 0.012, status: "online" },
  { id: "B102", routeId: "R101", offset: 0.45, speed: 0.011, status: "delayed" },
  { id: "B103", routeId: "R101", offset: 0.78, speed: 0.013, status: "online" },
  { id: "B201", routeId: "R102", offset: 0.15, speed: 0.014, status: "online" },
  { id: "B202", routeId: "R102", offset: 0.6, speed: 0.012, status: "online" },
  { id: "B203", routeId: "R102", offset: 0.9, speed: 0.0, status: "maintenance" },
  { id: "B301", routeId: "R103", offset: 0.2, speed: 0.016, status: "online" },
  { id: "B302", routeId: "R103", offset: 0.7, speed: 0.015, status: "delayed" },
  { id: "B401", routeId: "R104", offset: 0.1, speed: 0.013, status: "online" },
  { id: "B402", routeId: "R104", offset: 0.55, speed: 0.012, status: "online" },
  { id: "B403", routeId: "R104", offset: 0.85, speed: 0.014, status: "online" },
  { id: "B104", routeId: "R101", offset: 0.3, speed: 0.0, status: "maintenance" },
];

export const ALERTS_SEED = [
  { id: "A1", severity: "high", route: "R104", text: "Minor collision reported near Jagamara — Route 104 diverted.", time: "2 min ago" },
  { id: "A2", severity: "medium", route: "R101", text: "Heavy traffic on Acharya Vihar stretch — expect delays up to 6 min.", time: "8 min ago" },
  { id: "A3", severity: "low", route: "R103", text: "Bus B203 taken offline for scheduled maintenance.", time: "21 min ago" },
];

export function statusColor(status) {
  if (status === "online") return "#34D399";
  if (status === "delayed") return "#FFB020";
  return "#8B96A8";
}

export { STATUS };
