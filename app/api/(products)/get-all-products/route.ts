import { prismaDB } from "@/db/db.config";
import { NextResponse } from "next/server";

export const GET = async (_: any) => {
  try {
    const products = await prismaDB.product.findMany({
      include: {
        categories: true,
      },
    });

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
