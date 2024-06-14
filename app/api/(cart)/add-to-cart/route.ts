import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, productId, quantity } = await req.json();
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

    // Check if the cart item already exists for the user and product
    const existingCartItem = await prismaDB.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      // Calculate the new quantity
      const newQuantity = existingCartItem.quantity + quantity;

      // If exists, update the quantity
      const updatedCartItem = await prismaDB.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
      return NextResponse.json({
        message: "Cart item quantity updated",
        status: 200,
        data: updatedCartItem,
      });
    } else {
      // If not, create a new cart item
      const newCartItem = await prismaDB.cart.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
      return NextResponse.json({
        message: "Product added to cart",
        status: 201,
        data: newCartItem,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Something went wrong while adding product to cart",
      status: 500,
    });
  }
};
