/**
 * Unified key-value store.
 * Uses Redis on Vercel (when REDIS_URL is set),
 * falls back to local JSON files for development.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import Redis from "ioredis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;

  redis = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 2 });
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
    const raw = await kv.get(key);
    if (raw !== null) return JSON.parse(raw) as T;
    // Redis empty → seed from local bundled file
    const local = await readLocal(key, fallback);
    await kv.set(key, JSON.stringify(local));
    return local;
  }
  return readLocal(key, fallback);
}

export async function kvSet<T>(key: string, value: T): Promise<void> {
  const kv = getRedis();
  if (kv) {
    await kv.set(key, JSON.stringify(value));
    return;
  }
  await writeLocal(key, value);
}
