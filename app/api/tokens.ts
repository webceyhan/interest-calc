import { randomBytes } from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function generateToken(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  const db = await getDatabase();
  const collection = db.collection("admin_tokens");
  
  const result = await collection.insertOne({
    token,
    expiresAt,
    createdAt: new Date(),
  });

  return token;
}

export async function validateToken(token: string): Promise<boolean> {
  const db = await getDatabase();
  const collection = db.collection("admin_tokens");
  
  const now = new Date();
  
  const tokenData = await collection.findOne({
    token,
    expiresAt: { $gt: now },
  } as any);

  return !!tokenData;
}

export async function invalidateToken(token: string): Promise<void> {
  const db = await getDatabase();
  const collection = db.collection("admin_tokens");
  
  await collection.deleteOne({ token } as any);
}
