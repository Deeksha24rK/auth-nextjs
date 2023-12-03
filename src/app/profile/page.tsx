"use client" //Make it client component , by default it is server component

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState("");

    const getUserDetails = async () => {
        try {
            const res = await axios.get('api/users/me')
            console.log("response from me", res.data)
            setData(res.data.data._id)
        } catch (error: any) {
            console.log("error", error.message)
        }
    }

    const onLogout = async () => {
        try {
            await axios.get('api/users/logout');
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile</h1>
            <br />

            <br />
            <h2 className='p-3 rounded bg-green-600'>{data ? <Link href={`/profile/${data}`}>{data}</Link> : "No User Data to be displayed"}
            </h2>
            <br />

            <button
                className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={getUserDetails}
            >
                Get User Details
            </button>

            <br />
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default ProfilePage
