import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { validateToken } from "../tokens";
import type { BankData } from "@/types";

const TOKEN_COOKIE_NAME = "admin_token";
const KV_KEY = "banks_data";

export async function GET() {
  try {
    // Try to get from KV first (production)
    let banks = await kv.get<BankData[]>(KV_KEY);
    
    // If no data in KV, use default from public/banks.json
    if (!banks) {
      if (process.env.NODE_ENV === "development") {
        const { readFile } = await import("fs/promises");
        const { join } = await import("path");
        const filePath = join(process.cwd(), "public", "banks.json");
        const data = await readFile(filePath, "utf-8");
        banks = JSON.parse(data);
      } else {
        // Return empty array if no KV data in production
        return NextResponse.json([]);
      }
    }
    
    return NextResponse.json(banks);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error loading banks:", error);
    }
    return NextResponse.json({ error: "Failed to load banks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const banks: BankData[] = await request.json();

    if (!Array.isArray(banks) || banks.length === 0) {
      return NextResponse.json({ error: "Invalid banks data" }, { status: 400 });
    }

    for (const bank of banks) {
      if (!bank.name || typeof bank.interestRate !== "number" || typeof bank.reservedAmount !== "number") {
        return NextResponse.json({ error: "Invalid bank data format" }, { status: 400 });
      }
    }

    // Store in KV
    await kv.set(KV_KEY, banks);

    return NextResponse.json({ success: true, message: "Banks updated successfully" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error updating banks:", error);
    }
    return NextResponse.json({ error: "Failed to update banks" }, { status: 500 });
  }
}
