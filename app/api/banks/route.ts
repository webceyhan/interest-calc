import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { auth } from "@/auth";
import type { BankData } from "@/types";

const DUMMY_BANKS: BankData[] = [
  { name: "ING", interestRate: 44.0, reservedAmount: 285000 },
  { name: "Yapı Kredi", interestRate: 40.3, reservedAmount: 300000 },
  { name: "TEB", interestRate: 42.0, reservedAmount: 485000 },
  { name: "Vakıfbank", interestRate: 38.0, reservedAmount: 450000 },
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<{ _id: string; data: BankData[]; updatedAt?: Date }>("banks");
    
    const banks = await collection.findOne({ _id: "banks_data" } as { _id: string });
    
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
    const session = await auth();

    if (!session?.user?.isAdmin) {
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
      { _id: "banks_data" } as { _id: string },
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
