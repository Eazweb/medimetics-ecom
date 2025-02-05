import { prismaDB } from "@/db/db.config";
import { client } from "@/lib/Redis";
import { NextResponse } from "next/server";

async function getProductsFromCache() {
  const cache = await client.get("products");
  return cache ? JSON.parse(cache) : null;
}

async function fetchProductsAndUpdateCache() {
  console.log("🔍 Fetching products from database...");
  const products = await prismaDB.product.findMany({
    include: {
      categories: true,
    },
  });

  console.log(`📊 Found ${products.length} products in database`);

  if (products.length > 0) {
    console.log("💾 Updating Redis cache...");
    await client.set("products", JSON.stringify(products), "EX", 120);
  }

  return products;
}

export const GET = async () => {
  try {
    console.log("🚀 Starting products fetch...");
    let products = await getProductsFromCache();

    if (!products) {
      console.log("🔄 Cache miss, fetching from database...");
      products = await fetchProductsAndUpdateCache();
    } else {
      console.log("✨ Products found in cache");
    }

    if (products.length === 0) {
      console.log("⚠️ No products found in database");
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the products.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};
