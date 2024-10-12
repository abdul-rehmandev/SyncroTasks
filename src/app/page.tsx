import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from "next/navigation"
import HeroSection from '@/components/HeroSection';


const Home = async () => {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard")
  }

  return (
    <HeroSection />
  )
}

export default Home