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

  // Try parsing REDIS_URL to see what we get
  let parsed = null;
  if (process.env.REDIS_URL) {
    try {
      const u = new URL(process.env.REDIS_URL);
      parsed = {
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port,
        username: u.username,
        hasPassword: !!u.password,
        passwordLength: u.password?.length ?? 0,
        restUrl: `https://${u.hostname}`,
      };
    } catch (e) {
      parsed = { error: String(e) };
    }
  }

  // Try connecting to Redis
  let redisTest = null;
  try {
    const { Redis } = await import("@upstash/redis");
    if (parsed && "restUrl" in parsed && process.env.REDIS_URL) {
      const u = new URL(process.env.REDIS_URL);
      const kv = new Redis({ url: `https://${u.hostname}`, token: u.password });
      await kv.set("__test", "ok");
      const val = await kv.get("__test");
      redisTest = { connected: true, value: val };
    }
  } catch (e) {
    redisTest = { connected: false, error: String(e) };
  }

  return Response.json({ envKeys: relevant, parsed, redisTest });
}
