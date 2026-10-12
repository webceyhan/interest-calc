import { randomBytes } from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function generateToken(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  const db = getDatabase();
  const collection = db.collection("admin_tokens");
  
  await collection.insertOne({
    token,
    expiresAt,
    createdAt: new Date(),
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Token generated:", { token: token.slice(0, 8) + "...", expiresAt });
  }

  return token;
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const db = getDatabase();
    const collection = db.collection("admin_tokens");
    
    const tokenData = await collection.findOne({
      token,
      expiresAt: { $gt: new Date() },
    } as any);

    const isValid = !!tokenData;
    
    if (process.env.NODE_ENV === "development") {
      console.log("Token validation:", { token: token.slice(0, 8) + "...", isValid, found: !!tokenData });
    }
    
    return isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

export async function invalidateToken(token: string): Promise<void> {
  const db = getDatabase();
  const collection = db.collection("admin_tokens");
  
  await collection.deleteOne({ token } as any);
}
