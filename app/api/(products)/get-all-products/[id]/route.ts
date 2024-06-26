import { prismaDB } from "@/db/db.config";
import { client } from "@/lib/Redis";
import { NextResponse } from "next/server";

export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    const cachedProduct = await client.get(`product:${params.id}`);
    let product;

    if (cachedProduct) {
      product = JSON.parse(cachedProduct);
    } else {
      product = await prismaDB.product.findUnique({
        where: {
          id: params?.id,
        },
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (product) {
        await client.setex(
          `product:${params.id}`,
          120,
          JSON.stringify(product)
        );
      } else {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the product." },
      { status: 500 }
    );
  }
};
