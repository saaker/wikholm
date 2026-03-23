import { readFile, writeFile } from "fs/promises";
import path from "path";

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

const DATA_PATH = path.join(process.cwd(), "data", "locations.json");

export async function getLocations(): Promise<Location[]> {
  const data = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
}

export async function saveLocations(locations: Location[]): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(locations, null, 2), "utf-8");
}
