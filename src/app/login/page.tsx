"use client"; //Make it client component , by default it is server component

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('api/users/login', user);

            console.log("Login - FE - response", response);
            toast.success("Login success");

            router.push('/profile');
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>

            <br />

            <label htmlFor="email"> Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter the email"
            />

            <label htmlFor="password"> Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter the password"
            />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}>
                {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href={"/signup"}>Dont have an account? Sign up</Link>

            <br />

            <Link href={"/forgotPassword"}>Forgot Password? </Link>
        </div>
    )
}

export default LoginPage