"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Notification from '../Notification'
import { useSelector } from 'react-redux'


const Notifications = () => {

    const notifications = useSelector((state: any) => state.notifications.notifications);

    const unreadNotifications = notifications.filter((notification: any) => !notification.isRead);
    const readNotifications = notifications.filter((notification: any) => notification.isRead);

    return (
        <>
            <h2 className='text-center text-2xl'>Notifications</h2>
            <Tabs defaultValue="unread" className="w-full">
                <div className='flex justify-center items-center my-5'>
                    <TabsList>
                        <TabsTrigger value="unread">Unread Notifications ({unreadNotifications.length})</TabsTrigger>
                        <TabsTrigger value="read">Read Notifications ({readNotifications.length})</TabsTrigger>
                    </TabsList>
                </div>
                <div className=' w-full h-[78vh] tasks-scroll'>
                    <TabsContent value="unread" className='flex flex-col justify-start items-center'>
                        {unreadNotifications.length > 0 ? (
                            unreadNotifications.map((notification: NotificationTypes, index: number) => (
                                <Notification key={index} message={notification.message} title={notification.title} from={notification.from} createdAt={notification.createdAt} _id={notification._id} isRead={notification.isRead} />
                            ))
                        ) : (
                            <li>You're all caught up! No new notifications at the moment.</li>
                        )}
                    </TabsContent>
                    <TabsContent value="read" className='flex flex-col justify-start items-center'>
                        {readNotifications.length > 0 ? (
                            readNotifications.map((notification: NotificationTypes, index: number) => (
                                <Notification key={index} message={notification.message} title={notification.title} from={notification.from} createdAt={notification.createdAt} _id={notification._id} isRead={notification.isRead} />
                            ))
                        ) : (
                            <li>You’re all caught up! No new notifications at the moment.</li>
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </>

    )
}

export default Notifications