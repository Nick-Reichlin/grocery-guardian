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

export async function GET(req: any, res: any) {
    try {
        const url = new URL(req.url, 'http://localhost')
        const email = url.searchParams.get('email')

        if (!email) {
            return new NextResponse(JSON.stringify({
                error: "Email parameter is missing"
            }), {
                status: 400
            })
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email.toString()
            }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({
                error: "User not found"
            }), {
                status: 404
            })
        }

        return new NextResponse(JSON.stringify({
            user: {
                email: user.email,
                name: user.name,
            }
        }), {
            status: 200
        })
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        }), {
            status: 500
        })
    }
}
