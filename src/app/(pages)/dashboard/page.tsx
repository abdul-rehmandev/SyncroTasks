'use client';
import React, { useState, useEffect } from 'react'
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
import { BadgePlus, Bell, LayoutDashboard, Minus, OctagonX, SquareKanban, SquarePlus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Dashboard from '@/components/DashboardTabs/Dashboard';
import Project from '@/components/DashboardTabs/Project';
import ModalBox from '@/components/ModalBox';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';


const page = () => {

    const { data: session } = useSession();

    const [currTab, setCurrTab] = useState("dashboard")

    // Create Project
    const [projectName, setProjectName] = useState<string>("")
    const [projectDescription, setProjectDescription] = useState("")

    const createProject = async () => {
        if (!projectName || !projectDescription) return toast.error("All fields required!")
        toast.loading("Project creating inprogress", { id: "1" })
        const response = await fetch('/api/projects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName,
                projectDescription
            })
        })

        if (response.ok) {
            const data = await response.json();
            setProjects((prevProjects) => [...prevProjects, data])
            toast.success("Project created successfully!", { id: "1" })
            setProjectName("")
            setProjectDescription("")
        } else {
            toast.error('Error creating project', { id: "1" });
        }
    }

    //Fetch projects of SignedIn user
    const [project, setProjects] = useState<ProjectTypes[]>([])
    const fetchProjects = async () => {
        const response = await fetch('/api/projects/my-projects', { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            setProjects(data);
        } else {
            console.error('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects()
    }, [])

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
                                <ModalBox btnText='Create new project' modalHeader='Create a new project' widthSize='w-full' icon=<BadgePlus /> >
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="email">Enter project name</Label>
                                        <Input type="email" id="email" placeholder="Project name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                                    </div>
                                    <div className="grid w-full gap-1.5 my-3">
                                        <Label htmlFor="message">Write project description</Label>
                                        <Textarea placeholder="Type your description here." id="message" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                                    </div>
                                    <Button variant="outline" className='w-full' onClick={createProject}><SquarePlus className="mr-2" />Create this project</Button>
                                </ModalBox>
                                <Separator className='mt-3' />
                                <Badge variant="outline" className='mt-3'>Overview</Badge>
                                <div>
                                    <span className='flex items-center cursor-pointer' onClick={() => setCurrTab("dashboard")} style={currTab == "dashboard" ? { color: "orange", marginLeft: "10px", transition: "0.5s all ease" } : { color: "black" }} ><Minus /><LayoutDashboard className='mr-1' size={20} />Dashboard</span>
                                </div>
                                <Badge variant="outline" className='mt-3'>Projects</Badge>
                                <div>
                                    {project.length > 0 ? (
                                        project.map((item: ProjectTypes, index) => (
                                            <span
                                                className='flex items-center cursor-pointer my-1'
                                                style={
                                                    currTab.split('/').pop() == item.projectName
                                                        ? { color: "orange", marginLeft: "10px", transition: "0.5s all ease" }
                                                        : { color: "black" }
                                                }
                                                key={index}
                                                onClick={() => setCurrTab(`/project/${item.projectName}`)}
                                            >
                                                <Minus />
                                                <SquareKanban className='mr-1' size={20} /> {item.projectName}
                                            </span>
                                        ))
                                    ) : (
                                        <p className='mt-2 flex items-center'><OctagonX color='orange' /> No project found</p>
                                    )}
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