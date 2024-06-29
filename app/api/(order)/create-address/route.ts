import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { firstName, lastName, address, city, state, zip, userId } =
      await req.json();

    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !userId
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const userExists = await prismaDB.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
    const UserAddress = await prismaDB.orderAddress.create({
      data: {
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        userId,
      },
    });
    if (!UserAddress) {
      return NextResponse.json(
        { message: "Failed to create address" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Address created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
