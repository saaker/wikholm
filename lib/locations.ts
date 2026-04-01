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
}

export async function getLocations(): Promise<Location[]> {
  const raw = await kvGet<Location[]>("locations", []);
  return raw.map((loc) => ({
    ...loc,
    type: loc.type || "onsite",
    alignerBrands: loc.alignerBrands || [],
  }));
}

export async function saveLocations(locations: Location[]): Promise<void> {
  await kvSet("locations", locations);
}
