import { randomBytes } from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function generateToken(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  const db = getDatabase();
  const collection = db.collection("admin_tokens");
  
  console.error("[TOKEN_GENERATE] Creating token:", token.slice(0, 8) + "...", "Expires:", expiresAt.toISOString());
  
  const result = await collection.insertOne({
    token,
    expiresAt,
    createdAt: new Date(),
  });

  console.error("[TOKEN_GENERATE] Inserted:", result.insertedId);

  return token;
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const db = getDatabase();
    const collection = db.collection("admin_tokens");
    
    const now = new Date();
    console.error("[TOKEN_VALIDATE] Token:", token.slice(0, 8) + "...", "Now:", now.toISOString());
    
    const tokenData = await collection.findOne({
      token,
      expiresAt: { $gt: now },
    } as any);

    const isValid = !!tokenData;
    console.error("[TOKEN_VALIDATE] Found:", isValid, "Data:", tokenData ? "exists" : "null");
    
    return isValid;
  } catch (error) {
    console.error("[TOKEN_VALIDATE] Error:", error);
    return false;
  }
}

export async function invalidateToken(token: string): Promise<void> {
  const db = getDatabase();
  const collection = db.collection("admin_tokens");
  
  await collection.deleteOne({ token } as any);
}
