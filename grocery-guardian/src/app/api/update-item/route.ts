import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { id, name, quantity, expirationDate } = await req.json();

        // Find the grocery item by id
        const existingItem = await prisma.foodItem.findUnique({
            where: {
                id: id
            }
        });

        // If item exists, update it
        if (existingItem) {
            const updatedItem = await prisma.foodItem.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    quantity: quantity,
                    expirationDate: new Date(expirationDate),

                }
            });

            return NextResponse.json({
                item: updatedItem
            });
        } else {
            return new NextResponse(JSON.stringify({
                error: "Item not found"
            }), {
                status: 404
            });
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        });
    }
}

export async function GET(req: any) {
    try {
        const url = new URL(req.url, 'http://localhost');
        const id = url.searchParams.get('id');

        if (!id) {
            return new NextResponse(JSON.stringify({
                error: "ID parameter is missing"
            }), {
                status: 400
            });
        }

        // Find the grocery item by id
        const item = await prisma.foodItem.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!item) {
            return new NextResponse(JSON.stringify({
                error: "Item not found"
            }), {
                status: 404
            });
        }

        return new NextResponse(JSON.stringify({
            item
        }), {
            status: 200
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        });
    }
}
