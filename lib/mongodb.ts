import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  const client = new MongoClient(mongoUri);
  await client.connect();

  const db = client.db("interest_calc");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
