import { prismaDB } from "@/db/db.config";
import client from "@/lib/Redis";
import { NextResponse } from "next/server";

async function getProductsFromCache() {
  const cache = await client.get("products");
  return cache ? JSON.parse(cache) : null;
}

async function fetchProductsAndUpdateCache() {
  const products = await prismaDB.product.findMany({
    include: {
      categories: true,
    },
  });

  if (products.length > 0) {
    await client.set("products", JSON.stringify(products), "EX", 60);
  }

  return products;
}

export const GET = async () => {
  try {
    let products = await getProductsFromCache();

    if (!products) {
      products = await fetchProductsAndUpdateCache();
    }

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the products." },
      { status: 500 }
    );
  }
};
