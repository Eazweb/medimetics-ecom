import { prismaDB } from "@/db/db.config";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { street, city, state, country, postalCode, phoneNumber } =
      await req.json();
    if (!street || !city || !state || !country || !postalCode || !phoneNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const address = await prismaDB.address.create({
      data: {
        street,
        city,
        state,
        country,
        postalCode,
        phoneNumber,
      },
    });
    if (!address) {
      return NextResponse.json(
        { error: "An error occurred while creating address" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      data: address,
      message: "Address created successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while creating address" },
      { status: 500 }
    );
  }
};
