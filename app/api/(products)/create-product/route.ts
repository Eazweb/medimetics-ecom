import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      mainImage,
      otherImages,
      userId,
      categories,
      sizes,
      colors,
      quantity,
    } = body;

    // Check for required fields
    const requiredFields = {
      name,
      description,
      price,
      userId,
      categories,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Create the product
    const product = await prismaDB.product.create({
      data: {
        name,
        description,
        price: Number(price),
        mainImage: mainImage || "",
        otherImages: otherImages || "",
        userId,
        sizes: sizes || [],
        colors: colors || [],
        quantity: quantity || 1,
        categories: {
          create: {
            name: categories,
          },
        },
      },
      include: {
        categories: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      {
        message: "Failed to create product",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
};
