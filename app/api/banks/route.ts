import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { validateToken } from "../tokens";
import type { BankData } from "@/types";

const TOKEN_COOKIE_NAME = "admin_token";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "banks.json");
    const data = await readFile(filePath, "utf-8");
    const banks: BankData[] = JSON.parse(data);
    return NextResponse.json(banks);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error loading banks:", error);
    } else {
      console.error("Error loading banks");
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

    const filePath = join(process.cwd(), "public", "banks.json");
    await writeFile(filePath, JSON.stringify(banks, null, 2));

    return NextResponse.json({ success: true, message: "Banks updated successfully" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error updating banks:", error);
    } else {
      console.error("Error updating banks");
    }
    return NextResponse.json({ error: "Failed to update banks" }, { status: 500 });
  }
}
