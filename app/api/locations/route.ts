import { NextRequest } from "next/server";
import { getLocations, saveLocations, type Location } from "@/lib/locations";

export async function GET() {
  const locations = await getLocations();
  return Response.json(locations);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Location = await request.json();

  if (!body.name || !body.address || body.lat == null || body.lng == null) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const locations = await getLocations();
  const newLocation: Location = {
    ...body,
    id: body.id || crypto.randomUUID(),
  };
  locations.push(newLocation);
  try {
    await saveLocations(locations);
  } catch (err) {
    console.error("Failed to save locations:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }

  return Response.json(newLocation, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Location = await request.json();
  const locations = await getLocations();
  const index = locations.findIndex((l) => l.id === body.id);

  if (index === -1) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }

  locations[index] = body;
  try {
    await saveLocations(locations);
  } catch (err) {
    console.error("Failed to save locations:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }

  return Response.json(body);
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const locations = await getLocations();
  const filtered = locations.filter((l) => l.id !== id);

  if (filtered.length === locations.length) {
    return Response.json({ error: "Location not found" }, { status: 404 });
  }

  try {
    await saveLocations(filtered);
  } catch (err) {
    console.error("Failed to save locations:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
  return Response.json({ success: true });
}
