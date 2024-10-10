import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCheck } from 'lucide-react'
import moment from "moment"


const Notification = ({ message, from, title, createdAt }: NotificationTypes) => {
    return (
        <Card className='w-[700px] my-1'>
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>{title} <span className='cursor-pointer hover:scale-110 transition-all'><Badge variant="outline"><CheckCheck size={18} className='mr-1' /> Mark as read</Badge></span>
                </CardTitle>
                <CardDescription><span>{moment(createdAt).fromNow()} </span> {from && <span> | {from}</span>}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{message}</p>
            </CardContent>
        </Card>

    )
}

export default Notification