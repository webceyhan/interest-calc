import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ token: null, inDB: false, error: "No token in cookie" });
    }

    const db = await getDatabase();
    const collection = db.collection("admin_tokens");
    
    // Check if token exists
    const doc = await collection.findOne({ token });
    
    return NextResponse.json({
      token: token.slice(0, 16) + "...",
      inDB: !!doc,
      doc: doc ? { ...doc, token: doc.token.slice(0, 16) + "..." } : null,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}
