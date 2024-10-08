"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Notification from '../Notification'
import { useSession } from 'next-auth/react'
import pusherClient from "@/services/pusherClient"
import toast from 'react-hot-toast'


const Notifications = () => {

    const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
    const { data: session } = useSession();

    const fetchNotifications = async () => {
        const response = await fetch('/api/notifications/my-notifications', { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            setNotifications(data);
        } else {
            console.error('Failed to fetch notifications');
        }
    }

    useEffect(() => {

        const channel = pusherClient.subscribe(`notifications-${session?.user?.email}`);

        // Listen for the "member-added" event
        channel.bind('member-added', (data: any) => {
            setNotifications((prevNotifications) => [...prevNotifications, data]);
            toast.success(data.message)
        });

        fetchNotifications();

        return () => {
            pusherClient.unsubscribe(`notifications-${session?.user?.email}`)
        }
    }, [session?.user?.email])

    return (
        <>
            <h2 className='text-center text-2xl'>Notifications</h2>
            <Tabs defaultValue="unread" className="w-full">
                <div className='flex justify-center items-center my-5'>
                    <TabsList>
                        <TabsTrigger value="unread">Unread Notifications ({notifications.length})</TabsTrigger>
                        <TabsTrigger value="read">Read Notifications (0)</TabsTrigger>
                    </TabsList>
                </div>
                <div className=' w-full h-[78vh] tasks-scroll'>
                    <TabsContent value="unread" className='flex flex-col justify-start items-center'>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <Notification key={index} message={notification.message} />
                            ))
                        ) : (
                            <li>No notifications</li>
                        )}
                    </TabsContent>
                    <TabsContent value="read" className='flex flex-col justify-start items-center'>
                        {/* <Notification /> */}
                    </TabsContent>
                </div>
            </Tabs>
        </>

    )
}

export default Notifications