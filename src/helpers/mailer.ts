import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    console.log("Props to sendmail",{ email, emailType, userId })
    
    try {
        //Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000 //Current time + One hour
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000 //Current time + One hour
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NM_USER,
              pass: process.env.NM_PASS
            }
          });

        const mailOptions = {
            from: 'deeksha24rk@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p> Click <a href=${`${process.env.domain}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetPassword'}?token=${hashedToken}`}> here </a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'},else copy and paste the URL:${`${process.env.domain}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetPassword'}?token=${hashedToken}`}</p>`}

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
        
   } catch (error: any) {
        throw new Error(error.message);
    }
}