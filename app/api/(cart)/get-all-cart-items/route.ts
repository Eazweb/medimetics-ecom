import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();

  try {
    if (!userId) {
      return NextResponse.json({ error: "User ID is required", status: 400 });
    }

    // Check if the user exists
    const userExists = await prismaDB.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    // Fetch all cart items for the user
    const cartItems = await prismaDB.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json({
      message: "Cart items fetched successfully",
      status: 200,
      data: cartItems,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Something went wrong while fetching cart items",
      status: 500,
    });
  }
};
