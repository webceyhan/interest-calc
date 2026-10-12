import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const options: MongoClientOptions = {
  appName: "deposit-calculator",
  maxIdleTimeMS: 5000
};

const client = new MongoClient(process.env.MONGODB_URI, options);

// Attach the client to ensure proper cleanup on function suspension
attachDatabasePool(client);

// Ensure client is connected
let connectionPromise: Promise<MongoClient> | null = null;

async function ensureConnected() {
  if (connectionPromise) {
    return connectionPromise;
  }
  
  connectionPromise = client.connect();
  return connectionPromise;
}

// Export the client for use in route handlers
export default client;

export async function getDatabase() {
  await ensureConnected();
  return client.db("interest_calc");
}
