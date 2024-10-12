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
import TimeAgo from 'react-timeago';
import toast from 'react-hot-toast';
import { markNotificationAsRead } from '@/redux/notificationSlice';
import { useDispatch } from 'react-redux';


const Notification = ({ message, from, title, createdAt, _id, isRead }: NotificationTypes) => {

    const dispatch = useDispatch();


    const handleMarkAsRead = async () => {
        try {
            const response = await fetch('/api/notifications/mark-as-read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notificationId: _id }), // Send single notification ID
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message);

                // Update the notification status in the Redux store
                dispatch(markNotificationAsRead(_id)); // Dispatch action to update Redux state
            } else {
                toast.error('Failed to mark notification as read');
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error(error);
        }
    };

    return (
        <Card className='w-[700px] my-1'>
            <CardHeader className='py-2'>
                <CardTitle className='flex justify-between items-center'>{title} {isRead ? "" : (
                    <span className='cursor-pointer hover:scale-110 transition-all' onClick={handleMarkAsRead}><Badge variant="outline"><CheckCheck size={18} className='mr-1' /> Mark as read</Badge></span>
                )}
                </CardTitle>
                <CardDescription><span><TimeAgo date={createdAt} /></span> {from && <span> | {from}</span>}</CardDescription>
            </CardHeader>
            <CardContent className="py-1">
                <p>{message}</p>
            </CardContent>
        </Card>

    )
}

export default Notification