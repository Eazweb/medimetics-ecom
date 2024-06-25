import { prismaDB } from "@/db/db.config";
import { NextResponse } from "next/server";

export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    const user = await prismaDB.user.findUnique({
      where: {
        id: params?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        Order: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "No User Found", status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};
