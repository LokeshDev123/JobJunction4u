// app/api/statics/[...path]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mime from "mime";

export async function GET(req: Request) {
  try {
    // 1️⃣ Extract file path from the URL
    const url = new URL(req.url);
    // e.g. /api/statics/images/logo.png  →  ["images", "logo.png"]
    const parts = url.pathname.replace("/api/statics/", "").split("/").filter(Boolean);

    // 2️⃣ Prevent directory traversal (security)
    if (parts.some(p => p.includes(".."))) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    // 3️⃣ Build full file path inside "statics"
    const filePath = path.join(process.cwd(), "statics", ...parts);

    // 4️⃣ Check if file exists
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // 5️⃣ Read the file
    const file = fs.readFileSync(filePath);
    const type = mime.getType(filePath) || "application/octet-stream";

    // 6️⃣ Send the file back
    return new NextResponse(file, {
      headers: { "Content-Type": type },
    });

  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
