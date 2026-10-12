import { MongoClient, MongoClientOptions } from 'mongodb';

let client: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (client && client.topology?.isConnected()) {
    return client;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  const options: MongoClientOptions = {
    appName: "deposit-calculator",
    maxIdleTimeMS: 5000
  };

  client = new MongoClient(process.env.MONGODB_URI, options);
  await client.connect();
  return client;
}

export async function getDatabase() {
  const c = await getClient();
  return c.db("interest_calc");
}
