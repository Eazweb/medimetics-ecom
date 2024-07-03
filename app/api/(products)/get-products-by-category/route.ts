import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { category } = await req.json();

    const products = await prismaDB.product.findMany({
      where: {
        categories: {
          some: {
            name: {
              equals: category,
            },
          },
        },
      },
      include: {
        categories: { select: { name: true } },
      },
    });

    if (!products.length) {
      return NextResponse.json({ error: "No products found" }, { status: 404 });
    }
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
};
