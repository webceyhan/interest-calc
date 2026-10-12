import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

// In-memory token store (in production, use a database)
const tokens = new Map<string, { expiresAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (password === adminPassword) {
      // Generate a secure random token
      const token = randomBytes(32).toString("hex");
      // Token expires in 1 hour
      const expiresAt = Date.now() + 3600000;
      tokens.set(token, { expiresAt });

      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (token) {
      tokens.delete(token);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}

export function validateToken(token: string): boolean {
  const tokenData = tokens.get(token);
  if (!tokenData) return false;
  if (Date.now() > tokenData.expiresAt) {
    tokens.delete(token);
    return false;
  }
  return true;
}
