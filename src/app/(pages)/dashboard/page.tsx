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
import { BadgePlus, Bell, LayoutDashboard, Minus, SquareKanban, SquarePlus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Dashboard from '@/components/DashboardTabs/Dashboard';
import Project from '@/components/DashboardTabs/Project';
import ModalBox from '@/components/ModalBox';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import Notifications from '@/components/DashboardTabs/Notifications';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addCollabProject, deleteCollabProject, setCollabProjects } from '@/redux/projectSlice'
import pusherClient from "@/services/pusherClient"
import { addNotification, setNotifications } from '@/redux/notificationSlice';

const Page = () => {

    const { data: session } = useSession();
    const dispatch = useDispatch();

    const [currTab, setCurrTab] = useState("dashboard")

    const projectNames = useSelector((state: any) => state.projects.projectNames);
    const notifications = useSelector((state: any) => state.notifications.notifications);

    const unreadNotifications = notifications.filter((notification: any) => !notification.isRead);

    // Create Project
    const [projectName, setProjectName] = useState<string>("")
    const [projectDescription, setProjectDescription] = useState("")

    const createProject = async () => {
        if (!projectName || !projectDescription) return toast.error("All fields required!")
        toast.loading("Project creation inprogress", { id: "1" })
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
            const data = await response.json()
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

    //Fetch collab project
    const fetchCollabProjects = async () => {
        const response = await fetch('/api/projects/collab-projects', { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            const projectNames = await data.map((project: any) => project.projectName);
            dispatch(setCollabProjects(projectNames));
        } else {
            toast.error('Failed to fetch projects');
        }
    };

    const fetchNotifications = async () => {
        const response = await fetch('/api/notifications/my-notifications', { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            dispatch(setNotifications(data));
        } else {
            console.error('Failed to fetch notifications');
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchCollabProjects();
        fetchNotifications();
    }, [])

    useEffect(() => {
        if (session?.user?.email) {
            const channel = pusherClient.subscribe(`project-collab-${session?.user?.email}`);

            // Listen for the "member-added" event
            channel.bind('project-collab', (data: any) => {
                dispatch(addCollabProject(data.projectName))
            });

            const channel2 = pusherClient.subscribe(`notifications-${session?.user?.email}`);

            // Listen for the "member-added" event
            channel2.bind('member-added', (data: any) => {
                dispatch(addNotification(data));
                toast.success(data.message)
            });

            const channel3 = pusherClient.subscribe(`project-delete-${session.user.email}`);

            // Listen for the 'project-deleted' event
            channel3.bind('project-deleted', (data: any) => {
                // Filter out the deleted project from the state
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project.projectName !== data.projectName)
                );
                toast.success(data.message);
                setCurrTab("dashboard")
            });

            const channel4 = pusherClient.subscribe(`collab-project-delete-${session.user.email}`);

            // Listen for the 'coolab-project-deleted' event
            channel4.bind('collab-project-deleted', (data: any) => {
                // Filter out the deleted project from the state
                dispatch(deleteCollabProject(data.projectName));
                toast.success(data.message);
                setCurrTab("dashboard")
            });

            const channel5 = pusherClient.subscribe(`project-delete-member-${session.user.email}`);

            // Listen for the 'coolab-project-deleted' event
            channel5.bind('project-deleted-member', (data: any) => {
                // Filter out the deleted project from the state
                dispatch(deleteCollabProject(data.projectName));
                toast.success(data.message);
                setCurrTab("dashboard")
            });

            return () => {
                pusherClient.unsubscribe(`project-collab-${session?.user?.email}`)
                pusherClient.unsubscribe(`notifications-${session?.user?.email}`)
                pusherClient.unsubscribe(`project-delete-${session?.user?.email}`)
                pusherClient.unsubscribe(`collab-project-delete-${session?.user?.email}`)
            }
        }
    }, [session?.user?.email])

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
                                    <div className='relative cursor-pointer' onClick={() => setCurrTab("notifications")}>
                                        <Bell />
                                        <Badge className='absolute -top-3 -left-3'>{unreadNotifications.length}</Badge>
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
                                <Badge variant="outline" className='mt-3'>My Projects</Badge>
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
                                                <SquareKanban className='mr-1' size={20} /> {item.projectName}{item.projectOwner.email == session?.user?.email ? "" : <Badge variant="outline" className='ml-1'>Added</Badge>}
                                            </span>
                                        ))
                                    ) : (
                                        <li>
                                            <small className='mt-2'>No projects available. Create one to start.</small>
                                        </li>
                                    )}
                                </div>
                                <Badge variant="outline" className='mt-3'>Collab Projects</Badge>
                                <div>
                                    {projectNames.length > 0 ? (
                                        projectNames.map((item: string, index: number) => (
                                            <span
                                                className='flex items-center cursor-pointer my-1'
                                                style={
                                                    currTab.split('/').pop() == item
                                                        ? { color: "orange", marginLeft: "10px", transition: "0.5s all ease" }
                                                        : { color: "black" }
                                                }
                                                key={index}
                                                onClick={() => setCurrTab(`/project/${item}`)}
                                            >
                                                <Minus />
                                                <SquareKanban className='mr-1' size={20} /> {item}
                                            </span>
                                        ))
                                    ) : (
                                        <li>
                                            <small className='mt-2'>Projects will appear here when you're added to one.</small>
                                        </li>
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
                        {currTab == "notifications" && <Notifications />}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page