import { randomBytes } from "crypto";

// Shared in-memory token store
const tokens = new Map<string, { expiresAt: number }>();

export function generateToken(): string {
  const token = randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 3600000; // 1 hour
  tokens.set(token, { expiresAt });
  return token;
}

export function validateToken(token: string): boolean {
  const tokenData = tokens.get(token);
  if (!tokenData) return false;
  
  if (Date.now() > tokenData.expiresAt) {
    tokens.delete(token);
    return false;
  }
  
  return true;
}

export function invalidateToken(token: string): void {
  tokens.delete(token);
}
