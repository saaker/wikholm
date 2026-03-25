import { NextRequest } from "next/server";
import { kvGet, kvSet } from "@/lib/store";

/** Debug endpoint to check Redis connection (auth required). */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const relevant = Object.keys(process.env).filter((k) =>
    /redis|kv|upstash/i.test(k),
  );

  let redisTest = null;
  try {
    await kvSet("__test", "ok");
    const val = await kvGet<string>("__test", "");
    redisTest = { connected: true, value: val };
  } catch (e) {
    redisTest = { connected: false, error: String(e) };
  }

  return Response.json({ envKeys: relevant, redisTest });
}
