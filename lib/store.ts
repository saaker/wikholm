/**
 * Unified key-value store.
 * Uses Vercel Blob on production (when BLOB_READ_WRITE_TOKEN is set),
 * falls back to local JSON files for development.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
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
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    // Check if blob exists
    const { blobs } = await list({ prefix: `data/${key}.json`, limit: 1 });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url);
      if (res.ok) return (await res.json()) as T;
    }
    // Blob doesn't exist → seed from local bundled file
    const local = await readLocal(key, fallback);
    await kvSet(key, local);
    return local;
  }
  return readLocal(key, fallback);
}

export async function kvSet<T>(key: string, value: T): Promise<void> {
  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(`data/${key}.json`, JSON.stringify(value, null, 2), {
      access: "public",
      addRandomSuffix: false,
    });
    return;
  }
  await writeLocal(key, value);
}
