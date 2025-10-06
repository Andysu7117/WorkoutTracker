import { NextRequest, NextResponse } from "next/server";
import { signUpSchema, type SignUpSchema } from "~/validation/auth";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsedBody = signUpSchema.parse(body);
        const { email, password } = parsedBody;

        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await db.user.create({ data: { email, passwordHash: hashedPassword } });
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}