import { prismaDB } from "@/db/db.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    let missingFields: any = [];

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Please fill all the fields. Missing fields: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const product = await prismaDB.product.create({
      data: {
        ...body,
        categories: {
          create: body.categories,
        },
      },
    });

    return NextResponse.json(
      { product, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
};
