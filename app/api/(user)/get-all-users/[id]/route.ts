import { prismaDB } from "@/db/db.config";
import { NextResponse } from "next/server";

export const GET = async (_: any, { params }: { params: { id: string } }) => {
  try {
    const user = await prismaDB.user.findUnique({
      where: {
        id: params?.id,
      },
      include: {
        Order: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "No User Found", status: 404 });
    return NextResponse.json({
      message: "User Found",
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};
