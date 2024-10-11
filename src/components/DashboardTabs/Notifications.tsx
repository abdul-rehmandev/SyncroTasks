"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Notification from '../Notification'
import { useSelector } from 'react-redux'


const Notifications = () => {

    const notifications = useSelector((state: any) => state.notifications.notifications);

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
                            notifications.map((notification: NotificationTypes, index: number) => (
                                <Notification key={index} message={notification.message} title={notification.title} from={notification.from} createdAt={notification.createdAt} />
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