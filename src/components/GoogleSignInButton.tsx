'use client';
import React from 'react'
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button"

interface BtnTextPropTypes {
    btnText: string;
}

const GoogleSignInButton = ({ btnText }: BtnTextPropTypes) => {
    return (
        <div>
            <Button onClick={() => signIn('google')}>{btnText}</Button>
        </div>
    )
}

export default GoogleSignInButton