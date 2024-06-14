import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, productId } = await req.json();
  try {
    if (!userId) {
      return NextResponse.json({ error: "User ID is required", status: 400 });
    }
    if (!productId) {
      return NextResponse.json({
        error: "Product ID is required",
        status: 400,
      });
    }

    // Check if the user exists
    const userExists = await prismaDB.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }

    // Check if the product exists
    const productExists = await prismaDB.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!productExists) {
      return NextResponse.json({
        error: "Product not found",
        status: 404,
      });
    }

    // Create cart item if both user and product exist
    const cartItem = await prismaDB.cart.create({
      data: {
        userId,
        productId,
      },
    });
    return NextResponse.json({
      message: "Product added to cart",
      status: 201,
      data: cartItem,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Something went wrong while adding product to cart",
      status: 500,
    });
  }
};
