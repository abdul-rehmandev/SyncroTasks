"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
} from "@/components/ui/card"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Bell, FolderKanban, ListTodo, Mail, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import Notification from '../Notification';
import ProjectStatus from '../ProjectStatus';
import pusherClient from '@/services/pusherClient';


const Dashboard = () => {

    const { data: session } = useSession();
    const notifications = useSelector((state: any) => state.notifications.notifications);
    const projectNames = useSelector((state: any) => state.projects.projectNames);

    const unreadNotifications = notifications.filter((notification: any) => !notification.isRead);

    const [allProjects, setAllProjects] = useState<ProjectTypes[]>([]);

    const fetchProjects = async () => {
        const response = await fetch('/api/projects/my-all-projects', { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            setAllProjects(data);
        } else {
            console.error('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [session?.user?.email])

    useEffect(() => {
        const channel = pusherClient.subscribe(`all-project-updates-${session?.user?.email}`);

        // Listen for the "member-added" event
        channel.bind('all-project-created', (data: any) => {
            setAllProjects(data.project);
        });

        return () => {
            pusherClient.unsubscribe(`all-project-updates-${session?.user?.email}`)
        }
    }, [session?.user?.email])


    if (!session?.user?.email) return <p>Loading...</p>

    return (
        <div>
            <h2 className='mb-3 flex items-center justify-center  gap-2'><img width="32" height="32" src="https://img.icons8.com/emoji/32/waving-hand-emoji.png" alt="waving-hand-emoji" />Hey <span style={{ color: "orange", fontWeight: "bold" }}>{session?.user?.name}</span> Welcome to your dashboard. Let’s get things done!</h2>
            <div className="cards flex justify-between">
                <Card className='w-[350px] h-[200px] flex justify-center items-center flex-col bg-orange-50'>
                    <Image src={session?.user?.image || 'https://github.com/shadcn.png'} alt={session?.user?.name || 'User Avatar'} width={100} height={100} className='rounded-full' />
                    <p className='flex items-center my-2 gap-1'><User /> {session?.user?.name}</p>
                    <small className='flex items-center my-2 gap-1'><Mail size={14} /> {session?.user?.email}</small>
                </Card>
                <Card className='w-[350px] h-[200px] flex justify-center items-center flex-col bg-purple-50'>
                    <h3 className='text-2xl font-semibold'>Unread Notifications</h3>
                    <h2 style={{ fontSize: "6rem", fontWeight: "bolder" }}>{unreadNotifications.length}</h2>
                    <small>Checkout the notifications</small>
                </Card>
                <Card className='w-[350px] h-[200px] flex justify-center items-center flex-col bg-red-50'>
                    <h3 className='text-2xl font-semibold'>Collab Projects</h3>
                    <h2 style={{ fontSize: "6rem", fontWeight: "bolder" }}>{projectNames.length}</h2>
                    <small>Checkout the projects</small>
                </Card>
            </div>
            <div className='flex justify-between mt-3'>
                <Card className='w-[65%] p-2 h-[56vh] tasks-scroll'>
                    <h2 className='font-semibold flex justify-center items-center gap-1'><Bell size={20} /> Latest Notifications</h2>
                    {unreadNotifications.length > 0 ? (
                        unreadNotifications.map((notification: NotificationTypes, index: number) => (
                            <Notification key={index} message={notification.message} title={notification.title} from={notification.from} createdAt={notification.createdAt} _id={notification._id} isRead={notification.isRead} />
                        ))
                    ) : (
                        <li>You're all caught up! No new notifications at the moment.</li>
                    )}
                </Card>
                <Card className='w-[34%] p-2 h-[56vh] tasks-scroll'>
                    <h2 className='font-semibold flex justify-center items-center gap-1'><FolderKanban size={20} /> Projects Status</h2>
                    <div>
                        {allProjects.length > 0 ? (
                            allProjects.map((project: ProjectTypes, index: number) => (
                                <ProjectStatus key={index} project={project} />
                            ))
                        ) : (
                            <li>Your project space is empty—let’s get started!</li>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard