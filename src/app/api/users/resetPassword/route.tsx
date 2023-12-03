import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, newPassword } = reqBody;

        //Find User in Mongo DB
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({
                statusCode: 401,
                message: "Invalid Token or User not found",
            })
        }

        //Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        //Once user found update the user data in the DB
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            statusCode: 200,
            message: 'Successfully updated password',
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            statusCode: 500,
            message: error?.message || 'Internal Server Error',
        })
    }
}