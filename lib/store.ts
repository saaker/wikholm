/**
 * Unified key-value store.
 * Uses Upstash Redis on Vercel (when KV_REST_API_URL is set),
 * falls back to local JSON files for development.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

let redis: import("@upstash/redis").Redis | null = null;

function getRedis() {
  if (redis) return redis;
  // Vercel Upstash integration uses UPSTASH_REDIS_REST_* env vars;
  // fallback to KV_REST_API_* for compatibility
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  // Dynamic import avoids bundling issues in dev
  const { Redis } =
    require("@upstash/redis") as typeof import("@upstash/redis");
  redis = new Redis({ url, token });
  return redis;
}

const DATA_DIR = path.join(process.cwd(), "data");

async function readLocal<T>(key: string, fallback: T): Promise<T> {
  try {
    const data = await readFile(path.join(DATA_DIR, `${key}.json`), "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

async function writeLocal<T>(key: string, value: T): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(
    path.join(DATA_DIR, `${key}.json`),
    JSON.stringify(value, null, 2),
    "utf-8",
  );
}

export async function kvGet<T>(key: string, fallback: T): Promise<T> {
  const kv = getRedis();
  if (kv) {
    const data = await kv.get<T>(key);
    if (data !== null && data !== undefined) return data;
    // Redis empty → seed from local bundled file
    const local = await readLocal(key, fallback);
    await kv.set(key, local);
    return local;
  }
  return readLocal(key, fallback);
}

export async function kvSet<T>(key: string, value: T): Promise<void> {
  const kv = getRedis();
  if (kv) {
    await kv.set(key, value);
    return;
  }
  await writeLocal(key, value);
}
