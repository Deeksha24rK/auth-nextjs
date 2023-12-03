"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [token, setToken] = useState("")

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]; //window is available here
        setToken(urlToken || '')
    }, [])

    const onSubmit = () => {
        if (newPassword.toLowerCase() === confirmPassword.toLowerCase()) {
            // send new password to server
            const response = axios.post('api/users/resetPassword', { token, newPassword })
            response.then(res => { res.data.success && setIsPasswordReset(true) })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            {isPasswordReset ?
                <>
                    <h1>Successfully updated password</h1>
                    <Link href={'/login'}>Go to login page</Link>
                </> :
                <>
                    <h1 className="text-center">Reset Password</h1>

                    <br />

                    <label htmlFor="newpassword">Enter new password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="password"
                        id="newpassword"
                        name="newpassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <br />

                    <label htmlFor="confirmPassword">Confirm new password</label>
                    <input
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />

                    <button
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                        onClick={onSubmit}>
                        Submit</button>
                </>}
        </div>
    )
}

export default ResetPassword