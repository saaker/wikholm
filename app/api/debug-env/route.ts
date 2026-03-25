import { NextRequest } from "next/server";
import { kvGet, kvSet } from "@/lib/store";

/** Debug endpoint to check Blob connection (auth required). */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

  let storeTest = null;
  try {
    await kvSet("__test", { ok: true, ts: Date.now() });
    const val = await kvGet("__test", null);
    storeTest = { connected: true, value: val };
  } catch (e) {
    storeTest = { connected: false, error: String(e) };
  }

  return Response.json({ hasBlob, storeTest });
}
