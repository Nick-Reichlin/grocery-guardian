import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, quantity, userId, expirationDate } = await req.json();

        const quantityInt = parseInt(quantity, 10);

        const userIdInt = parseInt(userId, 10);

        const foodItem = await prisma.foodItem.create({
            data: {
                name,
                quantity: quantityInt,
                expirationDate,
                user: {
                    connect: { id: userIdInt }
                },
            },
        });

        return NextResponse.json({
            foodItem: {
                name: foodItem.name,
            },
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message,
        }), {
            status: 500,
        });
    }
}
