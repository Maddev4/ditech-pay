import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (email) {
      const users = await prisma.user.findMany({
        where: {
          email: {
            contains: email,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json(users);
    }

    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
