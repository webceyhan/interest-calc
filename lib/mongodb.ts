import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

const options: MongoClientOptions = {
  appName: "deposit-calculator",
  maxIdleTimeMS: 5000
};

const client = new MongoClient(process.env.MONGODB_URI, options);

// Connect immediately on module load
client.connect().catch(error => {
  console.log("[MONGODB] Failed to connect:", error);
});

// Export the client for use in route handlers
export default client;

export async function getDatabase() {
  console.log("[MONGODB] getDatabase() called");
  return client.db("interest_calc");
}
