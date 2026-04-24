"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const PIN_COLOR = "#96692a";
const PIN_ACTIVE = "#7a5522";

function createIcon(active: boolean) {
  const size = active ? 18 : 14;
  const border = active ? 3 : 2;
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${active ? PIN_ACTIVE : PIN_COLOR};border:${border}px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    className: "",
  });
}

export default function LocationMap({
  locations,
  activeId,
  onMarkerClick,
}: {
  locations: MapLocation[];
  activeId: string | null;
  onMarkerClick: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
      [59.33, 18.07],
      10,
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync markers & selection
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    // Add markers for every location
    locations.forEach((loc) => {
      const isActive = loc.id === activeId;
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createIcon(isActive),
      })
        .addTo(map)
        .bindPopup(`<strong>${loc.name}</strong><br/>${loc.address}`);

      marker.on("click", () => onMarkerClick(loc.id));
      markersRef.current.set(loc.id, marker);
    });

    // Zoom to active or fit all
    if (activeId) {
      const loc = locations.find((l) => l.id === activeId);
      if (loc) {
        map.setView([loc.lat, loc.lng], 14, { animate: true });
        markersRef.current.get(activeId)?.openPopup();
      }
    } else if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [locations, activeId, onMarkerClick]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl"
      style={{ minHeight: 400 }}
    />
  );
}
