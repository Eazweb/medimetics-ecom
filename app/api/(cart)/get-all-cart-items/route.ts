import { prismaDB } from "@/db/db.config";
import client from "@/lib/Redis";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();

  try {
    if (!userId) {
      return NextResponse.json({ error: "User ID is required", status: 400 });
    }

    const cachedCartItems = await client.get(`cartItems:${userId}`);
    if (cachedCartItems) {
      return NextResponse.json({
        message: "Cart items fetched successfully from cache",
        status: 200,
        data: JSON.parse(cachedCartItems),
      });
    }

    const userExists = await prismaDB.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    const cartItems = await prismaDB.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
      },
    });

    await client.setex(`cartItems:${userId}`, 120, JSON.stringify(cartItems));

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Something went wrong while fetching cart items",
      status: 500,
    });
  }
};
