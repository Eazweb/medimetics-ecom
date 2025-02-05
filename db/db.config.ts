import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prismaDB =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

// Connection handling
prismaDB
  .$connect()
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaDB;
}
