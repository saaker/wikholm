import { NextRequest } from "next/server";
import { getSections, saveSections } from "@/lib/sections";
import type { SectionsData } from "@/lib/sections";

export async function GET() {
  const sections = await getSections();
  return Response.json(sections);
}

export async function PUT(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: SectionsData = await request.json();

  const requiredKeys: (keyof SectionsData)[] = [
    "services",
    "aligners",
    "advantages",
    "process",
    "dm",
    "faq",
    "myths",
    "news",
    "beforeAfter",
  ];
  for (const key of requiredKeys) {
    if (!Array.isArray(body[key])) {
      return Response.json(
        { error: `Missing or invalid array: ${key}` },
        { status: 400 },
      );
    }
  }

  try {
    await saveSections(body);
  } catch (err) {
    console.error("Failed to save sections:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }
  return Response.json(body);
}
