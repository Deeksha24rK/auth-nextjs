"use client"; //Make it client component , by default it is server component

import axios from "axios";
import React, { useState } from "react";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false)

    const forgotPasswordMail = () => {
        try {
            const response = axios.post('/api/users/forgotPassword', { email })
            console.log("axios response", response)
            setIsEmailSent(true)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {!isEmailSent ? <>
                <h1>Reset your password</h1>
                <br />
                <div className="flex flex-col items-center justify-center">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</div>
                <br />
                <label htmlFor="email">Email Address</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    placeholder="Enter the email" />

                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={forgotPasswordMail}>
                    Submit
                </button>
            </> :
                <h1>Please check your email inbox for a link to complete the reset.</h1>
            }
        </div>
    )
}

export default ForgotPassword;