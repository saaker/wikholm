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
    const { get } = await import("@vercel/blob");
    try {
      const resp = await get(`data/${key}.json`, {
        access: "private",
        useCache: false,
      });
      if (resp) {
        const data = await new Response(resp.stream).json();
        return data as T;
      }
    } catch {
      // Blob not found → seed from local
    }
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
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  await writeLocal(key, value);
}
