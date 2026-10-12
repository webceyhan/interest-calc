import { NextRequest, NextResponse } from "next/server";
import { generateToken, invalidateToken } from "../tokens";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (password === adminPassword) {
      const token = generateToken();
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
      invalidateToken(token);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
