import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export  async function GET(req: any) {
    const url = new URL(req.url, 'http://localhost');
    const name = url.searchParams.get('name');

    try {
      const foodExpiration = await prisma.expiration.findUnique({
        where: { name }
      });

      if (!foodExpiration) {
        return new NextResponse(JSON.stringify({
            error: "Name parameter is missing"
        }), {
            status: 400
        });
      }

      const today = new Date();
      const expirationDate = new Date(today);
      expirationDate.setDate(today.getDate() + foodExpiration.expirationTime);

    return new NextResponse(JSON.stringify({
        name: name,
        expirationDate: expirationDate.toISOString()
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
