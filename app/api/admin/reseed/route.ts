import { NextRequest } from "next/server";

/**
 * Temporary endpoint to reseed Blob storage from local files.
 * Deletes existing blob keys so kvGet auto-seeds from deployed local data.
 * DELETE THIS FILE after use.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { error: "No blob token configured" },
      { status: 500 },
    );
  }

  const { del, list } = await import("@vercel/blob");

  const keysToDelete = [
    "data/sections.json",
    "data/locations.json",
    "data/content.json",
  ];
  const results: Record<string, string> = {};

  for (const key of keysToDelete) {
    try {
      // List blobs matching this path to get the actual URL
      const blobs = await list({ prefix: key });
      if (blobs.blobs.length > 0) {
        await del(blobs.blobs.map((b) => b.url));
        results[key] = "deleted";
      } else {
        results[key] = "not found";
      }
    } catch (e) {
      results[key] = `error: ${String(e)}`;
    }
  }

  return Response.json({
    message:
      "Blob keys cleared. Next requests will auto-seed from local files.",
    results,
  });
}
