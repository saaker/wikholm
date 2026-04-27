import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

function isAuth(req: NextRequest): boolean {
  const h = req.headers.get("authorization");
  return !!h && h === `Bearer ${process.env.ADMIN_SECRET}`;
}

/** Static manifest fallback for when fs.readdir fails (Vercel) */
async function getManifest(): Promise<Record<string, string[]>> {
  try {
    const data = await fs.readFile(
      path.join(IMAGES_DIR, "manifest.json"),
      "utf-8",
    );
    return JSON.parse(data);
  } catch {
    return {};
  }
}

/** List images stored in Blob under images/{folder}/ */
async function listBlobImages(folder?: string): Promise<string[]> {
  const { list } = await import("@vercel/blob");
  const prefix = folder ? `images/${folder}/` : "images/";
  const result = await list({ prefix, mode: "folded" });

  if (!folder) {
    // Extract unique folder names
    const folders = new Set<string>();
    for (const blob of result.blobs) {
      const parts = blob.pathname.replace(/^images\//, "").split("/");
      if (parts.length > 1 && parts[0]) folders.add(parts[0]);
    }
    return [...folders];
  }

  // Return filenames within the folder
  return result.blobs.map((b) => b.pathname.split("/").pop()!).filter(Boolean);
}

/** GET /api/images  →  { folders: string[] }
 *  GET /api/images?folder=before-after  →  { images: string[] }
 */
export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");

  if (!folder) {
    // List folders — merge filesystem + manifest + blob
    let folders: string[] = [];
    try {
      const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true });
      folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    } catch {
      const manifest = await getManifest();
      folders = Object.keys(manifest);
    }
    if (hasBlob()) {
      const blobFolders = await listBlobImages();
      const merged = new Set([...folders, ...blobFolders]);
      folders = [...merged].sort();
    }
    return Response.json({ folders });
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return Response.json({ error: "Invalid folder name" }, { status: 400 });
  }

  // List images in folder — merge filesystem + manifest + blob
  let images: string[] = [];
  const folderPath = path.join(IMAGES_DIR, folder);
  try {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    images = entries
      .filter(
        (e) =>
          e.isFile() &&
          ALLOWED_EXTENSIONS.has(path.extname(e.name).toLowerCase()),
      )
      .map((e) => e.name);
  } catch {
    const manifest = await getManifest();
    images = manifest[folder] || [];
  }
  if (hasBlob()) {
    const blobImages = await listBlobImages(folder);
    const merged = new Set([...images, ...blobImages]);
    images = [...merged].sort();
  }
  return Response.json({ images });
}

/** POST /api/images  →  upload file(s) to a folder */
export async function POST(req: NextRequest) {
  if (!isAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const folder = formData.get("folder") as string | null;
  if (!folder || !/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return Response.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const files = formData.getAll("files") as File[];
  if (files.length === 0) {
    return Response.json({ error: "No files provided" }, { status: 400 });
  }

  const uploaded: string[] = [];

  if (hasBlob()) {
    // Upload to Vercel Blob
    const { put } = await import("@vercel/blob");
    for (const file of files) {
      if (!(file instanceof File)) continue;
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) continue;
      if (file.size > MAX_FILE_SIZE) continue;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      await put(`images/${folder}/${safeName}`, file, {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      uploaded.push(safeName);
    }
  } else {
    // Local filesystem
    const folderPath = path.join(IMAGES_DIR, folder);
    await fs.mkdir(folderPath, { recursive: true });
    for (const file of files) {
      if (!(file instanceof File)) continue;
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) continue;
      if (file.size > MAX_FILE_SIZE) continue;
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(folderPath, safeName), buffer);
      uploaded.push(safeName);
    }
  }

  return Response.json({ uploaded });
}

/** DELETE /api/images?folder=x&file=y  →  delete a single image */
export async function DELETE(req: NextRequest) {
  if (!isAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const folder = req.nextUrl.searchParams.get("folder");
  const file = req.nextUrl.searchParams.get("file");

  if (!folder || !/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return Response.json({ error: "Invalid folder name" }, { status: 400 });
  }
  if (!file || !/^[a-zA-Z0-9._-]+$/.test(file)) {
    return Response.json({ error: "Invalid file name" }, { status: 400 });
  }

  if (hasBlob()) {
    const { del } = await import("@vercel/blob");
    try {
      await del(`images/${folder}/${file}`);
      return Response.json({ deleted: file });
    } catch {
      return Response.json({ error: "File not found" }, { status: 404 });
    }
  }

  // Local filesystem
  const filePath = path.join(IMAGES_DIR, folder, file);
  try {
    await fs.unlink(filePath);
    return Response.json({ deleted: file });
  } catch {
    return Response.json({ error: "File not found" }, { status: 404 });
  }
}
