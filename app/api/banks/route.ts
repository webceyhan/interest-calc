import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { validateToken } from "../tokens";
import type { BankData } from "@/types";

const TOKEN_COOKIE_NAME = "admin_token";

const DUMMY_BANKS: BankData[] = [
  { name: "ING Türkiye", interestRate: 24.5, reservedAmount: 5000 },
  { name: "TEB", interestRate: 23.75, reservedAmount: 10000 },
  { name: "Yapı Kredi", interestRate: 24.0, reservedAmount: 0 },
  { name: "Vakıfbank", interestRate: 23.5, reservedAmount: 2500 },
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<{ _id: string; data: BankData[]; updatedAt?: Date }>("banks");
    
    let banks = await collection.findOne({ _id: "banks_data" } as any);
    
    if (!banks || !banks.data) {
      return NextResponse.json(DUMMY_BANKS);
    }
    
    return NextResponse.json(banks.data);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error loading banks:", error);
    }
    return NextResponse.json(DUMMY_BANKS);
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    if (!token || !await validateToken(token)) {
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

    const db = await getDatabase();
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
