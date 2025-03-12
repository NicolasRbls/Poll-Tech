const { MongoClient } = require("mongodb");

let cachedClient = null;

const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  cachedClient = client;
  return cachedClient;
}

module.exports = connectDB;
