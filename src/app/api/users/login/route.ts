import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

connect() // Connect to DB

export async function POST(request: NextRequest) { 
    try {
        const reqBody = await request.json(); //expressjs - req.body
        const { email , password } = reqBody;

        console.log("Login - BE", reqBody);

        // 1. Check if user exists - User should exist
        const user = await User.findOne({ email })// Since it is a db call use await , db is in different continent it will take time to fetch the data
        
        console.log("user" , user)
        if (!user) {
            return NextResponse.json({
                error: "User does not exist",
                status: 400
            })
        }

        // 2. Check if password is correct
        const validPassword = await bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid password",
                status: 400
            })
        }

        //3. Create token

        //Create token data
        const tokenData = ({
            id: user._id,
            username: user.username,
            email: user.email
        })
        //Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
        
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })

        // Store the token in cookies
        response.cookies.set("token", token, {httpOnly: true})

        return response;

    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}