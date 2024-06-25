import { prismaDB } from "@/db/db.config";
import { NextResponse } from "next/server";

export const GET = async (_: any) => {
  try {
    const Users = await prismaDB.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!Users)
      return NextResponse.json({ message: "No Users Found", status: 404 });
    if (Users && Users.length === 0)
      return NextResponse.json({ message: "No Users Found", status: 404 });
    return NextResponse.json(Users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};
