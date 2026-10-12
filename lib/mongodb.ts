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

// Connect immediately on module load
client.connect().catch(error => {
  console.error("[MONGODB] Failed to connect:", error);
});

// Export the client for use in route handlers
export default client;

export async function getDatabase() {
  return client.db("interest_calc");
}
