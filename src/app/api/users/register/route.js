import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log(body);

    if (!body || !body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body?.password || "111111",
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
