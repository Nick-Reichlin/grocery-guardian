import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

const currentDate = new Date();
const currentDateNormalized = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);

export async function PUT(req: Request) {
    try {
        const { count } = await prisma.foodItem.updateMany({
            where: {
                expirationDate: {
                    lt: currentDateNormalized,
                },
            },
            data: {
                expired: true, // Set expired to true for these items
            },
        });
        return new NextResponse(JSON.stringify({
            message: `${count} items updated`,
        }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error updating expired items:', error);
        return new NextResponse(JSON.stringify({
            error
        }), {
            status: 500,
        });
    }
};
