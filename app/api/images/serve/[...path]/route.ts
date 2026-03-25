import { NextRequest } from "next/server";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

/**
 * Serves images from Vercel Blob.
 * Reached via the rewrite: /images/:path* → /api/images/serve/:path*
 * Only hit when the file doesn't exist as a static asset in public/.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const segments = (await params).path;
  if (!segments || segments.length < 2) {
    return new Response("Not found", { status: 404 });
  }

  // Validate segments to prevent path traversal
  for (const seg of segments) {
    if (seg === ".." || seg.includes("/") || seg.includes("\\")) {
      return new Response("Bad request", { status: 400 });
    }
  }

  const blobPath = `images/${segments.join("/")}`;
  const ext = blobPath.substring(blobPath.lastIndexOf(".")).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  try {
    const { get } = await import("@vercel/blob");
    const blob = await get(blobPath, { access: "private" });
    if (!blob) return new Response("Not found", { status: 404 });

    return new Response(blob.stream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
