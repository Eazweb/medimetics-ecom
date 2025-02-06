import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const order = await prismaDB.order.findUnique({
      where: { id: params.orderId },
      include: {
        Product: true,
        address: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
