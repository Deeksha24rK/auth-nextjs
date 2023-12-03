import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        })

        // Clear the token set in the cookies on Logout button click
        response.cookies.set("token", "", {
            httpOnly: true
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status: 500,
        })
    }
}