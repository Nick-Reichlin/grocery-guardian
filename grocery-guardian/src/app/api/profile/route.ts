import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json()
        const hashed = await hash(password, 12)

        // Find the user by email
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        // If user exists, update the user
        if (existingUser) {
            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    password: hashed,
                    name: name
                }
            })

            return NextResponse.json({
                user: {
                    email: updatedUser.email,
                }
            })
        } else {
            return new NextResponse(JSON.stringify({
                error: "User not found"
            }),
            {
                status: 404
            })
        }
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }),
        {
            status: 500
        })
    }
}

async function GET(req: Request) {
    try {
        const body = await req.json()

        if (!body || Object.keys(body).length === 0) {
            return new NextResponse(JSON.stringify({
                error: "Request body is empty"
            }),
            {
                status: 400
            })
        }

        const { email } = body

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({
                error: "User not found"
            }),
            {
                status: 404
            })
        }

        return NextResponse.json({
            user: {
                email: user.email,
                name: user.name,
                // Add any other fields you want to include in the response
            }
        })
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }),
        {
            status: 500
        })
    }
}
