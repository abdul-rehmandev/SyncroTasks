import React from 'react'
import Navbar from '@/components/Navbar'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from "next/navigation"


const Home = async () => {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className='container'>
      <Navbar />
      <GoogleSignInButton />
    </div>
  )
}

export default Home