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
  description: string;
}

export async function getLocations(): Promise<Location[]> {
  return kvGet<Location[]>("locations", []);
}

export async function saveLocations(locations: Location[]): Promise<void> {
  await kvSet("locations", locations);
}
