import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { validateToken } from "../tokens";
import type { BankData } from "@/types";

const TOKEN_COOKIE_NAME = "admin_token";

export async function GET() {
  try {
    const db = getDatabase();
    const collection = db.collection<{ _id: string; data: BankData[]; updatedAt?: Date }>("banks");
    
    let banks = await collection.findOne({ _id: "banks_data" } as any);
    
    if (!banks || !banks.data) {
      // Fallback to default in development
      if (process.env.NODE_ENV === "development") {
        const { readFile } = await import("fs/promises");
        const { join } = await import("path");
        const filePath = join(process.cwd(), "public", "banks.json");
        const data = await readFile(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
      }
      return NextResponse.json([]);
    }
    
    return NextResponse.json(banks.data);
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

    const db = getDatabase();
    const collection = db.collection<{ _id: string; data: BankData[]; updatedAt?: Date }>("banks");
    
    await collection.updateOne(
      { _id: "banks_data" } as any,
      { $set: { data: banks, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Banks updated successfully" });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error updating banks:", error);
    }
    return NextResponse.json({ error: "Failed to update banks" }, { status: 500 });
  }
}
