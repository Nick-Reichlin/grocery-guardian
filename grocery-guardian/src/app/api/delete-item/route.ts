import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(req: any, res: any) {
    console.log("In API")
    console.log("In API")
    
    const url = new URL(req.url, 'http://localhost')
    const id = url.searchParams.get('id')

    try {
        const itemId = parseInt(id as string, 10);
        const item = await prisma.foodItem.delete({
            where: { id: itemId },
        });

        return new NextResponse(JSON.stringify({
            message: `Item with id ${itemId} deleted successfully`
        }),
        {
            status: 200
        });
        
    } catch(err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }),
        {
            status: 500
        })
    }
};
