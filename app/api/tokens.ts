import { randomBytes } from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function generateToken(): Promise<string> {
  try {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    console.log("[TOKEN_GENERATE] Starting...");
    
    const db = await getDatabase();
    console.log("[TOKEN_GENERATE] Got database");
    
    const collection = db.collection("admin_tokens");
    console.log("[TOKEN_GENERATE] Got collection");
    
    const result = await collection.insertOne({
      token,
      expiresAt,
      createdAt: new Date(),
    });

    console.log("[TOKEN_GENERATE] Inserted:", result.insertedId, "Token:", token.slice(0, 8) + "...");

    return token;
  } catch (error) {
    console.log("[TOKEN_GENERATE] FAILED:", error);
    throw error;
  }
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    console.log("[TOKEN_VALIDATE] Starting with token:", token.slice(0, 8) + "...");
    
    const db = await getDatabase();
    const collection = db.collection("admin_tokens");
    
    const now = new Date();
    
    const tokenData = await collection.findOne({
      token,
      expiresAt: { $gt: now },
    } as any);

    const isValid = !!tokenData;
    console.log("[TOKEN_VALIDATE] Result:", isValid);
    
    return isValid;
  } catch (error) {
    console.log("[TOKEN_VALIDATE] FAILED:", error);
    return false;
  }
}

export async function invalidateToken(token: string): Promise<void> {
  try {
    const db = await getDatabase();
    const collection = db.collection("admin_tokens");
    
    await collection.deleteOne({ token } as any);
    console.log("[TOKEN_INVALIDATE] Deleted token:", token.slice(0, 8) + "...");
  } catch (error) {
    console.log("[TOKEN_INVALIDATE] FAILED:", error);
  }
}
