'use client';
import React from 'react'
import { signOut, useSession } from 'next-auth/react';

const page = () => {

    const { data: session } = useSession();

    return (
        <div>
            <h1>Dashboard</h1>
            {session ? (
                <div>
                    <p>Welcome, {session.user?.name}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default page