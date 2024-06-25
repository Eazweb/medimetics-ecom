import { Redis } from "ioredis";

function initializeRedisClient() {
  if (!process.env.REDIS) {
    console.error("REDIS environment variable is not set.");
    process.exit(1);
  }

  const client = new Redis(process.env.REDIS, {
    tls: {
      rejectUnauthorized: false,
    },
  });

  client.on("connect", () => {
    console.log("Redis client connected successfully.");

    client
      .set("testKey", "testValue")
      .then(() => {
        console.log("Connection test successful");
      })
      .catch((err) => {
        console.error("Connection test failed:", err);
      });
  });

  client.on("error", (error) => {
    console.error("Redis client error:", error);
  });

  return client;
}

const client = initializeRedisClient();
export default client;
