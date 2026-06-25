// Lightweight polyline interpolation: treats a route's stops as
// vertices of a path and walks a bus along that path by arc-length
// fraction (0 = first stop, 1 = last stop).

function haversine(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function buildRouteGeometry(stops) {
  const segLengths = [];
  let total = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    const d = haversine(stops[i], stops[i + 1]);
    segLengths.push(d);
    total += d;
  }
  return { stops, segLengths, total };
}

// fraction in [0,1] -> { lat, lng, segmentIndex, segmentT }
export function pointAtFraction(geometry, fraction) {
  const { stops, segLengths, total } = geometry;
  if (total === 0 || stops.length < 2) {
    return { lat: stops[0].lat, lng: stops[0].lng, segmentIndex: 0, segmentT: 0 };
  }
  let target = fraction * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (target <= segLengths[i] || i === segLengths.length - 1) {
      const t = segLengths[i] === 0 ? 0 : Math.min(1, target / segLengths[i]);
      const a = stops[i];
      const b = stops[i + 1];
      return {
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        segmentIndex: i,
        segmentT: t,
      };
    }
    target -= segLengths[i];
  }
  const last = stops[stops.length - 1];
  return { lat: last.lat, lng: last.lng, segmentIndex: segLengths.length - 1, segmentT: 1 };
}

export function etaMinutes(geometry, fraction, avgSpeedKmh = 22) {
  const remainingFraction = 1 - fraction;
  const remainingKm = remainingFraction * geometry.total;
  return Math.max(1, Math.round((remainingKm / avgSpeedKmh) * 60));
}
