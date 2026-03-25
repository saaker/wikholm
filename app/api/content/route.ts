import { NextRequest } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return Response.json(content);
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.sv || !body.en) {
    return Response.json(
      { error: "Both sv and en objects are required" },
      { status: 400 },
    );
  }

  // Full replace — the client sends the complete desired state
  try {
    await saveContent({ sv: body.sv, en: body.en });
  } catch (err) {
    console.error("Failed to save content:", err);
    return Response.json({ error: "Failed to save" }, { status: 500 });
  }
  return Response.json({ sv: body.sv, en: body.en });
}
