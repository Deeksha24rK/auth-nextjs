import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json() //expressjs - req.body
        const { token } = reqBody
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        
        if (!user) {
            return NextResponse.json({
                error: 'Invalid token',
                status: 400
            })
        }

        //Once user found update the user data in the DB
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: 'Email verified successfully',
            success: true
        })
    } catch (error: any) {
        console.log("catch", error.message)
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}