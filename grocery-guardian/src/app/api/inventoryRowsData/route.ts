import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: any, res: any) {
    try {
        const url = new URL(req.url, 'http://localhost')
        const userID = url.searchParams.get('userID')

        if (!userID) {
            return new NextResponse(JSON.stringify({
                error: "UserID parameter is missing"
            }), {
                status: 400
            })
        }
  
        const user = await prisma.user.findUnique({
          where: {
            id: parseInt(userID as string),
          },
        });
  
        if (!user) {
            return new NextResponse(JSON.stringify({
                error: "User not found"
            }), {
                status: 404
            })
        }
  
        const foodItems = await prisma.foodItem.findMany({
          where: {
            userID: parseInt(userID as string),
          },
        });

        return new NextResponse(JSON.stringify({
            foodItems
        }), {
            status: 200
        })
  
        //return res.status(200).json({ user, foodItems });
    } catch (error) {
      console.error('Error fetching food items:', error);
      res.status(500).json({ error: 'Failed to fetch food items' });
    }
  }