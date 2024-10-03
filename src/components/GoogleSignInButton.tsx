'use client';
import React from 'react'
import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={() => signIn('google')} style={{ padding: '10px', backgroundColor: '#4285F4', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Continue with Google
            </button>
        </div>
    )
}

export default GoogleSignInButton