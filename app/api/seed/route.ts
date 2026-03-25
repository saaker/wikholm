import { NextRequest } from "next/server";
import { kvGet, kvSet } from "@/lib/store";
import { DEFAULT_SECTIONS } from "@/lib/sectionsDefaults";

/**
 * POST /api/seed  — Push bundled JSON data into Redis.
 * Requires ADMIN_SECRET auth header.
 * Only overrides keys that are empty in Redis (unless ?force=true).
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const force = req.nextUrl.searchParams.get("force") === "true";
  const seeded: string[] = [];

  // Sections
  if (force || !(await kvGet("sections", null))) {
    await kvSet("sections", DEFAULT_SECTIONS);
    seeded.push("sections");
  }

  // Content — empty overrides by default
  if (force || !(await kvGet("content", null))) {
    await kvSet("content", { sv: {}, en: {} });
    seeded.push("content");
  }

  // Locations — import from bundled data file
  if (force || !(await kvGet("locations", null))) {
    const { default: locations } = await import("@/data/locations.json");
    await kvSet("locations", locations);
    seeded.push("locations");
  }

  return Response.json({
    seeded,
    message: seeded.length
      ? "Done"
      : "All keys already exist. Use ?force=true to overwrite.",
  });
}
