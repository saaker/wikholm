import { kvGet, kvSet } from "./store";

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  type: "onsite" | "partner";
  alignerBrands: ("invisalign" | "clearcorrect")[];
  order: number;
  website?: string;
  hidden?: boolean;
}

export async function getLocations(): Promise<Location[]> {
  const raw = await kvGet<Location[]>("locations", []);
  const locations = raw.map((loc, idx) => ({
    ...loc,
    type: loc.type || "onsite",
    alignerBrands: loc.alignerBrands || [],
    order: loc.order ?? idx,
    website: loc.website || "",
  }));

  // Sort by type first (onsite before partner), then by order
  return locations.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "onsite" ? -1 : 1;
    }
    return a.order - b.order;
  });
}

export async function saveLocations(locations: Location[]): Promise<void> {
  await kvSet("locations", locations);
}
