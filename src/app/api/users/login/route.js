import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log(body);

    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else if (user.password !== body.password) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } else {
      console.log("Login successful");
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
