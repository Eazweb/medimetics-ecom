import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { quantity, usersId, productId, addressId } = await req.json();
    if (!quantity || !usersId || !productId || !addressId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const userExists = await prismaDB.user.findUnique({
      where: {
        id: usersId,
      },
    });
    if (!userExists) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    const productExists = await prismaDB.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!productExists) {
      return NextResponse.json(
        { message: "Product does not exist" },
        { status: 404 }
      );
    }
    const addressExists = await prismaDB.orderAddress.findUnique({
      where: {
        id: addressId,
      },
    });
    if (!addressExists) {
      return NextResponse.json(
        { message: "Address does not exist" },
        { status: 404 }
      );
    }
    const order = await prismaDB.order.create({
      data: {
        quantity,
        usersId,
        productId,
        addressId,
      },
    });
    if (!order) {
      return NextResponse.json(
        { message: "Failed to create order" },
        { status: 500 }
      );
    }

    await prismaDB.cart.deleteMany({
      where: {
        userId: usersId,
      },
    });

    return NextResponse.json(
      { message: "Order created successfully, cart cleared" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error || "An error occurred" },
      { status: 500 }
    );
  }
};
