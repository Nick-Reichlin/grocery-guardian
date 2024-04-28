import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      console.log("IN API")
    } catch (err: any) {
      return new NextResponse(JSON.stringify({
          error: err.message,
      }), {
          status: 500,
      });
  }
}
