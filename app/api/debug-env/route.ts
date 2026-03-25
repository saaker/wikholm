import { NextRequest } from "next/server";

/** Debug endpoint to check which env vars are available (auth required). */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // List env var names (not values!) that contain redis/kv/upstash
  const relevant = Object.keys(process.env).filter((k) =>
    /redis|kv|upstash/i.test(k),
  );

  return Response.json({ envKeys: relevant });
}
