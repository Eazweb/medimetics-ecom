import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const orders = await prismaDB.order.findMany({
      include: {
        Product: {
          select: {
            name: true,
            price: true,
            mainImage: true,
          },
        },
        address: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json({ orders, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
};
