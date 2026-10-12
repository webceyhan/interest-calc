import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import type { BankData } from "@/types";

// Import token validation (we'll use a simple check instead)
const tokens = new Map<string, { expiresAt: number }>();

function validateToken(token: string): boolean {
  const tokenData = tokens.get(token);
  if (!tokenData) return false;
  if (Date.now() > tokenData.expiresAt) {
    tokens.delete(token);
    return false;
  }
  return true;
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "banks.json");
    const data = await readFile(filePath, "utf-8");
    const banks: BankData[] = JSON.parse(data);
    return NextResponse.json(banks);
  } catch (error) {
    console.error("Error loading banks:", error);
    return NextResponse.json({ error: "Failed to load banks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

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

    const filePath = join(process.cwd(), "public", "banks.json");
    await writeFile(filePath, JSON.stringify(banks, null, 2));

    return NextResponse.json({ success: true, message: "Banks updated successfully" });
  } catch (error) {
    console.error("Error updating banks:", error);
    return NextResponse.json({ error: "Failed to update banks" }, { status: 500 });
  }
}
