import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import type { BankData } from "@/types";

export async function GET() {
  try {
    const response = await fetch(new URL("/banks.json", process.env.NEXTAUTH_URL || "http://localhost:3000"));
    const banks: BankData[] = await response.json();
    return NextResponse.json(banks);
  } catch {
    return NextResponse.json({ error: "Failed to load banks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
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
