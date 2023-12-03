import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest , NextResponse} from "next/server";

export async function POST(request: NextRequest)  {
    try {
        const reqBody = await request.json();
        const { email } = reqBody
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: 'User does not exist',
                status: 400
            });
        }

        // Send Verification email
        await sendEmail({ email, emailType: 'RESET', userId: user._id })
        
        return NextResponse.json({
            message: `A verification link has been sent to ${email} succesfully`,
            status: 200,
            success:true
        })
    
} catch (error:any) {
    return NextResponse.json({
        error: error.message,
        status: 500
    })
}
} 