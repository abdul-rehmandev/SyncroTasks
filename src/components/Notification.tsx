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


const Notification = ({ message, projectName, title }: NotificationTypes) => {
    return (
        <Card className='w-[700px] my-1'>
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>{title} <span className='cursor-pointer hover:scale-110 transition-all'><Badge variant="outline"><CheckCheck size={18} className='mr-1' /> Mark as read</Badge></span>
                </CardTitle>
                <CardDescription><span>1 day ago </span> {projectName && <span> | {projectName}</span>}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{message}</p>
            </CardContent>
        </Card>

    )
}

export default Notification