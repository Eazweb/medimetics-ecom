import { prismaDB } from "@/db/db.config";
import { NextResponse } from "next/server";

export const GET = async (_: any) => {
  try {
    const Users = await prismaDB.user.findMany();
    if (!Users)
      return NextResponse.json({ message: "No Users Found", status: 404 });
    if (Users && Users.length === 0)
      return NextResponse.json({ message: "No Users Found", status: 404 });
    return NextResponse.json({
      message: "Users Found",
      status: 200,
      data: Users,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
};
