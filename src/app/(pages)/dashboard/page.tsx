'use client';
import React, { useState } from 'react'
import {
    Card
} from "@/components/ui/card"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react';
import { Badge } from "@/components/ui/badge"
import { BadgePlus, Bell, LayoutDashboard, Minus, SquareKanban } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Dashboard from '@/components/DashboardTabs/Dashboard';
import Project from '@/components/DashboardTabs/Project';
import ModalBox from '@/components/ModalBox';


const page = () => {

    const { data: session } = useSession();

    const projectsLinks = [
        {
            id: "1",
            name: "project1"
        },
        {
            id: "2",
            name: "project2"
        },
        {
            id: "3",
            name: "project3"
        },
        {
            id: "4",
            name: "project4"
        }
    ]

    const [currTab, setCurrTab] = useState("dashboard")
    console.log("🚀 ~ page ~ currTab:", currTab)

    return (
        <div>
            <div className='flex justify-between items-center h-screen mx-5'>
                <div className='w-[20%]'>
                    <Card className='h-[96vh] p-2'>
                        <div>
                            <div className='header flex items-center justify-between mb-3'>
                                <div className='flex items-center'>
                                    <Image src="/Images/logo.png" alt='syncrotasks - logo' width={30} height={30} />
                                    <span className='ml-1'>SyncroTasks</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='relative cursor-pointer'>
                                        <Bell />
                                        <Badge className='absolute -top-3 -left-3'>0</Badge>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Image src={session?.user?.image || 'https://github.com/shadcn.png'} alt={session?.user?.name || 'User Avatar'} width={30} height={30} className='rounded-full' />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => signOut()}>SignOut</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div>
                                <ModalBox btnText='Create new project' modalHeader='Create a new project' widthSize='w-full' borderSize={2} icon=<BadgePlus /> >
                                    <p>A</p>
                                </ModalBox>
                                <Separator className='mt-3' />
                                <Badge variant="outline" className='mt-3'>Overview</Badge>
                                <div>
                                    <span className='flex items-center cursor-pointer' onClick={() => setCurrTab("dashboard")} style={currTab == "dashboard" ? { color: "orange", marginLeft: "10px", transition: "0.5s all ease" } : { color: "black" }} ><Minus /><LayoutDashboard className='mr-1' size={20} />Dashboard</span>
                                </div>
                                <Badge variant="outline" className='mt-3'>Projects</Badge>
                                <div>
                                    {projectsLinks.map((item: projectsLinksTypes, index) => (
                                        <span className='flex items-center cursor-pointer my-1' style={currTab.split('/').pop() == item.name ? { color: "orange", marginLeft: "10px", transition: "0.5s all ease" } : { color: "black" }} key={index} onClick={() => setCurrTab(`/project/${item.name}`)}><Minus /><SquareKanban className='mr-1' size={20} /> {item.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='w-[79%]'>
                    <Card className='h-[96vh] p-2'>
                        {currTab == "dashboard" && <Dashboard />}
                        {currTab.split('/')[1] == "project" && <Project projectName={currTab} />}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default page