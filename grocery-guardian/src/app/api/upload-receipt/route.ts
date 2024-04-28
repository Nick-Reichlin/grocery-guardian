import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { matchedText, userId } = await req.json();

        // Parse user ID
        const userIdInt = parseInt(userId, 10);

        // Split and parse the matchedText into items
        const items = matchedText.split(",").map((item: string) => {
            const parts = item.trim().split(" ");
            const quantity = parseInt(parts[0], 10);
            const name = parts.slice(1).join(" ");
            return { name, quantity };
        });

        // Validate user existence
        const userExists = await prisma.user.findUnique({
            where: { id: userIdInt }
        });

        if (!userExists) {
            return new NextResponse(JSON.stringify({
                error: "User not found"
            }), {
                status: 404,
            });
        }

        // Add each item to the database
        const foodItems = await Promise.all(items.map((item: { name: any; quantity: any; }) =>
            prisma.foodItem.create({
                data: {
                    name: item.name,
                    quantity: item.quantity,
                    userID: userIdInt,
                    expirationDate: new Date(), // Assuming you want to set the current date as expiration date for example purposes
                }
            })
        ));

        // Return response with created items
        return NextResponse.json({
            items: foodItems.map(({ id, name }) => ({ id, name })),
        });
    } catch (err: any) {
        console.error("Error handling POST request:", err);
        return new NextResponse(JSON.stringify({
            error: err.message,
        }), {
            status: 500,
        });
    }
}
