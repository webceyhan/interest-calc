import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { generateToken, invalidateToken, validateToken } from "../tokens";

const TOKEN_COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY_MS = 3600000; // 1 hour

export async function POST(request: NextRequest) {
  console.error("[AUTH_POST] Route called");
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable is not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { password } = await request.json();
    
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Use constant-time comparison to prevent timing attacks
    try {
      timingSafeEqual(Buffer.from(password), Buffer.from(adminPassword));
    } catch {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await generateToken();
    const response = NextResponse.json({ success: true });
    
    // Set httpOnly cookie (not accessible from JavaScript)
    response.cookies.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: TOKEN_EXPIRY_MS / 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Authentication error:", error);
    }
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    if (token) {
      await invalidateToken(token);
    }

    const response = NextResponse.json({ success: true });
    
    // Clear the cookie
    response.cookies.set(TOKEN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Logout error:", error);
    }
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  console.error("[AUTH_GET] Route called");
  try {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    if (!token) {
      console.error("[AUTH_GET] No token in cookie");
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    console.error("[AUTH_GET] Found token, validating...");
    // Validate token
    if (!await validateToken(token)) {
      console.error("[AUTH_GET] Token validation failed");
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    console.error("[AUTH_GET] Token valid");
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    console.error("[AUTH_GET] Caught error:", error);
    if (process.env.NODE_ENV === "development") {
      console.error("Status check error:", error);
    }
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
