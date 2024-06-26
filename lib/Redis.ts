import { Redis } from "ioredis";

const redisUrl = process.env.REDIS || "";
if (!redisUrl) {
  console.error("REDIS environment variable is not set.");
}

export const client = new Redis(redisUrl, {
  tls:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: true,
        }
      : undefined,
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("error", (error) => {
  console.error("Redis client error:", error);
});
