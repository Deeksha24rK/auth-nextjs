import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs" ;
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json() //expressjs - req.body
        const { username, email, password } = reqBody

        //Check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: 'User Already Exists',
                status: 409
            });
        }

        //Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //Save user into DB
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        
        const savedUser = await newUser.save()

        //Send Verification email
        await sendEmail({ email, emailType: 'VERIFY', userId : savedUser._id })

        return NextResponse.json({
            message: 'User successfully created',
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        });
    }
}